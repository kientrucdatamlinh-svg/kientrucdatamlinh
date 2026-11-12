/**
 * KIẾN TRÚC ĐÁ TÂM LINH - API đồng bộ dữ liệu (Vercel Serverless Function)
 *
 * Token GitHub KHÔNG còn nằm trong code trình duyệt. Nó được đặt trong
 * biến môi trường trên Vercel (Project → Settings → Environment Variables):
 *   GITHUB_TOKEN  : token GitHub (fine-grained, chỉ quyền Contents: Read & Write cho repo này)
 *   ADMIN_KEY     : mật khẩu quản trị, trang admin phải gửi kèm mới được ghi dữ liệu
 *   GITHUB_REPO   : (tuỳ chọn) mặc định kientrucdatamlinh-svg/kientrucdatamlinh
 *   GITHUB_BRANCH : (tuỳ chọn) mặc định main
 *
 * GET  /api/sync            -> kiểm tra mật khẩu + lấy SHA hiện tại của live_overrides.json
 * POST /api/sync {content, message} -> ghi đè live_overrides.json
 */
const crypto = require('crypto');

const ALLOWED_PATH = 'live_overrides.json';
const MAX_BYTES = 4 * 1024 * 1024;

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

async function gh(path, opts) {
  const repo = process.env.GITHUB_REPO || 'kientrucdatamlinh-svg/kientrucdatamlinh';
  const res = await fetch('https://api.github.com/repos/' + repo + path, Object.assign({}, opts, {
    headers: Object.assign({
      Authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'ktdtl-sync'
    }, opts && opts.headers)
  }));
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!process.env.GITHUB_TOKEN || !process.env.ADMIN_KEY) {
    return res.status(500).json({ error: 'Chưa cấu hình GITHUB_TOKEN / ADMIN_KEY trên Vercel.' });
  }
  const key = req.headers['x-admin-key'] || '';
  if (!key || !safeEqual(key, process.env.ADMIN_KEY)) {
    return res.status(401).json({ error: 'Sai mật khẩu quản trị.' });
  }

  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = '/contents/' + ALLOWED_PATH;

  try {
    const cur = await gh(filePath + '?ref=' + encodeURIComponent(branch), { method: 'GET' });
    if (!cur.ok && cur.status !== 404) {
      return res.status(502).json({ error: cur.data.message || ('Lỗi GitHub ' + cur.status) });
    }
    const sha = cur.ok ? cur.data.sha : null;

    if (req.method === 'GET') return res.status(200).json({ ok: true, sha });
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body || '{}');
    const content = body && body.content;
    if (typeof content !== 'string' || !content) {
      return res.status(400).json({ error: 'Thiếu nội dung.' });
    }
    if (Buffer.byteLength(content, 'utf8') > MAX_BYTES) {
      return res.status(413).json({ error: 'Dữ liệu quá lớn.' });
    }
    try { JSON.parse(content); } catch (e) {
      return res.status(400).json({ error: 'Nội dung không phải JSON hợp lệ.' });
    }

    const message = String((body && body.message) || 'Cập nhật dữ liệu live từ Admin').slice(0, 200);
    const put = await gh(filePath, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch,
        ...(sha ? { sha } : {})
      })
    });
    if (!put.ok) return res.status(502).json({ error: put.data.message || ('Lỗi commit ' + put.status) });

    return res.status(200).json({ ok: true, commit: put.data.commit || null });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Lỗi máy chủ' });
  }
};
