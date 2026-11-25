/**
 * Bấm xem một sản phẩm -> chuyển sang trang riêng của mẫu đó (/san-pham/<ten-mau>)
 * thay cho cửa sổ nổi cũ. Đặt ngay trước </body>, sau mọi script khác, để ghi đè openGroupedProductModal.
 * slug() phải GIỐNG HỆT slugify() trong api/_articles.js.
 */
(function () {
  function slug(text) {
    return String(text || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'bai-viet';
  }
  function titleFor(idx) {
    // Lấy tên mẫu từ chính thẻ được bấm: data-name (trang Sản phẩm) hoặc tiêu đề h3 (trang chủ)
    var el = document.querySelector('[onclick="openGroupedProductModal(' + idx + ')"]');
    var card = el && el.closest('.product-card, [data-name]');
    if (card) {
      var name = card.getAttribute('data-name');
      var h = card.querySelector('h3');
      if (!name && h) name = h.textContent;
      if (name && name.trim()) return name.trim();
    }
    try {
      if (typeof groupedProductsData !== 'undefined' && groupedProductsData[idx]) return groupedProductsData[idx].title;
    } catch (e) {}
    return null;
  }
  function openProductPage(idx) {
    var t = titleFor(idx);
    if (t) { window.location.href = '/san-pham/' + slug(t); return; }
    // Dữ liệu chưa tải xong: chờ rồi thử lại
    if (window.ktDataReady && !window.ktDataDone) window.ktDataReady.then(function () { openProductPage(idx); });
  }
  window.openGroupedProductModal = openProductPage;
  window.ktProductUrl = function (title) { return '/san-pham/' + slug(title); };
})();
