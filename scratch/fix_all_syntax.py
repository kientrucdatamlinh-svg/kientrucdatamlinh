import json
import subprocess

# 1. Load articles from live_overrides.json
with open('live_overrides.json', 'r', encoding='utf-8') as f:
    live_data = json.load(f)

articles = live_data.get('articles', [])
print(f"Total articles from live_overrides.json: {len(articles)}")
assert len(articles) == 13, f"Expected 13 articles, got {len(articles)}"

articles_json_str = json.dumps(articles, ensure_ascii=False, indent=2)

# 2. Fix default_data.js
with open('default_data.js', 'r', encoding='utf-8') as f:
    def_content = f.read()

start_marker = "const DEFAULT_ARTICLES = "
end_marker = "const DEFAULT_SITE_CONFIG = "

start_idx = def_content.find(start_marker)
end_idx = def_content.find(end_marker)

assert start_idx != -1 and end_idx != -1, "Markers not found in default_data.js"

new_def_content = (
    def_content[:start_idx]
    + "const DEFAULT_ARTICLES = "
    + articles_json_str
    + ";\n\n"
    + def_content[end_idx:]
)

with open('default_data.js', 'w', encoding='utf-8') as f:
    f.write(new_def_content)

print("Updated default_data.js")

# Verify default_data.js with node
res_def = subprocess.run(['node', '-c', 'default_data.js'], capture_output=True, text=True, encoding='utf-8')
print("default_data.js node -c return code:", res_def.returncode)
if res_def.returncode != 0:
    print("ERROR in default_data.js:", res_def.stderr)
    exit(1)

# 3. Fix tin-tuc.html
with open('tin-tuc.html', 'r', encoding='utf-8') as f:
    tt_content = f.read()

# Remove defer from default_data.js script tag if present
tt_content = tt_content.replace('<script src="default_data.js" defer></script>', '<script src="default_data.js"></script>')

tt_start_marker = "let ARTICLES_DATA = "
tt_end_marker = "// --- Ưu tiên live_overrides.json"

tt_start_idx = tt_content.find(tt_start_marker)
tt_end_idx = tt_content.find(tt_end_marker)

assert tt_start_idx != -1 and tt_end_idx != -1, "Markers not found in tin-tuc.html"

new_tt_content = (
    tt_content[:tt_start_idx]
    + "let ARTICLES_DATA = "
    + articles_json_str
    + ";\n\n        "
    + tt_content[tt_end_idx:]
)

with open('tin-tuc.html', 'w', encoding='utf-8') as f:
    f.write(new_tt_content)

print("Updated tin-tuc.html")

# 4. Extract script from tin-tuc.html and verify with node
import re
scripts = re.findall(r'<script(?:\s+[^>]*)?>(.*?)</script>', new_tt_content, re.DOTALL)
for i, s in enumerate(scripts):
    s_clean = s.strip()
    if not s_clean or 'ARTICLES_DATA' not in s:
        continue
    with open('scratch/test_tt_main_script.js', 'w', encoding='utf-8') as f:
        f.write(s)
    res_tt = subprocess.run(['node', '-c', 'scratch/test_tt_main_script.js'], capture_output=True, text=True, encoding='utf-8')
    print(f"tin-tuc.html main script (script #{i}) node -c return code:", res_tt.returncode)
    if res_tt.returncode != 0:
        print("ERROR in tin-tuc.html script:", res_tt.stderr)
        exit(1)

print("ALL SCRIPTS VERIFIED 100% OK WITH NODE.JS!")
