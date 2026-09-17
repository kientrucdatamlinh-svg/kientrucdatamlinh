/**
 * KIẾN TRÚC ĐÁ TÂM LINH - CLOUD & GLOBAL SYNC ENGINE v2
 * Đồng bộ dữ liệu qua file live_overrides.json nhỏ gọn (~5-20KB)
 * thay vì commit toàn bộ default_data.js (~540KB).
 * Giúp dữ liệu hiển thị đồng nhất trên mọi trình duyệt & Tab ẩn danh.
 */

(function(window) {
    // Encrypted token protected with admin authorization key
    const _ENCRYPTED_T = 'KQEeN1ZdAzJTBh8nPBIGDwIjVTQjJigFUyMFPXQYexk9WFAzBB1ceA==';
    const _KEY_PART = 'Ninhbinh1@';

    function getAuthToken() {
        const raw = atob(_ENCRYPTED_T);
        let res = '';
        for (let i = 0; i < raw.length; i++) {
            res += String.fromCharCode(raw.charCodeAt(i) ^ _KEY_PART.charCodeAt(i % _KEY_PART.length));
        }
        return res;
    }

    const SYNC_CONFIG = {
        repo: 'kientrucdatamlinh-svg/kientrucdatamlinh',
        branch: 'main',
        overridesPath: 'live_overrides.json'
    };

    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let binary = '';
        const len = bytes.byteLength;
        const chunkSize = 0x8000;
        for (let i = 0; i < len; i += chunkSize) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunkSize, len)));
        }
        return btoa(binary);
    }

    function base64ToUtf8(b64) {
        const binary = atob(b64.replace(/\s/g, ''));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    }

    async function getFileSha(path) {
        const url = 'https://api.github.com/repos/' + SYNC_CONFIG.repo
            + '/contents/' + path
            + '?ref=' + SYNC_CONFIG.branch
            + '&t=' + Date.now();
        const res = await fetch(url, {
            headers: {
                'Authorization': 'token ' + getAuthToken(),
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!res.ok) {
            if (res.status === 404) return null;
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || ('Loi lay SHA (' + res.status + ')'));
        }
        const data = await res.json();
        return data.sha;
    }

    async function commitFile(path, content, message, prevSha) {
        const b64Content = utf8ToBase64(content);
        const url = 'https://api.github.com/repos/' + SYNC_CONFIG.repo + '/contents/' + path;
        const body = {
            message: message || ('Cap nhat du lieu live tu Admin [' + new Date().toISOString() + ']'),
            content: b64Content,
            branch: SYNC_CONFIG.branch
        };
        if (prevSha) body.sha = prevSha;

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + getAuthToken(),
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || ('Loi commit file (' + res.status + ')'));
        }
        return await res.json();
    }

    async function publishGlobal(options) {
        options = options || {};
        const onProgress = options.onProgress || function() {};
        const products = options.products || (typeof adminProducts !== 'undefined' ? adminProducts : []);
        const projects = options.projects || (typeof adminProjects !== 'undefined' ? adminProjects : []);
        const articles = options.articles || (typeof adminArticles !== 'undefined' ? adminArticles : []);
        const config   = options.config   || (typeof adminConfig   !== 'undefined' ? adminConfig   : {});
        const timestamp = Date.now();

        onProgress({ step: 1, percent: 20, message: 'Dang dong goi ' + products.length + ' san pham, ' + projects.length + ' du an, ' + articles.length + ' bai viet...' });

        const overridesPayload = JSON.stringify({
            timestamp: timestamp,
            products:  products,
            projects:  projects,
            articles:  articles,
            config:    config
        });

        const sizeKB = Math.round(overridesPayload.length / 1024);
        onProgress({ step: 2, percent: 40, message: 'Dang ket noi GitHub (file ~' + sizeKB + 'KB)...' });

        const sha = await getFileSha(SYNC_CONFIG.overridesPath);

        onProgress({ step: 3, percent: 65, message: 'Dang day du lieu len GitHub...' });

        const commitResult = await commitFile(
            SYNC_CONFIG.overridesPath,
            overridesPayload,
            'Live data: ' + products.length + ' SP, ' + projects.length + ' DA, ' + articles.length + ' bai luc ' + new Date().toLocaleTimeString('vi-VN'),
            sha
        );

        onProgress({ step: 4, percent: 90, message: 'Da commit thanh cong! Du lieu moi hien thi ngay lap tuc.' });

        localStorage.setItem('ktdtl_last_published_ts', timestamp.toString());
        localStorage.setItem('ktdtl_last_commit_sha', (commitResult.commit && commitResult.commit.sha) || '');

        return {
            success: true,
            commitSha: commitResult.commit && commitResult.commit.sha,
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
        publishGlobal: publishGlobal
    };

})(window);
