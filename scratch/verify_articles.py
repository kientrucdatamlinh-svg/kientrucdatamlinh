import json

d = json.load(open('live_overrides.json', encoding='utf-8'))
articles = d.get('articles', [])
print(f"Total articles in live_overrides.json: {len(articles)}")
for a in articles:
    print(f"  #{a['id']}: {a['title']} [{a['category']}] - {len(a['content'])} chars")
