// Secret Admin Shortcut & Modal Trigger for Kien Truc Da Tam Linh
(function() {
    // Listen for Ctrl + Shift + K
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
            e.preventDefault();
            openAdminSecretModal();
        }
    });

    window.openAdminSecretModal = function() {
        let modal = document.getElementById('ktdtlSecretAdminModal');
        if (!modal) {
            createSecretModalDOM();
            modal = document.getElementById('ktdtlSecretAdminModal');
        }
        modal.style.display = 'flex';
        const input = document.getElementById('ktdtlAdminPassInput');
        if (input) {
            input.value = '';
            setTimeout(() => input.focus(), 150);
        }
        const errorMsg = document.getElementById('ktdtlAdminErrorMsg');
        if (errorMsg) errorMsg.style.display = 'none';
    };

    window.closeAdminSecretModal = function() {
        const modal = document.getElementById('ktdtlSecretAdminModal');
        if (modal) modal.style.display = 'none';
    };

    window.submitAdminSecretAuth = function(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('ktdtlAdminPassInput');
        const errorMsg = document.getElementById('ktdtlAdminErrorMsg');
        const box = document.getElementById('ktdtlSecretBox');
        const password = input ? input.value : '';

        // Verification: Ninhbinh1@
        if (password === 'Ninhbinh1@') {
            sessionStorage.setItem('ktdtl_admin_auth', 'authenticated');
            sessionStorage.setItem('ktdtl_admin_time', Date.now().toString());
            
            if (errorMsg) {
                errorMsg.style.display = 'block';
                errorMsg.style.color = '#10b981';
                errorMsg.style.background = 'rgba(16, 185, 129, 0.15)';
                errorMsg.style.border = '1px solid #10b981';
                errorMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Xác thực thành công! Đang chuyển đến Bảng Quản Trị...';
            }

            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 500);
        } else {
            if (box) {
                box.classList.add('ktdtl-shake');
                setTimeout(() => box.classList.remove('ktdtl-shake'), 600);
            }
            if (errorMsg) {
                errorMsg.style.display = 'block';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.background = 'rgba(239, 68, 68, 0.15)';
                errorMsg.style.border = '1px solid #ef4444';
                errorMsg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Mật khẩu không chính xác! Vui lòng thử lại.';
            }
            if (input) {
                input.select();
                input.focus();
            }
        }
    };

    window.toggleAdminPasswordVisibility = function() {
        const input = document.getElementById('ktdtlAdminPassInput');
        const icon = document.getElementById('ktdtlPassEyeIcon');
        if (input) {
            if (input.type === 'password') {
                input.type = 'text';
                if (icon) icon.className = 'fa-solid fa-eye-slash';
            } else {
                input.type = 'password';
                if (icon) icon.className = 'fa-solid fa-eye';
            }
        }
    };

    function createSecretModalDOM() {
        const modalHtml = `
        <div id="ktdtlSecretAdminModal" style="display:none; position:fixed; z-index:999999; left:0; top:0; width:100%; height:100%; background:rgba(3, 7, 18, 0.88); backdrop-filter:blur(10px); justify-content:center; align-items:center; padding:15px; box-sizing:border-box;">
            <style>
                .ktdtl-shake {
                    animation: ktdtlShake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes ktdtlShake {
                    10%, 90% { transform: translate3d(-2px, 0, 0); }
                    20%, 80% { transform: translate3d(4px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
                    40%, 60% { transform: translate3d(6px, 0, 0); }
                }
            </style>
            <div id="ktdtlSecretBox" style="background:#0a142c; border:2px solid #c5a059; border-radius:14px; max-width:440px; width:100%; padding:35px 30px; box-sizing:border-box; position:relative; box-shadow:0 20px 60px rgba(0,0,0,0.9); text-align:center; font-family:'Roboto', sans-serif;">
                <span onclick="closeAdminSecretModal()" style="position:absolute; top:15px; right:20px; color:#c5a059; font-size:28px; font-weight:bold; cursor:pointer; line-height:1;">&times;</span>
                
                <div style="width:64px; height:64px; border-radius:50%; background:rgba(197, 160, 89, 0.15); border:1.5px solid #c5a059; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; color:#c5a059; font-size:1.8rem; box-shadow:0 0 20px rgba(197, 160, 89, 0.3);">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>
                
                <h3 style="color:#e5c07b; font-family:'Lora', serif; font-size:1.35rem; margin:0 0 6px; font-weight:700;">HỆ THỐNG QUẢN TRỊ ẨN</h3>
                <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 20px; line-height:1.5;">Vui lòng nhập mật khẩu quản trị viên để truy cập bảng điều khiển chi tiết.</p>
                
                <form onsubmit="submitAdminSecretAuth(event)" style="margin:0;">
                    <div style="position:relative; margin-bottom:15px;">
                        <input type="password" id="ktdtlAdminPassInput" placeholder="Nhập mật khẩu quản trị..." required style="width:100%; padding:13px 45px 13px 16px; background:#050b1a; border:1.5px solid #1e3a8a; border-radius:8px; color:#fff; font-size:0.95rem; outline:none; box-sizing:border-box; transition:all 0.3s ease;">
                        <span onclick="toggleAdminPasswordVisibility()" style="position:absolute; right:15px; top:50%; transform:translateY(-50%); color:#c5a059; cursor:pointer; font-size:1rem;">
                            <i id="ktdtlPassEyeIcon" class="fa-solid fa-eye"></i>
                        </span>
                    </div>

                    <div id="ktdtlAdminErrorMsg" style="display:none; padding:10px; border-radius:6px; font-size:0.85rem; margin-bottom:15px; text-align:left;"></div>

                    <button type="submit" style="width:100%; padding:13px 20px; background:linear-gradient(135deg, #967439 0%, #c5a059 50%, #e5c07b 100%); color:#050b1a; border:none; border-radius:8px; font-weight:700; font-size:0.95rem; text-transform:uppercase; letter-spacing:0.05em; cursor:pointer; box-shadow:0 4px 15px rgba(197, 160, 89, 0.4); transition:all 0.3s ease;">
                        <i class="fa-solid fa-key"></i> Xác Thực & Đăng Nhập
                    </button>
                </form>
                
                <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#64748b;">
                    <span>Phím tắt: <code style="background:#050b1a; padding:2px 6px; border-radius:4px; border:1px solid #1e293b; color:#c5a059;">Ctrl + Shift + K</code></span>
                    <span style="color:#c5a059;">Kiến Trúc Đá Tâm Linh</span>
                </div>
            </div>
        </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = modalHtml;
        document.body.appendChild(div.firstElementChild);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeAdminSecretModal();
        });

        const modalEl = document.getElementById('ktdtlSecretAdminModal');
        if (modalEl) {
            modalEl.addEventListener('click', function(e) {
                if (e.target.id === 'ktdtlSecretAdminModal') closeAdminSecretModal();
            });
        }
    }
})();
