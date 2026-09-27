#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re

# Load all 13 articles from live_overrides.json
with open('live_overrides.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

articles = data.get('articles', [])
print(f"Loaded {len(articles)} articles from live_overrides.json")

# Update tin-tuc.html
with open('tin-tuc.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace let ARTICLES_DATA = [ ... ];
pattern = re.compile(r'let ARTICLES_DATA = \[.*?\];\s*// --- Ưu tiên', re.DOTALL)
new_articles_js = "let ARTICLES_DATA = " + json.dumps(articles, ensure_ascii=False, indent=8) + ";\n\n        // --- Ưu tiên"

if pattern.search(content):
    content = pattern.sub(new_articles_js, content, count=1)
    with open('tin-tuc.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced inline ARTICLES_DATA in tin-tuc.html!")
else:
    print("ERROR: Could not match let ARTICLES_DATA pattern in tin-tuc.html")
