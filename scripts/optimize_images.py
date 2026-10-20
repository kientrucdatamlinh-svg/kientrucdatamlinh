import os
import sys
import re
import urllib.parse
from PIL import Image, ImageOps
from concurrent.futures import ProcessPoolExecutor
import time

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = os.path.abspath('.')
OUTPUT_DIR = os.path.join(PROJECT_ROOT, 'images')

def slugify(text):
    s = text.lower()
    s = re.sub(r'[àáạảãâầấậẩẫăằắặẳẵ]', 'a', s)
    s = re.sub(r'[èéẹẻẽêềếệểễ]', 'e', s)
    s = re.sub(r'[ìíịỉĩ]', 'i', s)
    s = re.sub(r'[òóọỏõôồốộổỗơờớợởỡ]', 'o', s)
    s = re.sub(r'[ùúụủũưừứựửữ]', 'u', s)
    s = re.sub(r'[ỳýỵỷỹ]', 'y', s)
    s = re.sub(r'[đ]', 'd', s)
    s = re.sub(r'[^a-z0-9._-]+', '_', s)
    s = re.sub(r'_+', '_', s).strip('_')
    return s

def compute_output_rel_path(source_rel_path):
    # Normalize slashes
    norm = source_rel_path.replace('\\', '/')
    parts = norm.split('/')
    
    # Map top-level folder
    top = parts[0]
    if 'dự án' in top or 'du an' in top:
        top_slug = 'du_an'
    elif 'sản phẩm' in top or 'san pham' in top:
        top_slug = 'san_pham'
    elif 'nền' in top or 'nen' in top:
        top_slug = 'nen'
    elif 'logo' in top:
        top_slug = 'logo'
    else:
        top_slug = slugify(top)
        
    slug_parts = [top_slug]
    for p in parts[1:-1]:
        slug_parts.append(slugify(p))
        
    # File name
    base, _ = os.path.splitext(parts[-1])
    slug_parts.append(slugify(base) + '.webp')
    
    return '/'.join(slug_parts)

def convert_single_image(args):
    src_path, dst_path, max_dim = args
    try:
        os.makedirs(os.path.dirname(dst_path), exist_ok=True)
        with Image.open(src_path) as source:
            im = ImageOps.exif_transpose(source)
        
        # Handle alpha channel
        if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
            im = im.convert('RGBA')
        else:
            im = im.convert('RGB')
            
        w, h = im.size
        if w > max_dim or h > max_dim:
            ratio = min(max_dim / w, max_dim / h)
            new_w = max(1, int(w * ratio))
            new_h = max(1, int(h * ratio))
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
        im.save(dst_path, format='WEBP', quality=82, method=4)
        orig_sz = os.path.getsize(src_path)
        new_sz = os.path.getsize(dst_path)
        return True, src_path, dst_path, orig_sz, new_sz, None
    except Exception as e:
        return False, src_path, dst_path, 0, 0, str(e)

if __name__ == '__main__':
    image_exts = ('.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG')
    tasks = []
    source_to_web = {}

    for folder in ['ảnh dự án', 'ảnh sản phẩm', 'ảnh nền', 'logo']:
        if not os.path.exists(folder):
            continue
        for root, dirs, files in os.walk(folder):
            for f in files:
                if f.endswith(image_exts):
                    src_full = os.path.join(root, f)
                    src_rel = os.path.relpath(src_full, PROJECT_ROOT)
                    out_rel = compute_output_rel_path(src_rel)
                    dst_full = os.path.join(OUTPUT_DIR, out_rel.replace('/', os.sep))
                    
                    max_dim = 1600 if 'ảnh nền' in folder else (600 if 'logo' in folder else 1200)
                    tasks.append((src_full, dst_full, max_dim))
                    
                    web_url = '/' + 'images/' + out_rel
                    source_to_web[src_rel.replace('\\', '/')] = web_url

    print(f'Total tasks to process: {len(tasks)}')
    t0 = time.time()
    
    workers = min(12, os.cpu_count() or 4)
    print(f'Starting conversion with {workers} worker processes...')
    
    total_orig = 0
    total_opt = 0
    errors = []
    
    with ProcessPoolExecutor(max_workers=workers) as executor:
        for ok, src, dst, o_sz, n_sz, err in executor.map(convert_single_image, tasks):
            if ok:
                total_orig += o_sz
                total_opt += n_sz
            else:
                errors.append((src, err))
                
    dt = time.time() - t0
    print(f'Conversion completed in {dt:.1f} seconds!')
    print(f'Original size: {total_orig / 1024 / 1024:.2f} MB')
    print(f'Optimized size: {total_opt / 1024 / 1024:.2f} MB')
    print(f'Reduction: {(1 - total_opt / total_orig) * 100:.1f}%')
    print(f'Errors: {len(errors)}')
    if errors:
        for s, e in errors[:5]:
            print(f'  Error on {s}: {e}')
