// Kiến Trúc Đá Tâm Linh - Website Analytics & Leads Tracker
(function() {
    // 1. Initialize Default Stats & Leads if not present
    try {
        if (!localStorage.getItem('ktdtl_stats_pageviews')) {
            localStorage.setItem('ktdtl_stats_pageviews', JSON.stringify({}));
        }

        if (!localStorage.getItem('ktdtl_stats_clicks')) {
            localStorage.setItem('ktdtl_stats_clicks', JSON.stringify({}));
        }

        if (!localStorage.getItem('ktdtl_leads')) {
            localStorage.setItem('ktdtl_leads', JSON.stringify([]));
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

    // 4. Global Lead Capture Helper & EmailJS Notification
    window.ktdtlSaveLead = function(lead) {
        try {
            let leads = JSON.parse(localStorage.getItem('ktdtl_leads') || '[]');
            const sendTime = new Date().toLocaleString('vi-VN');
            const newLead = {
                id: Date.now(),
                date: sendTime,
                name: lead.name || 'Khách Hàng',
                phone: lead.phone || '',
                note: lead.note || lead.demand || 'Yêu cầu tư vấn phong thủy / lăng mộ',
                source: lead.source || (window.location.pathname.split('/').pop() || 'index.html'),
                status: 'pending' // pending, called, success, cancelled
            };
            leads.unshift(newLead);
            localStorage.setItem('ktdtl_leads', JSON.stringify(leads));

            // Send notification via EmailJS REST API
            const emailData = {
                service_id: 'service_cw41nuw',
                template_id: 'template_uluy387',
                user_id: '-TBp5EuSsIHPlbM_N',
                template_params: {
                    customer_name: newLead.name,
                    customer_phone: newLead.phone,
                    customer_address: lead.address || lead.province || 'Không ghi rõ',
                    customer_product: lead.product || 'Tư vấn chung',
                    customer_message: newLead.note,
                    page_source: newLead.source,
                    send_time: sendTime,
                    // Generic fallbacks for various template formats
                    name: newLead.name,
                    phone: newLead.phone,
                    address: lead.address || lead.province || 'Không ghi rõ',
                    product: lead.product || 'Tư vấn chung',
                    message: newLead.note,
                    note: newLead.note
                }
            };

            fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(emailData)
            }).then(function(res) {
                if (res.ok) {
                    console.log('✅ EmailJS: Đã gửi thông báo về Gmail thành công!');
                } else {
                    res.text().then(function(t) { console.warn('EmailJS response error:', t); });
                }
            }).catch(function(err) {
                console.warn('EmailJS fetch error:', err);
            });

            return newLead;
        } catch(e) {
            console.error('Save lead error:', e);
        }
    };
})();
