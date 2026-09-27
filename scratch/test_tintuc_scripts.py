import re

with open('tin-tuc.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all <script> tags
scripts = re.findall(r'<script(?:\s+[^>]*)?>(.*?)</script>', content, re.DOTALL)
print(f"Total script blocks in tin-tuc.html: {len(scripts)}")

for i, s in enumerate(scripts):
    s_clean = s.strip()
    if not s_clean:
        continue
    # write to temp js file and test with node
    with open(f'scratch/script_{i}.js', 'w', encoding='utf-8') as sf:
        sf.write(s)
    print(f"Saved script_{i}.js ({len(s)} chars)")
