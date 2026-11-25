/**
 * KIẾN TRÚC ĐÁ TÂM LINH - Trang riêng cho từng sản phẩm: /san-pham/<ten-san-pham>
 * (vercel.json → rewrites). Trước đây sản phẩm chỉ mở dạng cửa sổ trong san-pham.html,
 * Google không thấy được từng mẫu. Các xưởng đứng đầu Google đều có trang riêng cho từng mẫu.
 * Giá chỉ hiện ở mẫu chủ xưởng đã tích "Cho hiện giá" trong Sổ mô tả (product_info.json), từ 25/11/2026.
 * Mô tả trong product_descriptions.json được viết kiểu markdown đơn giản: dòng "### " là tiêu đề nhỏ, **chữ** là in đậm.
 */
const { SITE, CATEGORIES, slugify, productPath, projectPath, categoryPath, articlePath, loadData } = require('./_articles');
const { esc, plain, cut, absUrl, layout, sendHtml, redirect, notFoundPage, HOTLINE, TEL, imgSrc, thumb } = require('./_layout');

function inline(t) {
  return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}
function paras(text) {
  return String(text || '').split(/\n\s*\n/).map(t => t.trim()).filter(Boolean)
    .map(t => {
      const h = t.match(/^#{2,4}\s+(.+)$/);
      return h ? '<h2>' + inline(h[1]) + '</h2>' : '<p>' + inline(t) + '</p>';
    }).join('\n');
}
// Bỏ dấu markdown khi dùng mô tả làm thẻ description
function stripMd(text) {
  return String(text || '').replace(/^#{2,4}\s+/gm, '').replace(/\*\*/g, '');
}
// "107x167" -> "107 × 167 cm"; chữ khác giữ nguyên như chủ xưởng ghi
function fmtSize(s) {
  s = String(s || '').trim();
  return /^\d+(?:[.,]\d+)?\s*[x×]\s*\d+(?:[.,]\d+)?$/i.test(s) ? s.replace(/\s*[x×]\s*/i, ' × ') + ' cm' : s;
}

module.exports = function handler(req, res) {
  const raw = String((req.query && req.query.path) || '').replace(/\/+$/, '').replace(/\.html$/, '');
  const { products, projects, articles } = loadData();
  const p = products.find(x => slugify(x.title) === raw);
  if (!p) return notFoundPage(res, 'sản phẩm', '/san-pham.html', 'Xem tất cả sản phẩm');
  if (raw !== productPath(p).slice('/san-pham/'.length)) return redirect(res, productPath(p));

  const cat = CATEGORIES.find(c => c.code === p.cat_code);
  const catName = (cat && cat.name) || p.cat_name || 'Sản phẩm';
  const canonical = SITE + productPath(p);
  const imgs = p.imgs.filter(Boolean);
  const title = p.title + ' – ' + catName + ' Ninh Vân | Kiến Trúc Đá Tâm Linh';
  const description = cut(p.title + ': ' + (p.material ? 'chất liệu ' + p.material + '. ' : '') +
    plain(stripMd(p.desc)), 158);

  const sameCat = products.filter(x => x.cat_code === p.cat_code && x.title !== p.title).slice(0, 8);
  const kws = (cat && cat.kw) || [];
  const relArticles = articles.filter(a => kws.some(k => String(a.title).toLowerCase().includes(k)))
    .sort((x, y) => Number(y.id) - Number(x.id)).slice(0, 5);
  const relProjects = projects.filter(x => kws.some(k => String(x.title).toLowerCase().includes(k))).slice(0, 4);

  const info = p.info || {};
  const specs = [['Giá tham khảo', info.price], ['Kích thước', fmtSize(info.size)], ['Đã làm cho khách ở', info.where],
    ['Danh mục', catName], ['Chất liệu', p.material], ['Tiêu chuẩn', p.spec],
    ['Nơi chế tác', 'Làng nghề đá Ninh Vân, Hoa Lư, Ninh Bình'], ['Số ảnh thực tế', imgs.length ? String(imgs.length) : '']]
    .filter(r => r[1]);

  // Không dùng schema Product: thiếu giá/đánh giá sẽ bị Search Console báo lỗi. Chỉ dùng breadcrumb.
  const jsonLd = [{
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: cat ? cat.name : 'Sản phẩm', item: SITE + (cat ? categoryPath(cat) : '/san-pham.html') },
      { '@type': 'ListItem', position: 3, name: p.title, item: canonical }
    ]
  }];

  const body = `<article>
<div class="crumb"><a href="/">Trang chủ</a> › <a href="/san-pham.html">Sản phẩm</a> › ${cat ? `<a href="${categoryPath(cat)}">${esc(cat.name)}</a>` : esc(catName)}</div>
<h1>${esc(p.title)}</h1>
${imgs.length ? `<img class="hero" src="${esc(imgSrc(imgs[0]))}" alt="${esc(p.title)}" width="1200" height="675" fetchpriority="high">` : ''}
<table class="spec">${specs.map(r => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('')}</table>
<section class="cta" style="margin-top:0">
<h2>Nhận báo giá mẫu này</h2>
<p>${info.price ? `Giá tham khảo: <strong>${esc(info.price)}</strong>. ` : ''}Giá phụ thuộc kích thước, loại đá và hoa văn. Gửi kích thước đất hoặc ảnh mẫu qua Zalo để KTS Hướng báo giá và gửi bản vẽ 3D.</p>
<div class="btns"><a class="btn btn-gold" href="tel:${TEL}">📞 Gọi ${HOTLINE}</a><a class="btn btn-line" href="https://zalo.me/${TEL}" target="_blank" rel="noopener">💬 Gửi ảnh qua Zalo</a></div>
</section>
<div class="content">${paras(p.desc)}</div>
${imgs.length > 1 ? `<h2 style="font-family:Lora,Georgia,serif;color:var(--white);font-size:1.25rem;margin:28px 0 4px">Ảnh thực tế (${imgs.length} ảnh)</h2>
<div class="gal">${imgs.map((u, i) => `<a href="${esc(imgSrc(u))}" target="_blank" rel="noopener"><img src="${esc(thumb(u))}" alt="${esc(p.title)} – ảnh ${i + 1}" loading="lazy" width="300" height="300"></a>`).join('')}</div>` : ''}
</article>
${sameCat.length ? `<section class="rel"><h2>Mẫu ${esc(catName.toLowerCase())} khác</h2><div class="grid">${sameCat.map(x => `<a class="card" href="${productPath(x)}"><img src="${esc(thumb(x.imgs[0]))}" alt="${esc(x.title)}" loading="lazy" width="400" height="300"><b>${esc(x.title)}</b><small>${esc(x.material || '')}</small></a>`).join('')}</div>${cat ? `<p><a href="${categoryPath(cat)}">Xem tất cả mẫu ${esc(cat.name.toLowerCase())} →</a></p>` : ''}</section>` : ''}
${relProjects.length ? `<section class="rel"><h2>Công trình thực tế</h2><ul>${relProjects.map(x => `<li><a href="${projectPath(x)}">${esc(x.title)}<small>${esc(x.location || '')}</small></a></li>`).join('')}</ul></section>` : ''}
${relArticles.length ? `<section class="rel"><h2>Bài viết hữu ích</h2><ul>${relArticles.map(x => `<li><a href="${articlePath(x)}">${esc(x.title)}<small>${esc(x.date || '')}</small></a></li>`).join('')}</ul></section>` : ''}
<a class="back" href="/san-pham.html">← Xem tất cả sản phẩm</a>`;

  sendHtml(res, 200, layout({ title, description, canonical, image: absUrl(imgs[0]), body, jsonLd,
    active: '/san-pham.html', ogType: 'product' }));
};
