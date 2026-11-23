/**
 * KIẾN TRÚC ĐÁ TÂM LINH - Trang danh mục theo từ khoá khách hay tìm:
 * /mau-mo-da-dep, /lang-tho-da, /nha-tho-ho-bang-da, /cong-da, /tuong-da-linh-vat, /lan-can-da, /cuon-thu-da, /thap-da
 * (vercel.json → rewrites, danh sách ở api/_articles.js → CATEGORIES).
 * Giống cách các xưởng đứng đầu Google làm: mỗi loại sản phẩm một trang, liệt kê mọi mẫu + công trình + bài hỏi đáp.
 */
const { SITE, CATEGORIES, productPath, projectPath, categoryPath, articlePath, loadData } = require('./_articles');
const { esc, absUrl, layout, sendHtml, notFoundPage, HOTLINE, TEL, thumb } = require('./_layout');

module.exports = function handler(req, res) {
  const slug = String((req.query && req.query.c) || '');
  const cat = CATEGORIES.find(c => c.slug === slug);
  if (!cat) return notFoundPage(res, 'danh mục', '/san-pham.html', 'Xem tất cả sản phẩm');

  const { products, projects, articles } = loadData();
  const items = products.filter(p => p.cat_code === cat.code);
  const hasKw = s => cat.kw.some(k => String(s || '').toLowerCase().includes(k));
  const projs = projects.filter(p => hasKw(p.title) || (cat.code === 'nhatho' && p.cat_code === 'nhatho') ||
    (cat.code === 'langtho' && p.cat_code === 'langmo')).slice(0, 8);
  const byNewest = (x, y) => Number(y.id) - Number(x.id);
  const faqs = articles.filter(a => /\?/.test(a.title) && hasKw(a.title)).sort(byNewest).slice(0, 8);
  const guides = articles.filter(a => !/\?/.test(a.title) && hasKw(a.title)).sort(byNewest).slice(0, 6);

  const canonical = SITE + categoryPath(cat);
  const title = cat.h1 + (items.length ? ` – ${items.length} Mẫu Thực Tế` : '') + ' | Kiến Trúc Đá Tâm Linh';
  const description = (cat.intro + ' Gọi/Zalo ' + HOTLINE + '.').slice(0, 158);

  const jsonLd = [{
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: cat.h1, url: canonical, inLanguage: 'vi',
    mainEntity: { '@type': 'ItemList', numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + productPath(p), name: p.title })) }
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: SITE + '/san-pham.html' },
      { '@type': 'ListItem', position: 3, name: cat.name, item: canonical }
    ]
  }];

  const body = `<div class="crumb"><a href="/">Trang chủ</a> › <a href="/san-pham.html">Sản phẩm</a> › ${esc(cat.name)}</div>
<h1>${esc(cat.h1)}</h1>
<p class="lead">${esc(cat.intro)}</p>
<div class="chips">${CATEGORIES.map(c => `<a href="${categoryPath(c)}"${c === cat ? ' class="on"' : ''}>${esc(c.name)}</a>`).join('')}</div>
${items.length ? `<div class="grid">${items.map(p => `<a class="card" href="${productPath(p)}"><img src="${esc(thumb(p.imgs[0]))}" alt="${esc(p.title)}" loading="lazy" width="400" height="300"><b>${esc(p.title)}</b><small>${esc(p.material || '')}${p.imgs.length > 1 ? ' · ' + p.imgs.length + ' ảnh' : ''}</small></a>`).join('')}</div>` : '<p>Đang cập nhật mẫu.</p>'}
<section class="cta">
<h2>Chưa thấy mẫu ưng ý?</h2>
<p>Xưởng làm theo kích thước, chất liệu và hoa văn gia đình chọn. Gửi ảnh mẫu bất kỳ hoặc kích thước đất qua Zalo để được tư vấn, báo giá và bản vẽ 3D.</p>
<div class="btns"><a class="btn btn-gold" href="tel:${TEL}">📞 Gọi ${HOTLINE}</a><a class="btn btn-line" href="https://zalo.me/${TEL}" target="_blank" rel="noopener">💬 Gửi ảnh qua Zalo</a><a class="btn btn-line" href="/bao-gia.html">🧮 Tính dự toán</a></div>
</section>
${projs.length ? `<section class="rel"><h2>Công trình thực tế</h2><ul>${projs.map(x => `<li><a href="${projectPath(x)}">${esc(x.title)}<small>${esc(x.location || '')}</small></a></li>`).join('')}</ul></section>` : ''}
${faqs.length ? `<section class="rel"><h2>Câu hỏi thường gặp</h2><ul>${faqs.map(x => `<li><a href="${articlePath(x)}">${esc(x.title)}</a></li>`).join('')}</ul></section>` : ''}
${guides.length ? `<section class="rel"><h2>Cẩm nang ${esc(cat.name.toLowerCase())}</h2><ul>${guides.map(x => `<li><a href="${articlePath(x)}">${esc(x.title)}<small>${esc(x.date || '')}</small></a></li>`).join('')}</ul></section>` : ''}`;

  sendHtml(res, 200, layout({ title, description, canonical, image: absUrl(items[0] && items[0].imgs[0]), body, jsonLd,
    active: '/san-pham.html', ogType: 'website', wide: true }));
};
