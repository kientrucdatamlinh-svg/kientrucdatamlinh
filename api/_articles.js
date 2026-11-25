/**
 * Dữ liệu dùng chung cho các trang dựng sẵn (bài viết, sản phẩm, công trình, danh mục) và sitemap.
 * Đọc live_overrides.json (đóng gói kèm hàm, xem vercel.json → functions.includeFiles).
 *
 * Đường dẫn:
 *   Bài viết   /tin-tuc/<ten-bai>-<id>
 *   Sản phẩm   /san-pham/<ten-san-pham>
 *   Công trình /du-an/<ten-cong-trinh>-<id>
 *   Danh mục   /mau-mo-da-dep, /lang-tho-da, ... (xem CATEGORIES)
 *
 * Lưu ý: slugify() phải GIỐNG HỆT ktSlug() trong tin-tuc.html.
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

// Trang danh mục theo từ khoá khách hay tìm. cat_code lấy từ live_overrides.json → products[].cat_code
const CATEGORIES = [
  { code: 'mo', slug: 'mau-mo-da-dep', name: 'Mộ Đá', h1: 'Mẫu Mộ Đá Đẹp Tại Xưởng Ninh Vân', kw: ['mộ'],
    intro: 'Các mẫu mộ đá do xưởng Kiến Trúc Đá Tâm Linh chế tác tại làng nghề đá Ninh Vân, Hoa Lư, Ninh Bình: mộ đơn, mộ đôi, mộ tròn, mộ một mái, hai mái, ba mái. Mỗi mẫu đều có thể làm theo kích thước thước Lỗ Ban và chất liệu đá anh chị chọn.' },
  { code: 'langtho', slug: 'lang-tho-da', name: 'Lăng Thờ Đá', h1: 'Mẫu Lăng Thờ Đá Đẹp – Lăng Thờ Chung Dòng Họ', kw: ['lăng thờ', 'lăng mộ', 'gia tộc'],
    intro: 'Lăng thờ đá là công trình thờ chung của gia đình, dòng họ, đặt ở trung tâm khu lăng mộ. Dưới đây là các mẫu lăng thờ một mái, hai mái, ba mái xưởng đã chế tác tại Ninh Vân.' },
  { code: 'nhatho', slug: 'nha-tho-ho-bang-da', name: 'Đá Nhà Thờ Họ', h1: 'Nhà Thờ Họ Bằng Đá – Cột Đá, Chiếu Rồng, Bậc Đá', kw: ['nhà thờ'],
    intro: 'Các hạng mục đá cho nhà thờ họ, từ đường: cột đá, chân tảng, chiếu rồng, bậc tam cấp, bịp bậc, sập thờ. Xưởng nhận làm trọn gói hoặc từng hạng mục theo bản vẽ.' },
  { code: 'cong', slug: 'cong-da', name: 'Cổng Đá', h1: 'Mẫu Cổng Đá Đẹp – Cổng Nhà Thờ Họ, Cổng Lăng Mộ', kw: ['cổng'],
    intro: 'Mẫu cổng đá cho nhà thờ họ, khu lăng mộ, đình chùa và nhà ở, chạm khắc tại xưởng Ninh Vân, vận chuyển và lắp đặt tận nơi.' },
  { code: 'tuongda', slug: 'tuong-da-linh-vat', name: 'Tượng Đá & Linh Vật', h1: 'Tượng Đá, Linh Vật & Đồ Thờ Bằng Đá', kw: ['tượng', 'linh vật', 'nghê', 'lư hương', 'bàn lễ', 'đèn đá'],
    intro: 'Linh vật đá (nghê, tì hưu, voi, ngựa) và đồ thờ bằng đá (lư hương, bàn lễ, đèn đá, chậu đá) cho lăng mộ, nhà thờ họ, sân vườn, chế tác thủ công tại làng nghề Ninh Vân.' },
  { code: 'lancan', slug: 'lan-can-da', name: 'Lan Can Đá', h1: 'Mẫu Lan Can Đá (Hàng Rào Đá) Lăng Mộ & Nhà Thờ Họ', kw: ['lan can', 'hàng rào'],
    intro: 'Lan can đá, hàng rào đá bao quanh khu lăng mộ và nhà thờ họ, nhiều mẫu hoa văn, làm theo chiều dài thực tế công trình.' },
  { code: 'cuonthu', slug: 'cuon-thu-da', name: 'Cuốn Thư Đá', h1: 'Mẫu Cuốn Thư Đá Đẹp', kw: ['cuốn thư'],
    intro: 'Cuốn thư đá (bình phong đá) đặt trước lăng mộ, nhà thờ họ, khắc chữ và hoa văn theo yêu cầu gia đình.' },
  { code: 'thap', slug: 'thap-da', name: 'Tháp Đá', h1: 'Mẫu Tháp Đá – Tháp Mộ, Tháp Hoả Táng', kw: ['tháp', 'hỏa táng', 'hoả táng'],
    intro: 'Tháp đá dùng làm tháp mộ, tháp đặt tro cốt sau hoả táng, tháp chùa, chế tác nguyên khối tại xưởng Ninh Vân.' }
];

function articlePath(a) { return '/tin-tuc/' + slugify(a.title) + '-' + a.id; }
function productPath(p) { return '/san-pham/' + slugify(p.title); }
function projectPath(p) { return '/du-an/' + slugify(p.title) + '-' + p.id; }
function categoryPath(c) { return '/' + c.slug; }

function toList(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.trim().startsWith('[')) {
    try { return JSON.parse(v.replace(/'/g, '"')); } catch (e) { return []; }
  }
  return v ? [v] : [];
}

let cache = null;
function loadData() {
  if (cache) return cache;
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'live_overrides.json'), 'utf8')) || {};
  } catch (e) {
    console.error('Không đọc được live_overrides.json', e);
  }
  const visible = x => x && x.title && !x.hidden && x.status !== 'hidden' && x.status !== 'draft';
  const articles = (Array.isArray(data.articles) ? data.articles : []).filter(a => visible(a) && a.id != null);
  // Mô tả viết lại theo ảnh thật (product_descriptions.json, khoá = tên mẫu). Không có thì dùng mô tả cũ.
  // Để file riêng để trang quản trị đồng bộ live_overrides.json không ghi đè mất.
  let descs = {};
  try { descs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'product_descriptions.json'), 'utf8')) || {}; } catch (e) {}
  // Giá, kích thước thật, nơi đã làm do chủ xưởng ghi trong Sổ mô tả (product_info.json, khoá = tên mẫu).
  // Chỉ mẫu nào chủ xưởng cho hiện giá mới có "price" trong file này.
  let info = {};
  try { info = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'product_info.json'), 'utf8')) || {}; } catch (e) {}
  const products = (Array.isArray(data.products) ? data.products : []).filter(visible)
    .map(p => Object.assign({}, p, { imgs: toList(p.imgs), desc: descs[p.title] || p.desc, info: info[p.title] || {} }));
  const projects = (Array.isArray(data.projects) ? data.projects : []).filter(p => visible(p) && p.id != null)
    .map(p => Object.assign({}, p, { imgs: toList(p.imgs), specs: toList(p.specs) }));
  cache = { articles, products, projects };
  return cache;
}
function loadArticles() { return loadData().articles; }

// "22/11/2026" -> "2026-11-22" (không hợp lệ -> null)
function isoDate(d) {
  const m = String(d || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  return m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0');
}

module.exports = { SITE, CATEGORIES, slugify, articlePath, productPath, projectPath, categoryPath, loadData, loadArticles, isoDate };
