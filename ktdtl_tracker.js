// Kiến Trúc Đá Tâm Linh - Website Analytics & Leads Tracker
(function() {
    // 1. Initialize Default Stats & Leads if not present
    try {
        if (!localStorage.getItem('ktdtl_stats_pageviews')) {
            const initialViews = {
                'index.html': 1250,
                'san-pham.html': 840,
                'du-an.html': 690,
                'phong-thuy.html': 580,
                'tin-tuc.html': 420,
                'lien-he.html': 210,
                '__total__': 3990
            };
            localStorage.setItem('ktdtl_stats_pageviews', JSON.stringify(initialViews));
        }

        if (!localStorage.getItem('ktdtl_stats_clicks')) {
            const initialClicks = {
                'Gọi Hotline: 0397.247.333': 185,
                'Chat Zalo KTS Hướng': 142,
                'Nút: Nhận Báo Giá Chi Tiết': 89,
                'Nút: Đăng Ký Tư Vấn Phong Thủy': 76,
                'Nút: Xem Chi Tiết Dự Án': 64,
                'Menu: Sản Phẩm': 210,
                'Menu: Dự Án': 175,
                'Menu: Phong Thủy': 148
            };
            localStorage.setItem('ktdtl_stats_clicks', JSON.stringify(initialClicks));
        }

        if (!localStorage.getItem('ktdtl_leads')) {
            const initialLeads = [
                {
                    id: 1718001001,
                    date: "16/09/2026, 14:32:10",
                    name: "Nguyễn Văn Hùng",
                    phone: "0912345678",
                    note: "Tư vấn quy hoạch lăng mộ gia tộc 120m2 tại Thạch Thất, Hà Nội. Ưu tiên đá xanh rêu.",
                    source: "phong-thuy.html",
                    status: "pending"
                },
                {
                    id: 1718001002,
                    date: "15/09/2026, 09:15:40",
                    name: "Trần Minh Tuấn",
                    phone: "0987654321",
                    note: "Báo giá mẫu lăng thờ 3 mái đá xanh đen và 4 ngôi mộ tam sơn tại Hải Dương.",
                    source: "san-pham.html",
                    status: "called"
                },
                {
                    id: 1718001003,
                    date: "14/09/2026, 16:45:22",
                    name: "Lê Đình Thắng",
                    phone: "0905123987",
                    note: "Xem hướng đặt mộ đá chuẩn phong thủy cho bố sinh năm 1958, dự kiến thi công cuối năm.",
                    source: "phong-thuy.html",
                    status: "success"
                },
                {
                    id: 1718001004,
                    date: "13/09/2026, 11:20:05",
                    name: "Phạm Quốc Dũng",
                    phone: "0934567890",
                    note: "Khảo sát và thiết kế phối cảnh 3D khuôn viên nghĩa trang gia đình tại Nam Định.",
                    source: "du-an.html",
                    status: "called"
                }
            ];
            localStorage.setItem('ktdtl_leads', JSON.stringify(initialLeads));
        }
    } catch(e) {}

    // 2. Track Page View
    try {
        let rawPath = window.location.pathname.split('/').pop() || 'index.html';
        if (!rawPath.endsWith('.html') && rawPath !== '') rawPath += '.html';
        const pageName = rawPath || 'index.html';

        // Don't track admin page itself in public visits
        if (!pageName.includes('admin')) {
            let statsViews = JSON.parse(localStorage.getItem('ktdtl_stats_pageviews') || '{}');
            statsViews[pageName] = (statsViews[pageName] || 0) + 1;
            statsViews['__total__'] = (statsViews['__total__'] || 0) + 1;
            localStorage.setItem('ktdtl_stats_pageviews', JSON.stringify(statsViews));
        }
    } catch(e) {}

    // 3. Track Clicks (Hotline, Zalo, CTAs)
    document.addEventListener('click', function(e) {
        try {
            const target = e.target.closest('a, button');
            if (!target) return;

            let clickLabel = '';
            const href = target.getAttribute('href') || '';
            const text = (target.innerText || target.getAttribute('title') || '').trim();

            if (href.startsWith('tel:')) {
                clickLabel = 'Gọi Hotline: ' + href.replace('tel:', '').trim();
            } else if (href.includes('zalo.me')) {
                clickLabel = 'Chat Zalo KTS Hướng';
            } else if (target.classList.contains('btn-gold') || target.classList.contains('btn-action') || target.classList.contains('cta-button')) {
                clickLabel = 'Nút: ' + (text.slice(0, 30) || 'Hành động');
            } else if (href && (href.endsWith('.html') || href === '/' || href.startsWith('#'))) {
                clickLabel = 'Menu: ' + (text.slice(0, 25) || href);
            }

            if (clickLabel) {
                let statsClicks = JSON.parse(localStorage.getItem('ktdtl_stats_clicks') || '{}');
                statsClicks[clickLabel] = (statsClicks[clickLabel] || 0) + 1;
                localStorage.setItem('ktdtl_stats_clicks', JSON.stringify(statsClicks));
            }
        } catch(e) {}
    });

    // 4. Global Lead Capture Helper
    window.ktdtlSaveLead = function(lead) {
        try {
            let leads = JSON.parse(localStorage.getItem('ktdtl_leads') || '[]');
            const newLead = {
                id: Date.now(),
                date: new Date().toLocaleString('vi-VN'),
                name: lead.name || 'Khách Hàng',
                phone: lead.phone || '',
                note: lead.note || lead.demand || 'Yêu cầu tư vấn phong thủy / lăng mộ',
                source: lead.source || (window.location.pathname.split('/').pop() || 'index.html'),
                status: 'pending' // pending, called, success, cancelled
            };
            leads.unshift(newLead);
            localStorage.setItem('ktdtl_leads', JSON.stringify(leads));
            return newLead;
        } catch(e) {
            console.error('Save lead error:', e);
        }
    };
})();
