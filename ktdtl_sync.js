/**
 * KIẾN TRÚC ĐÁ TÂM LINH - CLOUD & GLOBAL SYNC ENGINE v3
 * Đồng bộ dữ liệu qua file live_overrides.json.
 *
 * BẢO MẬT: file này KHÔNG còn chứa token GitHub. Mọi thao tác ghi đi qua
 * /api/sync (Vercel Serverless Function), token nằm trong biến môi trường
 * GITHUB_TOKEN trên Vercel. Trang admin chỉ cần mật khẩu quản trị (ADMIN_KEY).
 * Giao diện hàm (window.KtdtlSync) giữ nguyên như bản cũ.
 */

(function(window) {
    const API_URL = '/api/sync';
    const KEY_STORAGE = 'ktdtl_admin_key';

    const SYNC_CONFIG = {
        repo: 'kientrucdatamlinh-svg/kientrucdatamlinh',
        branch: 'main',
        overridesPath: 'live_overrides.json'
    };

    function getAdminKey(forcePrompt) {
        let key = '';
        try { key = sessionStorage.getItem(KEY_STORAGE) || ''; } catch (e) {}
        if (!key || forcePrompt) {
            key = window.prompt('Nhập mật khẩu quản trị để đồng bộ dữ liệu:') || '';
            try { if (key) sessionStorage.setItem(KEY_STORAGE, key); } catch (e) {}
        }
        if (!key) throw new Error('Chưa nhập mật khẩu quản trị.');
        return key;
    }

    function setAdminKey(key) {
        try { sessionStorage.setItem(KEY_STORAGE, key || ''); } catch (e) {}
    }

    async function callApi(method, body, retried) {
        const res = await fetch(API_URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Key': getAdminKey(false)
            },
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 401 && !retried) {
            try { sessionStorage.removeItem(KEY_STORAGE); } catch (e) {}
            getAdminKey(true);
            return callApi(method, body, true);
        }
        if (!res.ok) throw new Error(data.error || ('Lỗi đồng bộ (' + res.status + ')'));
        return data;
    }

    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let binary = '';
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.byteLength; i += chunkSize) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunkSize, bytes.byteLength)));
        }
        return btoa(binary);
    }

    function base64ToUtf8(b64) {
        const binary = atob(b64.replace(/\s/g, ''));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new TextDecoder().decode(bytes);
    }

    // Chỉ hỗ trợ live_overrides.json (máy chủ cũng chỉ cho phép file này)
    async function getFileSha() {
        const data = await callApi('GET');
        return data.sha || null;
    }

    async function commitFile(path, content, message) {
        if (path && path !== SYNC_CONFIG.overridesPath) {
            throw new Error('Chỉ được phép cập nhật ' + SYNC_CONFIG.overridesPath);
        }
        return await callApi('POST', { content: content, message: message });
    }

    async function publishGlobal(options) {
        options = options || {};
        const onProgress = options.onProgress || function() {};
        if (options.adminKey) setAdminKey(options.adminKey);
        const products = options.products || (typeof adminProducts !== 'undefined' ? adminProducts : []);
        const projects = options.projects || (typeof adminProjects !== 'undefined' ? adminProjects : []);
        const articles = options.articles || (typeof adminArticles !== 'undefined' ? adminArticles : []);
        const config   = options.config   || (typeof adminConfig   !== 'undefined' ? adminConfig   : {});
        const timestamp = Date.now();

        onProgress({ step: 1, percent: 20, message: 'Đang đóng gói ' + products.length + ' sản phẩm, ' + projects.length + ' dự án, ' + articles.length + ' bài viết...' });

        const overridesPayload = JSON.stringify({ timestamp, products, projects, articles, config });
        const sizeKB = Math.round(overridesPayload.length / 1024);

        onProgress({ step: 2, percent: 40, message: 'Đang kết nối máy chủ (file ~' + sizeKB + 'KB)...' });
        await getFileSha();

        onProgress({ step: 3, percent: 65, message: 'Đang đẩy dữ liệu lên...' });
        const commitResult = await commitFile(
            SYNC_CONFIG.overridesPath,
            overridesPayload,
            'Live data: ' + products.length + ' SP, ' + projects.length + ' DA, ' + articles.length + ' bài lúc ' + new Date().toLocaleTimeString('vi-VN')
        );

        onProgress({ step: 4, percent: 90, message: 'Đã cập nhật thành công! Dữ liệu mới sẽ hiển thị sau khi Vercel triển khai xong.' });

        const commitSha = (commitResult.commit && commitResult.commit.sha) || '';
        try {
            localStorage.setItem('ktdtl_last_published_ts', timestamp.toString());
            localStorage.setItem('ktdtl_last_commit_sha', commitSha);
        } catch (e) {}

        return {
            success: true,
            commitSha: commitSha,
            timestamp: timestamp,
            productsCount: products.length,
            projectsCount: projects.length,
            articlesCount: articles.length,
            payloadKB: sizeKB
        };
    }

    window.KtdtlSync = {
        config:        SYNC_CONFIG,
        utf8ToBase64:  utf8ToBase64,
        base64ToUtf8:  base64ToUtf8,
        getFileSha:    getFileSha,
        commitFile:    commitFile,
        publishGlobal: publishGlobal,
        setAdminKey:   setAdminKey
    };

})(window);
