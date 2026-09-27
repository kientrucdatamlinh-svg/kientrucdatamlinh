import json
import subprocess

# 1. Load articles from live_overrides.json (which is 100% valid JSON)
with open('live_overrides.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

articles = data.get('articles', [])
print(f"Total articles loaded: {len(articles)}")

# 2. Serialize to json string
articles_json_str = json.dumps(articles, ensure_ascii=False, indent=2)

# Write to a test JS file
test_js = "const DEFAULT_ARTICLES = " + articles_json_str + ";\nconsole.log('SUCCESS! Loaded', DEFAULT_ARTICLES.length, 'articles');"
with open('scratch/test_valid.js', 'w', encoding='utf-8') as f:
    f.write(test_js)

# Run node on it
res = subprocess.run(['node', 'scratch/test_valid.js'], capture_output=True, text=True, encoding='utf-8')
print("Node return code:", res.returncode)
print("Node stdout:", res.stdout)
print("Node stderr:", res.stderr)
