"""Ghi sẵn thẻ sản phẩm/dự án (theo live_overrides.json) vào HTML để trang không phải vẽ lại khi tải.

Cách chạy (cần Python + Playwright + Chrome):
    python -m http.server 8806        (chạy ở thư mục dự án, cửa sổ riêng)
    python scripts/bake_cards.py
Nên chạy lại sau khi cập nhật dữ liệu ở trang quản trị. Nếu không chạy lại, trang vẫn đúng
(tự vẽ lại theo dữ liệu mới), chỉ là chậm hơn một chút.
"""
import asyncio, re, os, sys
from playwright.async_api import async_playwright

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BASE = os.environ.get('BAKE_BASE', 'http://localhost:8806')
PAGES = {'index.html': ['homeExecutedGrid', 'homeD3Grid', 'homeProductGrid'],
         'san-pham.html': ['productGrid'],
         'du-an.html': ['executedGrid', 'd3Grid']}

def splice(src, el_id, inner, sig):
    m = re.search(r'<div\b[^>]*\bid="%s"[^>]*>' % re.escape(el_id), src)
    if not m: raise SystemExit('không thấy #' + el_id)
    depth, pos = 1, m.end()
    for t in re.finditer(r'<div\b|</div>', src[pos:]):
        depth += 1 if t.group(0) == '<div' else -1
        if depth == 0:
            end = pos + t.start(); break
    else: raise SystemExit('thẻ #' + el_id + ' không đóng')
    tag = re.sub(r'\sdata-sig="[^"]*"', '', m.group(0))
    if sig: tag = tag[:-1] + ' data-sig="%s">' % sig
    return src[:m.start()] + tag + inner + '\n            ' + src[end:]

async def main():
    async with async_playwright() as p:
        kw = {'executable_path': '/usr/bin/google-chrome'} if os.path.exists('/usr/bin/google-chrome') else {}
        b = await p.chromium.launch(args=['--no-sandbox'], **kw)
        for page, ids in PAGES.items():
            pg = await b.new_page()
            await pg.goto(BASE + '/' + page, wait_until='load')
            await pg.wait_for_function('window.ktDataDone === true', timeout=60000)
            await pg.wait_for_timeout(300)
            got = await pg.evaluate('ids => ids.map(i => { const e = document.getElementById(i); return e ? [e.innerHTML, e.getAttribute("data-sig")] : null; })', ids)
            path = os.path.join(ROOT, page); s = open(path, encoding='utf-8').read()
            for i, g in zip(ids, got):
                if g is None: raise SystemExit(page + ': thiếu #' + i)
                s = splice(s, i, g[0].rstrip(), g[1])
            open(path, 'w', encoding='utf-8').write(s)
            print(page, 'OK', [(i, len(g[0]) // 1024, g[1]) for i, g in zip(ids, got)])
            await pg.close()
        await b.close()

asyncio.run(main())
