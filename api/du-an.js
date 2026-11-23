/**
 * KIẾN TRÚC ĐÁ TÂM LINH - Trang riêng cho từng công trình: /du-an/<ten-cong-trinh>-<id>
 * (vercel.json → rewrites). Tên công trình có tên tỉnh ("... Tại Hà Tĩnh") nên mỗi trang
 * giúp web hiện khi khách tìm "lăng mộ đá Hà Tĩnh", "khu lăng mộ Nghệ An"...
 */
const { SITE, CATEGORIES, slugify, productPath, projectPath, categoryPath, loadData } = require('./_articles');
const { esc, plain, cut, absUrl, layout, sendHtml, redirect, notFoundPage, HOTLINE, TEL, imgSrc, thumb } = require('./_layout');

module.exports = function handler(req, res) {
  const raw = String((req.query && req.query.path) || '').replace(/\/+$/, '').replace(/\.html$/, '');
  const m = raw.match(/-(\d+)$/);
  const { products, projects } = loadData();
  const p = m && projects.find(x => String(x.id) === m[1]);
  if (!p) return notFoundPage(res, 'công trình', '/du-an.html', 'Xem tất cả công trình');
  if (raw !== projectPath(p).slice('/du-an/'.length)) return redirect(res, projectPath(p));

  const canonical = SITE + projectPath(p);
  const imgs = p.imgs.filter(Boolean);
  const is3d = p.cat_code === 'khuonvien3d';
  const title = p.title + (p.location && !String(p.title).includes(p.location) ? ' – ' + p.location : '') +
    ' | Kiến Trúc Đá Tâm Linh';
  const description = cut(plain(p.detail_desc || p.short_desc) || p.title, 158);
  const specs = (p.specs || []).filter(r => Array.isArray(r) && r[0] && r[1]);

  const cat = p.cat_code === 'nhatho' ? CATEGORIES.find(c => c.code === 'nhatho') : CATEGORIES.find(c => c.code === 'langtho');
  const prods = products.filter(x => x.cat_code === (cat ? cat.code : 'mo')).slice(0, 4);
  const others = projects.filter(x => x.id !== p.id && x.cat_code === p.cat_code).slice(0, 6);

  const jsonLd = [{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Công trình', item: SITE + '/du-an.html' },
      { '@type': 'ListItem', position: 3, name: p.title, item: canonical }
    ]
  }];

  const body = `<article>
<div class="crumb"><a href="/">Trang chủ</a> › <a href="/du-an.html">Công trình</a> › ${esc(p.cat_name || '')}</div>
<span class="tag">${esc(p.cat_name || 'Công trình')}${p.location ? ' · ' + esc(p.location) : ''}</span>
<h1>${esc(p.title)}</h1>
${imgs.length ? `<img class="hero" src="${esc(imgSrc(imgs[0]))}" alt="${esc(p.title)}" width="1200" height="675" fetchpriority="high">` : ''}
<p class="lead">${esc(p.detail_desc || p.short_desc || '')}</p>
${specs.length ? `<table class="spec">${specs.map(r => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('')}</table>` : ''}
${imgs.length > 1 ? `<h2 style="font-family:Lora,Georgia,serif;color:var(--white);font-size:1.25rem;margin:28px 0 4px">${is3d ? 'Phối cảnh' : 'Ảnh thực tế'} (${imgs.length} ảnh)</h2>
<div class="gal">${imgs.map((u, i) => `<a href="${esc(imgSrc(u))}" target="_blank" rel="noopener"><img src="${esc(thumb(u))}" alt="${esc(p.title)} – ảnh ${i + 1}" loading="lazy" width="300" height="300"></a>`).join('')}</div>` : ''}
</article>
<section class="cta">
<h2>Muốn làm công trình tương tự${p.location ? ' ở ' + esc(p.location) + ' hoặc tỉnh khác' : ''}?</h2>
<p>Gửi kích thước đất và vài ảnh hiện trạng qua Zalo. KTS Nguyễn Văn Hướng tư vấn, gửi bản vẽ 3D và báo giá trọn gói, xưởng vận chuyển lắp đặt tận nơi.</p>
<div class="btns"><a class="btn btn-gold" href="tel:${TEL}">📞 Gọi ${HOTLINE}</a><a class="btn btn-line" href="https://zalo.me/${TEL}" target="_blank" rel="noopener">💬 Gửi ảnh qua Zalo</a></div>
</section>
${prods.length ? `<section class="rel"><h2>Mẫu ${esc(cat.name.toLowerCase())} tại xưởng</h2><div class="grid">${prods.map(x => `<a class="card" href="${productPath(x)}"><img src="${esc(thumb(x.imgs[0]))}" alt="${esc(x.title)}" loading="lazy" width="400" height="300"><b>${esc(x.title)}</b><small>${esc(x.material || '')}</small></a>`).join('')}</div></section>` : ''}
${others.length ? `<section class="rel"><h2>Công trình khác</h2><ul>${others.map(x => `<li><a href="${projectPath(x)}">${esc(x.title)}<small>${esc(x.location || '')}</small></a></li>`).join('')}</ul></section>` : ''}
<a class="back" href="/du-an.html">← Xem tất cả công trình</a>`;

  sendHtml(res, 200, layout({ title, description, canonical, image: absUrl(imgs[0] || p.img), body, jsonLd, active: '/du-an.html' }));
};
