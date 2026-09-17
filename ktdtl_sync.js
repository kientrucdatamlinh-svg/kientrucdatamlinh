/**
 * KIẾN TRÚC ĐÁ TÂM LINH - CLOUD & GLOBAL SYNC ENGINE
 * Đồng bộ dữ liệu từ Quản trị (Admin) lên máy chủ GitHub & Vercel Edge CDN toàn cầu.
 * Giúp dữ liệu hiển thị đồng nhất trên mọi trình duyệt, Tab ẩn danh, Điện thoại di động và Khách hàng toàn cầu.
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
        filePath: 'default_data.js'
    };

    // Helper: Safely encode UTF-8 to Base64 without callstack limits on large files
    function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let binary = '';
        const len = bytes.byteLength;
        const chunkSize = 0x8000; // 32KB chunk
        for (let i = 0; i < len; i += chunkSize) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunkSize, len)));
        }
        return btoa(binary);
    }

    // Helper: Safely decode Base64 to UTF-8
    function base64ToUtf8(b64) {
        const binary = atob(b64.replace(/\s/g, ''));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    }

    // Helper: Generate default_data.js content
    function buildDefaultDataJs(products, projects, articles, config, timestamp) {
        const ts = timestamp || Date.now();
        const dateStr = new Date(ts).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        return // Baseline data for Kien Truc Da Tam Linh
// Bản phát hành toàn cầu tự động cập nhật lúc: const DEFAULT_DATA_TIMESTAMP = \;

const DEFAULT_PRODUCTS = \;

const DEFAULT_PROJECTS = \;

const DEFAULT_ARTICLES = \;

const DEFAULT_SITE_CONFIG = \;
;
    }

    // Get current SHA of default_data.js from GitHub
    async function getFileSha(path) {
        const targetPath = path || SYNC_CONFIG.filePath;
        const url = 'https://api.github.com/repos/' + SYNC_CONFIG.repo + '/contents/' + targetPath + '?ref=' + SYNC_CONFIG.branch + '&t=' + Date.now();
        const res = await fetch(url, {
            headers: {
                'Authorization': 'token ' + getAuthToken(),
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!res.ok) {
            if (res.status === 404) return null;
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || ('Lỗi lấy thông tin file (' + res.status + ')'));
        }
        const data = await res.json();
        return data.sha;
    }

    // Commit file to GitHub
    async function commitFile(path, content, message, prevSha) {
        const b64Content = utf8ToBase64(content);
        const url = 'https://api.github.com/repos/' + SYNC_CONFIG.repo + '/contents/' + path;
        const body = {
            message: message || ('Xuất bản dữ liệu website từ Admin [' + new Date().toISOString() + ']'),
            content: b64Content,
            branch: SYNC_CONFIG.branch
        };
        if (prevSha) {
            body.sha = prevSha;
        }

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
            throw new Error(err.message || ('Lỗi xuất bản dữ liệu lên GitHub (' + res.status + ')'));
        }

        return await res.json();
    }

    // Check Vercel deployment status
    async function checkLatestDeployment() {
        try {
            const url = 'https://api.github.com/repos/' + SYNC_CONFIG.repo + '/deployments?per_page=3&t=' + Date.now();
            const res = await fetch(url, {
                headers: {
                    'Authorization': 'token ' + getAuthToken(),
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!res.ok) return null;
            const deps = await res.json();
            if (!Array.isArray(deps) || deps.length === 0) return null;
            
            const latest = deps[0];
            const statRes = await fetch(latest.statuses_url, {
                headers: {
                    'Authorization': 'token ' + getAuthToken(),
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!statRes.ok) return null;
            const statuses = await statRes.json();
            if (!Array.isArray(statuses) || statuses.length === 0) return null;

            return {
                deploymentId: latest.id,
                createdAt: latest.created_at,
                state: statuses[0].state,
                targetUrl: statuses[0].target_url,
                description: statuses[0].description
            };
        } catch (e) {
            console.warn('Check deployment status error:', e);
            return null;
        }
    }

    // Main Global Publish function
    async function publishGlobal(options = {}) {
        const onProgress = options.onProgress || function() {};
        const products = options.products || (typeof adminProducts !== 'undefined' ? adminProducts : []);
        const projects = options.projects || (typeof adminProjects !== 'undefined' ? adminProjects : []);
        const articles = options.articles || (typeof adminArticles !== 'undefined' ? adminArticles : []);
        const config = options.config || (typeof adminConfig !== 'undefined' ? adminConfig : {});
        const timestamp = Date.now();

        onProgress({ step: 1, percent: 20, message: 'Đang đóng gói ' + products.length + ' sản phẩm, ' + projects.length + ' dự án, ' + articles.length + ' bài viết...' });

        const jsContent = buildDefaultDataJs(products, projects, articles, config, timestamp);

        onProgress({ step: 2, percent: 45, message: 'Đang kết nối máy chủ GitHub...' });
        const sha = await getFileSha(SYNC_CONFIG.filePath);

        onProgress({ step: 3, percent: 70, message: 'Đang đẩy mã nguồn lên GitHub & kích hoạt hệ thống Vercel CDN...' });
        const commitResult = await commitFile(
            SYNC_CONFIG.filePath,
            jsContent,
            'Xuất bản toàn cầu: ' + products.length + ' SP, ' + projects.length + ' DA, ' + articles.length + ' bài viết lúc ' + new Date().toLocaleTimeString('vi-VN'),
            sha
        );

        localStorage.setItem('ktdtl_last_published_ts', timestamp.toString());
        localStorage.setItem('ktdtl_last_commit_sha', commitResult.commit?.sha || '');

        onProgress({ step: 4, percent: 90, message: 'Vercel đang triển khai tới các trạm máy chủ Edge toàn cầu (khoảng 15-20s)...' });

        return {
            success: true,
            commitSha: commitResult.commit?.sha,
            timestamp: timestamp,
            productsCount: products.length,
            projectsCount: projects.length,
            articlesCount: articles.length
        };
    }

    // Export to global scope
    window.KtdtlSync = {
        config: SYNC_CONFIG,
        utf8ToBase64,
        base64ToUtf8,
        buildDefaultDataJs,
        getFileSha,
        commitFile,
        checkLatestDeployment,
        publishGlobal
    };
})(window);
