/**
 * Dùng chung cho /api/bai-viet và /api/sitemap.
 * Đọc danh sách bài viết từ live_overrides.json (được đóng gói kèm hàm, xem vercel.json → functions.includeFiles)
 * và tạo đường dẫn riêng cho từng bài: /tin-tuc/<ten-bai-khong-dau>-<id>
 *
 * Lưu ý: hàm slugify() phải GIỐNG HỆT hàm ktSlug() trong tin-tuc.html.
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://kientrucdatamlinh.com';

function slugify(text) {
  return String(text || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'bai-viet';
}

function articlePath(a) {
  return '/tin-tuc/' + slugify(a.title) + '-' + a.id;
}

let cache = null;
function loadArticles() {
  if (cache) return cache;
  let list = [];
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'live_overrides.json'), 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data.articles)) list = data.articles;
  } catch (e) {
    console.error('Không đọc được live_overrides.json', e);
  }
  cache = list.filter(function (a) {
    return a && a.id != null && a.title && !a.hidden && a.status !== 'hidden' && a.status !== 'draft';
  });
  return cache;
}

// "22/11/2026" -> "2026-11-22" (không hợp lệ -> null)
function isoDate(d) {
  const m = String(d || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const dd = m[1].padStart(2, '0'), mm = m[2].padStart(2, '0');
  return m[3] + '-' + mm + '-' + dd;
}

module.exports = { SITE, slugify, articlePath, loadArticles, isoDate };
