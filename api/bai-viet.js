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
const { SITE, slugify, articlePath, loadArticles, isoDate } = require('./_articles');

const HOTLINE = '0397.247.333';
const TEL = '0397247333';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function plain(html) {
  return String(html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
function cut(s, n) {
  if (s.length <= n) return s;
  const t = s.slice(0, n);
  return t.slice(0, t.lastIndexOf(' ') > n * 0.6 ? t.lastIndexOf(' ') : n).replace(/[\s,.;:–-]+$/, '') + '…';
}
function absUrl(u) {
  if (!u) return SITE + '/images/logo/logo-sen-ktdtl.webp';
  if (/^https?:\/\//i.test(u)) return u;
  return SITE + '/' + String(u).replace(/^\/+/, '');
}

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

const NAV = [
  ['/', 'Trang chủ'], ['/san-pham.html', 'Sản phẩm'], ['/du-an.html', 'Dự án'], ['/bao-gia.html', 'Báo giá'],
  ['/phong-thuy.html', 'Phong thủy'], ['/lap-dat.html', 'Lắp đặt'], ['/tin-tuc.html', 'Tin tức'], ['/lien-he.html', 'Liên hệ']
];

const CSS = `
:root{--navy-deep:#050b1a;--navy-dark:#0a142c;--navy-medium:#112046;--navy-light:#193166;--gold:#c5a059;--gold-light:#e5c07b;--white:#f5f7fa;--silver:#c5cbd6;--gray:#7e8b9b}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--navy-deep);color:var(--silver);font-family:'Roboto',system-ui,-apple-system,'Segoe UI',sans-serif;font-size:17px;line-height:1.75}
a{color:var(--gold-light)}img{max-width:100%;height:auto}
.top{position:sticky;top:0;z-index:20;background:rgba(5,11,26,.95);border-bottom:1px solid rgba(197,160,89,.18);backdrop-filter:blur(8px)}
.top-in{max-width:1120px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;gap:16px;justify-content:space-between}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--gold-light);font-family:'Lora',Georgia,serif;font-weight:700;font-size:1.05rem;line-height:1.2}
.brand img{width:42px;height:42px;border-radius:50%;object-fit:cover}
.nav{display:flex;gap:18px;flex-wrap:wrap}.nav a{color:var(--silver);text-decoration:none;font-size:.92rem}.nav a:hover,.nav a.on{color:var(--gold-light)}
.call{white-space:nowrap;background:var(--gold);color:#1a1205;text-decoration:none;font-weight:700;padding:8px 14px;border-radius:6px;font-size:.92rem}
.wrap{max-width:820px;margin:0 auto;padding:22px 16px 40px}
.crumb{font-size:.85rem;color:var(--gray);margin-bottom:14px}.crumb a{color:var(--gray);text-decoration:none}.crumb a:hover{color:var(--gold-light)}
.tag{display:inline-block;border:1px solid rgba(197,160,89,.4);color:var(--gold-light);border-radius:20px;padding:2px 12px;font-size:.8rem;margin-bottom:10px;text-decoration:none}
h1{font-family:'Lora',Georgia,serif;color:var(--white);font-size:clamp(1.6rem,4.5vw,2.3rem);line-height:1.3;margin:0 0 12px}
.meta{font-size:.88rem;color:var(--gray);display:flex;flex-wrap:wrap;gap:6px 18px;margin-bottom:20px}
.hero{width:100%;border-radius:10px;margin:0 0 22px;aspect-ratio:16/9;object-fit:cover;background:var(--navy-medium)}
.content h2,.content h3{font-family:'Lora',Georgia,serif;color:var(--gold-light);line-height:1.35;margin:1.8em 0 .6em}
.content h2{font-size:1.45rem}.content h3{font-size:1.2rem}
.content p{margin:0 0 1.05em}.content strong{color:var(--white)}
.content img{border-radius:8px;margin:10px 0;display:block}
.content figure{margin:1.2em 0}.content figcaption{font-size:.85rem;color:var(--gray);text-align:center}
.content ul,.content ol{padding-left:1.3em}.content li{margin:.3em 0}
.content blockquote{margin:1.2em 0;padding:12px 18px;border-left:3px solid var(--gold);background:var(--navy-dark);border-radius:0 8px 8px 0}
.content table{width:100%;border-collapse:collapse;margin:1em 0;font-size:.95rem;display:block;overflow-x:auto}
.content th,.content td{border:1px solid var(--navy-light);padding:8px 10px;text-align:left;vertical-align:top}
.content th{background:var(--navy-medium);color:var(--gold-light)}
.cta{margin:34px 0 10px;padding:22px;border:1px solid rgba(197,160,89,.35);border-radius:12px;background:linear-gradient(135deg,var(--navy-dark),var(--navy-medium))}
.cta h2{font-family:'Lora',Georgia,serif;color:var(--white);font-size:1.25rem;margin:0 0 6px}.cta p{margin:0 0 14px}
.btns{display:flex;flex-wrap:wrap;gap:10px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-size:1rem;flex:1 1 200px}
.btn-gold{background:var(--gold);color:#1a1205}.btn-line{border:1px solid var(--gold);color:var(--gold-light)}
.rel h2{font-family:'Lora',Georgia,serif;color:var(--white);font-size:1.25rem;margin:36px 0 12px}
.rel ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}
.rel a{display:block;padding:12px 14px;background:var(--navy-dark);border:1px solid var(--navy-light);border-radius:8px;text-decoration:none;color:var(--silver);line-height:1.45}
.rel a:hover{border-color:var(--gold);color:var(--gold-light)}.rel small{display:block;color:var(--gray);margin-top:3px}
.back{display:inline-block;margin-top:22px}
footer{border-top:1px solid rgba(197,160,89,.15);background:var(--navy-dark);color:var(--gray);font-size:.88rem;text-align:center;padding:22px 16px 90px}
footer strong{color:var(--gold-light)}
.float{position:fixed;left:0;right:0;bottom:0;z-index:30;display:none;gap:8px;padding:8px;background:rgba(5,11,26,.96);border-top:1px solid rgba(197,160,89,.25)}
.float .btn{padding:11px 10px;font-size:.95rem}
@media (max-width:860px){.nav{display:none}.float{display:flex}}
@media (max-width:420px){.brand span{font-size:.9rem}.call{display:none}}
`;

function layout({ title, description, canonical, image, body, jsonLd, status }) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${status === 404 ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(canonical)}">
<meta name="robots" content="index, follow, max-image-preview:large">`}
<meta property="og:type" content="article">
<meta property="og:site_name" content="Kiến Trúc Đá Tâm Linh">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:locale" content="vi_VN">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/images/logo/icon-180.png">
<meta name="theme-color" content="#050b1a">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@500;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body>
<header class="top"><div class="top-in">
<a class="brand" href="/"><img src="/images/logo/logo-sen-ktdtl.webp" alt="Logo Kiến Trúc Đá Tâm Linh" width="42" height="42"><span>Kiến Trúc Đá Tâm Linh</span></a>
<nav class="nav">${NAV.map(n => `<a href="${n[0]}"${n[0] === '/tin-tuc.html' ? ' class="on"' : ''}>${n[1]}</a>`).join('')}</nav>
<a class="call" href="tel:${TEL}">📞 ${HOTLINE}</a>
</div></header>
<main class="wrap">${body}</main>
<footer>
<p><strong>Kiến Trúc Đá Tâm Linh</strong> – Xưởng đá mỹ nghệ, lăng mộ đá tại làng nghề Ninh Vân, Hoa Lư, Ninh Bình.</p>
<p>KTS Nguyễn Văn Hướng · Hotline/Zalo: <a href="tel:${TEL}">${HOTLINE}</a></p>
<p><a href="/tin-tuc.html">Tin tức</a> · <a href="/san-pham.html">Sản phẩm</a> · <a href="/lien-he.html">Liên hệ</a></p>
</footer>
<div class="float"><a class="btn btn-gold" href="tel:${TEL}">📞 Gọi ngay</a><a class="btn btn-line" href="https://zalo.me/${TEL}" target="_blank" rel="noopener">💬 Chat Zalo</a></div>
<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>
<script defer src="/_vercel/insights/script.js"></script>
<script>window.si=window.si||function(){(window.siq=window.siq||[]).push(arguments)};</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>`;
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
${related.length ? `<section class="rel"><h2>Bài viết liên quan</h2><ul>${related.map(r => `<li><a href="${articlePath(r)}">${esc(r.title)}<small>${esc(r.categoryName || '')}${r.date ? ' · ' + esc(r.date) : ''}</small></a></li>`).join('')}</ul></section>` : ''}
<a class="back" href="/tin-tuc.html">← Xem tất cả bài viết</a>`;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(layout({ title: a.title + ' | Kiến Trúc Đá Tâm Linh', description, canonical, image, body, jsonLd }));
};

module.exports.slugify = slugify;
