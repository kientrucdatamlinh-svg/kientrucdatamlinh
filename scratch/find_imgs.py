import json

with open('live_overrides.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

lines = []
lines.append(f"Total products: {len(d.get('products', []))}")
for p in d.get('products', []):
    title = p.get('title', '')
    cat = p.get('cat_name', '')
    imgs = p.get('imgs', [])
    first_img = imgs[0] if imgs else ""
    t_lower = title.lower()
    if any(k in t_lower for k in ['đôi', 'cuốn thư', 'cổng', 'rêu', 'tam quan', 'lăng', 'mộ']):
        lines.append(f"[{cat}] {title}: {len(imgs)} imgs -> {first_img}")
        if len(imgs) > 1:
            for extra in imgs[1:3]:
                lines.append(f"   extra: {extra}")

with open('scratch/found_imgs.txt', 'w', encoding='utf-8') as out:
    out.write("\n".join(lines))

print("Done writing scratch/found_imgs.txt")
