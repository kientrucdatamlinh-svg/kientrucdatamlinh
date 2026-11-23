/**
 * KIẾN TRÚC ĐÁ TÂM LINH - Trang riêng cho từng bài viết (Vercel Serverless Function)
 *
 * Trước đây bài viết chỉ mở dạng cửa sổ bật lên trong tin-tuc.html (#article-ID),
 * nên Google coi cả trăm bài là MỘT trang và gần như không đưa bài nào lên kết quả tìm kiếm.
 * Hàm này dựng sẵn HTML đầy đủ cho từng bài tại /tin-tuc/<ten-bai>-<id>
 * (vercel.json → rewrites), có tiêu đề, mô tả, ảnh chia sẻ, dữ liệu cấu trúc cho Google.
 *
 * Dữ liệu lấy từ live_overrides.json: đăng/sửa bài ở trang quản trị → web tự cập nhật sau khi Vercel triển khai lại.
 */
const { SITE, slugify, articlePath, productPath, categoryPath, CATEGORIES, loadArticles, loadData, isoDate } = require('./_articles');

const { esc, plain, cut, absUrl, layout, HOTLINE, TEL, thumb } = require('./_layout');

// Sửa đường dẫn trong nội dung bài cho đúng khi bài nằm ở /tin-tuc/...:
//  - "#article-12" hoặc "tin-tuc.html#article-12" -> trang riêng của bài 12
//  - "lien-he.html", "images/x.jpg" (đường dẫn tương đối) -> "/lien-he.html", "/images/x.jpg"
function fixContent(html, byId) {
  return String(html || '').replace(/\b(href|src)=(["'])([^"']*)\2/gi, function (all, attr, q, url) {
    const m = url.match(/^(?:\/?tin-tuc\.html)?#article-(\d+)$/);
    if (m) {
      const target = byId[m[1]];
      return attr + '=' + q + (target ? articlePath(target) : '/tin-tuc.html#article-' + m[1]) + q;
    }
    if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/|#|\?)/i.test(url)) return all; // http:, tel:, mailto:, /abs, #, ?
    return attr + '=' + q + '/' + url + q;
  });
}

function notFound(res) {
  const body = `<h1>Không tìm thấy bài viết</h1>
<p>Bài viết này không còn hoặc đường dẫn đã thay đổi.</p>
<p><a class="btn btn-gold" href="/tin-tuc.html">Xem tất cả bài viết</a></p>`;
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300');
  res.end(layout({ title: 'Không tìm thấy bài viết | Kiến Trúc Đá Tâm Linh', description: 'Không tìm thấy bài viết.',
    canonical: SITE + '/tin-tuc.html', image: absUrl(''), body, status: 404 }));
}

module.exports = function handler(req, res) {
  const raw = String((req.query && req.query.path) || '').replace(/\/+$/, '').replace(/\.html$/, '');
  const m = raw.match(/-(\d+)$/) || raw.match(/^(\d+)$/);
  if (!m) return notFound(res);

  const all = loadArticles();
  const byId = {};
  all.forEach(a => { byId[String(a.id)] = a; });
  const a = byId[m[1]];
  if (!a) return notFound(res);

  // Đổi tên bài -> đường dẫn đổi theo; đường dẫn cũ tự chuyển sang đường dẫn mới
  const canonicalPath = articlePath(a);
  if ('/tin-tuc/' + raw !== canonicalPath) {
    res.statusCode = 301;
    res.setHeader('Location', canonicalPath);
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    return res.end();
  }

  const canonical = SITE + canonicalPath;
  const description = cut(plain(a.excerpt) || plain(a.content), 158);
  const image = absUrl(a.image);
  const iso = isoDate(a.date);
  const catName = a.categoryName || 'Tin tức';

  const related = all
    .filter(x => String(x.id) !== String(a.id))
    .map(x => ({ x, score: (x.category === a.category ? 2 : 0) + (Number(x.id) > Number(a.id) ? 0 : 1) }))
    .sort((p, q) => q.score - p.score || Math.abs(Number(p.x.id) - Number(a.id)) - Math.abs(Number(q.x.id) - Number(a.id)))
    .slice(0, 6).map(r => r.x);

  // Sản phẩm liên quan: chọn danh mục theo từ khoá trong tên bài (mặc định Mộ Đá)
  const t = String(a.title || '').toLowerCase();
  const cat = CATEGORIES.find(c => c.kw.some(k => t.includes(k))) || CATEGORIES[0];
  const prods = loadData().products.filter(p => p.cat_code === cat.code).slice(0, 4);

  const jsonLd = [{
    '@context': 'https://schema.org', '@type': 'Article',
    headline: a.title, description, image: [image],
    datePublished: iso || undefined, dateModified: iso || undefined,
    author: { '@type': 'Person', name: a.author || 'KTS Nguyễn Văn Hướng' },
    publisher: { '@type': 'Organization', name: 'Kiến Trúc Đá Tâm Linh',
      logo: { '@type': 'ImageObject', url: SITE + '/images/logo/icon-512.png' } },
    mainEntityOfPage: canonical, inLanguage: 'vi'
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Tin tức', item: SITE + '/tin-tuc.html' },
      { '@type': 'ListItem', position: 3, name: a.title, item: canonical }
    ]
  }];

  const body = `<article>
<div class="crumb"><a href="/">Trang chủ</a> › <a href="/tin-tuc.html">Tin tức</a> › ${esc(catName)}</div>
<a class="tag" href="/tin-tuc.html">${esc(catName)}</a>
<h1>${esc(a.title)}</h1>
<div class="meta"><span>✍️ ${esc(a.author || 'KTS Nguyễn Văn Hướng')}</span>${a.date ? `<span>📅 ${iso ? `<time datetime="${iso}">${esc(a.date)}</time>` : esc(a.date)}</span>` : ''}${a.readTime ? `<span>⏱ ${esc(a.readTime)} đọc</span>` : ''}</div>
${a.image ? `<img class="hero" src="${esc(a.image.startsWith('http') ? a.image : '/' + a.image.replace(/^\/+/, ''))}" alt="${esc(a.title)}" width="1200" height="675" fetchpriority="high">` : ''}
<div class="content">${fixContent(a.content, byId)}</div>
</article>
<section class="cta">
<h2>Cần tư vấn, báo giá lăng mộ đá?</h2>
<p>Gọi hoặc nhắn Zalo cho KTS Nguyễn Văn Hướng – xưởng đá tại làng nghề Ninh Vân, Hoa Lư, Ninh Bình. Gửi bản vẽ 3D miễn phí.</p>
<div class="btns"><a class="btn btn-gold" href="tel:${TEL}">📞 Gọi ${HOTLINE}</a><a class="btn btn-line" href="https://zalo.me/${TEL}" target="_blank" rel="noopener">💬 Chat Zalo</a><a class="btn btn-line" href="/lien-he.html">✉️ Để lại thông tin</a></div>
</section>
${prods.length ? `<section class="rel"><h2>Mẫu ${esc(cat.name.toLowerCase())} tại xưởng</h2><div class="grid">${prods.map(p => `<a class="card" href="${productPath(p)}"><img src="${esc(thumb(p.imgs[0]))}" alt="${esc(p.title)}" loading="lazy" width="400" height="300"><b>${esc(p.title)}</b><small>${esc(p.material || '')}</small></a>`).join('')}</div><p><a href="${categoryPath(cat)}">Xem tất cả mẫu ${esc(cat.name.toLowerCase())} →</a></p></section>` : ''}
${related.length ? `<section class="rel"><h2>Bài viết liên quan</h2><ul>${related.map(r => `<li><a href="${articlePath(r)}">${esc(r.title)}<small>${esc(r.categoryName || '')}${r.date ? ' · ' + esc(r.date) : ''}</small></a></li>`).join('')}</ul></section>` : ''}
<a class="back" href="/tin-tuc.html">← Xem tất cả bài viết</a>`;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(layout({ title: a.title + ' | Kiến Trúc Đá Tâm Linh', description, canonical, image, body, jsonLd }));
};

module.exports.slugify = slugify;
