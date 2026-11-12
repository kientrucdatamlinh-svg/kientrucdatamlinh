# Kiến Trúc Đá Tâm Linh

Website giới thiệu và quảng bá các công trình đá mỹ nghệ, lăng mộ đá, nhà thờ họ, tượng đá truyền thống Ninh Vân - Ninh Bình.

- **Hotline / Zalo:** 0397.247.333
- **Địa chỉ:** Làng nghề đá mỹ nghệ Ninh Vân, Hoa Lư, Ninh Bình

## Nén ảnh

Chạy `python scripts/optimize_images.py` (cần Pillow) để tạo ảnh WebP từ các thư mục ảnh gốc. Công cụ tự chỉnh hướng EXIF trước khi đổi kích thước và nén, tránh ảnh điện thoại bị xoay ngang.

## Cấu trúc

- Các trang: `index.html`, `san-pham.html`, `du-an.html`, `bao-gia.html`, `phong-thuy.html`, `tin-tuc.html`, `lap-dat.html`, `gioi-thieu.html`, `lien-he.html`.
- `site-common.js`: dữ liệu dự án/sản phẩm và các hàm dùng chung (menu, lightbox, slider) cho các trang Báo giá, Giới thiệu, Lắp đặt, Liên hệ, Phong thủy.
- `vercel.json`: chuyển hướng 301 các trang cũ đã gộp (`tu-van-phong-thuy.html`, `xem-huong-mo-kich-thuoc-mo.html` → `phong-thuy.html`; `tu-van-lap-dat.html` → `lap-dat.html`; `kientrucdatamlinh.html` → trang chủ) và cache ảnh.

## Đồng bộ dữ liệu từ trang quản trị

`ktdtl_sync.js` không còn chứa token GitHub. Việc ghi `live_overrides.json` đi qua hàm máy chủ `api/sync.js`. Cần khai báo trên Vercel (Project → Settings → Environment Variables), rồi Redeploy:

| Biến | Giá trị |
|---|---|
| `GITHUB_TOKEN` | Token GitHub loại *fine-grained*, chỉ chọn repo này, quyền **Contents: Read and write** |
| `ADMIN_KEY` | Mật khẩu quản trị mới (dài, khó đoán). Trang admin sẽ hỏi mật khẩu này khi bấm đồng bộ |

Tuyệt đối không dán token vào bất kỳ file `.html`/`.js` nào.
