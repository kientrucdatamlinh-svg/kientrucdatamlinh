import re
import subprocess

with open('admin.html', 'r', encoding='utf-8') as f:
    admin_content = f.read()

scripts = re.findall(r'<script(?:\s+[^>]*)?>(.*?)</script>', admin_content, re.DOTALL)
print(f"Total script blocks in admin.html: {len(scripts)}")
for i, s in enumerate(scripts):
    s_clean = s.strip()
    if not s_clean:
        continue
    with open(f'scratch/admin_script_{i}.js', 'w', encoding='utf-8') as sf:
        sf.write(s)
    res = subprocess.run(['node', '-c', f'scratch/admin_script_{i}.js'], capture_output=True, text=True, encoding='utf-8')
    print(f"admin.html script #{i} return code: {res.returncode}")
    if res.returncode != 0:
        print(f"ERROR in admin script #{i}:", res.stderr)
