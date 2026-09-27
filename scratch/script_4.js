

        let _hdrElem = null, _scTopBtn = null, _scrollTick = false;
        function updateHeaderScrollState() {
            if (!_hdrElem) _hdrElem = document.getElementById('mainHeader');
            if (!_scTopBtn) _scTopBtn = document.getElementById('scrollTopBtn');
            const y = window.scrollY || window.pageYOffset || 0;
            if (_hdrElem) {
                if (y > 20) _hdrElem.classList.add('scrolled');
                else _hdrElem.classList.remove('scrolled');
            }
            if (_scTopBtn) {
                _scTopBtn.style.display = (y > 300) ? 'flex' : 'none';
            }
            _scrollTick = false;
        }
        function handleHeaderScroll() {
            if (!_scrollTick) {
                window.requestAnimationFrame(updateHeaderScrollState);
                _scrollTick = true;
            }
        }
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        window.addEventListener('DOMContentLoaded', updateHeaderScrollState);

    