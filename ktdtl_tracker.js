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

            // newLead.sent: Promise -> true nếu email ĐÃ THẬT SỰ gửi về Gmail, false nếu lỗi/quá 15 giây.
            // Trước đây web luôn báo "đã gửi" kể cả khi gửi hỏng -> khách tưởng xong, xưởng không nhận được gì.
            newLead.sent = new Promise(function(resolve) {
                var done = false;
                function finish(ok) { if (!done) { done = true; resolve(ok); } }
                setTimeout(function() { finish(false); }, 15000);
                fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify(emailData)
                }).then(function(res) {
                    if (res.ok) {
                        console.log('✅ EmailJS: Đã gửi thông báo về Gmail thành công!');
                        finish(true);
                    } else {
                        res.text().then(function(t) { console.warn('EmailJS response error:', res.status, t); })
                            .catch(function() {})
                            .then(function() { finish(false); });
                    }
                }).catch(function(err) {
                    console.warn('EmailJS fetch error:', err);
                    finish(false);
                });
            });

            return newLead;
        } catch(e) {
            console.error('Save lead error:', e);
        }
    };

    // 5. Hộp báo lỗi khi KHÔNG gửi được: mời khách gọi / nhắn Zalo thẳng để không mất khách
    function showSendError() {
        try {
            var old = document.getElementById('ktdtlSendError');
            if (old) old.remove();
            var box = document.createElement('div');
            box.id = 'ktdtlSendError';
            box.setAttribute('role', 'dialog');
            box.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:16px;';
            box.innerHTML =
                '<div style="max-width:420px;width:100%;background:#0a142c;border:1px solid #c5a059;border-radius:12px;padding:22px;color:#f5f7fa;font-family:Roboto,Arial,sans-serif;text-align:center;line-height:1.55;">' +
                '<div style="font-size:1.15rem;font-weight:700;color:#e5c07b;margin-bottom:8px;">Chưa gửi được yêu cầu</div>' +
                '<div style="font-size:.95rem;color:#c5cbd6;margin-bottom:16px;">Xin lỗi anh/chị, hệ thống chưa gửi được thông tin (có thể do mạng). Thông tin anh/chị nhập vẫn còn nguyên trong form.<br>Anh/chị vui lòng <b>gọi hoặc nhắn Zalo trực tiếp KTS Hướng</b> để được tư vấn ngay:</div>' +
                '<a href="tel:0397247333" style="display:block;background:#c5a059;color:#1a1205;font-weight:700;text-decoration:none;padding:12px;border-radius:8px;margin-bottom:8px;">📞 Gọi 0397.247.333</a>' +
                '<a href="https://zalo.me/0397247333" target="_blank" rel="noopener" style="display:block;border:1px solid #c5a059;color:#e5c07b;font-weight:700;text-decoration:none;padding:12px;border-radius:8px;margin-bottom:12px;">💬 Nhắn Zalo 0397.247.333</a>' +
                '<button type="button" style="background:none;border:none;color:#7e8b9b;cursor:pointer;font-size:.9rem;text-decoration:underline;">Đóng</button>' +
                '</div>';
            box.addEventListener('click', function(ev) {
                if (ev.target === box || ev.target.tagName === 'BUTTON') box.remove();
            });
            document.body.appendChild(box);
        } catch(e) {
            alert('Chưa gửi được yêu cầu. Anh/chị vui lòng gọi hoặc nhắn Zalo 0397.247.333 để được tư vấn ngay.');
        }
    }

    // 6. Gửi form có kiểm tra kết quả: chỉ báo "đã gửi" khi email THẬT SỰ về Gmail.
    //    window.ktdtlSubmitLead(lead, { form: <form>, successMessage: '...' }) -> Promise<boolean>
    window.ktdtlSubmitLead = function(lead, opts) {
        opts = opts || {};
        var form = opts.form || null;
        var btn = form ? form.querySelector('button[type="submit"], input[type="submit"]') : null;
        var oldLabel = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = 'Đang gửi...'; }
        var r = null;
        try { r = window.ktdtlSaveLead(lead); } catch(e) {}
        var p = (r && r.sent && typeof r.sent.then === 'function') ? r.sent : Promise.resolve(false);
        return p.then(function(ok) {
            if (btn) { btn.disabled = false; btn.innerHTML = oldLabel; }
            if (ok) {
                alert(opts.successMessage || 'Cảm ơn anh/chị đã gửi thông tin! KTS Nguyễn Văn Hướng sẽ liên hệ tư vấn sớm nhất.');
                if (form) form.reset();
            } else {
                showSendError();
            }
            return ok;
        });
    };
})();
