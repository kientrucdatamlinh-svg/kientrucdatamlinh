"""Tạo ảnh thu nhỏ cho thẻ sản phẩm/dự án và ảnh nền bản điện thoại.

Chạy lại mỗi khi thêm ảnh mới:  python scripts/make_thumbs.py   (cần Pillow)

- images/san_pham/**, images/du_an/**  ->  images/thumb/<cùng đường dẫn>  (rộng tối đa 640px)
- images/nen/*.webp                    ->  images/nen/m/<tên>              (rộng tối đa 960px, cho điện thoại)
Chỉ tạo file còn thiếu hoặc cũ hơn ảnh gốc. Trang web tự quay về ảnh gốc nếu thiếu ảnh thu nhỏ.
"""
import os, sys
from concurrent.futures import ProcessPoolExecutor
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
IMG = os.path.join(ROOT, 'images')

def job(args):
    src, dst, width, q = args
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return 0
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert('RGB')
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        im.save(dst, 'WEBP', quality=q, method=6)
    return 1

def tasks():
    for top in ('san_pham', 'du_an'):
        for d, _, files in os.walk(os.path.join(IMG, top)):
            for f in files:
                if f.lower().endswith('.webp'):
                    src = os.path.join(d, f)
                    rel = os.path.relpath(src, IMG)
                    yield src, os.path.join(IMG, 'thumb', rel), 640, 72
    nen = os.path.join(IMG, 'nen')
    for f in os.listdir(nen):
        if f.lower().endswith('.webp'):
            yield os.path.join(nen, f), os.path.join(nen, 'm', f), 960, 70

if __name__ == '__main__':
    t = list(tasks())
    with ProcessPoolExecutor() as ex:
        n = sum(ex.map(job, t, chunksize=8))
    print(f'Đã tạo {n} ảnh mới / {len(t)} ảnh.')
