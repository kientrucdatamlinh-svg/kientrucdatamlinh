with open('default_data.js', 'r', encoding='utf-8') as f:
    js_def = f.read()

assert 'const DEFAULT_ARTICLES = [' in js_def, "Missing DEFAULT_ARTICLES in default_data.js"
print("default_data.js: verified OK! Size:", len(js_def))

with open('tin-tuc.html', 'r', encoding='utf-8') as f:
    html_tt = f.read()

assert 'let ARTICLES_DATA = [' in html_tt, "Missing ARTICLES_DATA in tin-tuc.html"
print("tin-tuc.html: verified OK! Size:", len(html_tt))
