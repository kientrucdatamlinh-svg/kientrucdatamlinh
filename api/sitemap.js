/**
 * KIẾN TRÚC ĐÁ TÂM LINH - Sơ đồ trang web (sitemap.xml) tự cập nhật
 *
 * /sitemap.xml được chuyển về đây (vercel.json → rewrites). Gồm 9 trang chính
 * + MỌI bài viết, trang danh mục, sản phẩm và công trình (mỗi thứ một địa chỉ riêng), để Google biết và đọc từng trang.
 * Đăng bài mới → sơ đồ tự có bài đó, không phải sửa tay.
 */
const { SITE, CATEGORIES, articlePath, productPath, projectPath, categoryPath, loadData, isoDate } = require('./_articles');

const PAGES = [
  ['/', 'daily', '1.0'],
  ['/san-pham.html', 'weekly', '0.9'],
  ['/du-an.html', 'weekly', '0.9'],
  ['/bao-gia.html', 'weekly', '0.8'],
  ['/phong-thuy.html', 'weekly', '0.8'],
  ['/tin-tuc.html', 'daily', '0.8'],
  ['/lap-dat.html', 'monthly', '0.7'],
  ['/gioi-thieu.html', 'monthly', '0.7'],
  ['/lien-he.html', 'monthly', '0.7']
];

function x(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function handler(req, res) {
  const { articles, products, projects } = loadData();
  const dates = articles.map(a => isoDate(a.date)).filter(Boolean).sort();
  const newest = dates[dates.length - 1] || null;

  const urls = PAGES.map(([p, freq, pri]) =>
    `  <url>\n    <loc>${SITE}${p}</loc>\n` +
    (newest && (p === '/' || p === '/tin-tuc.html') ? `    <lastmod>${newest}</lastmod>\n` : '') +
    `    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`);

  articles
    .slice()
    .sort((a, b) => Number(b.id) - Number(a.id))
    .forEach(a => {
      const d = isoDate(a.date);
      urls.push(`  <url>\n    <loc>${x(SITE + articlePath(a))}</loc>\n` +
        (d ? `    <lastmod>${d}</lastmod>\n` : '') +
        `    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
    });

  const add = (p, freq, pri) => urls.push(`  <url>\n    <loc>${x(SITE + p)}</loc>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`);
  CATEGORIES.forEach(c => add(categoryPath(c), 'weekly', '0.9'));
  products.forEach(p => add(productPath(p), 'monthly', '0.7'));
  projects.forEach(p => add(projectPath(p), 'monthly', '0.6'));

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
};
