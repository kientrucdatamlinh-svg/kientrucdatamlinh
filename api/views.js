/**
 * KIẾN TRÚC ĐÁ TÂM LINH - Đếm lượt xem bài viết THẬT (Vercel Serverless Function)
 *
 * Lưu số liệu trong Upstash Redis (bản miễn phí, bật trong Vercel → Storage).
 * Vercel tự thêm biến môi trường KV_REST_API_URL / KV_REST_API_TOKEN
 * (hoặc UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) khi kết nối kho dữ liệu với dự án.
 * Chưa có kho dữ liệu thì API vẫn chạy, chỉ trả về rỗng (web ẩn số lượt xem).
 *
 * GET  /api/views          -> { enabled, views: { "<id>": số lượt xem } }
 * POST /api/views {id}     -> cộng 1 lượt xem cho bài <id>
 */
const KEY = 'ktdtl:article_views';
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|zalo|headless|lighthouse|python|curl|wget/i;

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

async function redis(cfg, command) {
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + cfg.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(data.error || ('Redis ' + res.status));
  return data.result;
}

module.exports = async function handler(req, res) {
  const cfg = redisConfig();

  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    if (!cfg) return res.status(200).json({ enabled: false, views: {} });
    try {
      const flat = (await redis(cfg, ['HGETALL', KEY])) || [];
      const views = {};
      for (let i = 0; i + 1 < flat.length; i += 2) views[flat[i]] = parseInt(flat[i + 1], 10) || 0;
      return res.status(200).json({ enabled: true, views });
    } catch (e) {
      return res.status(200).json({ enabled: false, views: {} });
    }
  }

  if (req.method === 'POST') {
    res.setHeader('Cache-Control', 'no-store');
    if (!cfg || BOT.test(req.headers['user-agent'] || '')) return res.status(204).end();
    let body = req.body;
    try { if (typeof body === 'string') body = JSON.parse(body || '{}'); } catch (e) { body = {}; }
    const id = parseInt(body && body.id, 10);
    if (!Number.isInteger(id) || id < 1 || id > 1000000) return res.status(400).json({ error: 'id không hợp lệ' });
    try {
      const n = await redis(cfg, ['HINCRBY', KEY, String(id), 1]);
      return res.status(200).json({ id, views: n });
    } catch (e) {
      return res.status(204).end();
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
