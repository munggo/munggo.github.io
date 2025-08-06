// 접속 차단 스크립트
(function() {
    // 리퍼러 확인
    var referrer = document.referrer.toLowerCase();
    
    // 차단할 도메인 목록
    var blockedDomains = [
        // 검색엔진
        'google.', 'bing.', 'yahoo.', 'baidu.', 'yandex.',
        'naver.', 'daum.', 'zum.', 'duckduckgo.', 
        // AI 서비스
        'openai.', 'chatgpt.', 'claude.', 'anthropic.', 
        'bard.', 'perplexity.', 'you.com', 'poe.com',
        'character.ai', 'jasper.ai', 'writesonic.',
        'copy.ai', 'rytr.', 'deepai.', 'huggingface.',
        // 소셜 미디어 및 기타
        'facebook.', 'twitter.', 't.co', 'instagram.',
        'linkedin.', 'reddit.', 'pinterest.'
    ];
    
    // User-Agent 확인 (봇/크롤러)
    var userAgent = navigator.userAgent.toLowerCase();
    var botPatterns = [
        'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
        'python', 'java', 'ruby', 'perl', 'php', 'node',
        'googlebot', 'bingbot', 'slurp', 'duckduckbot',
        'baiduspider', 'yandexbot', 'facebookexternalhit',
        'twitterbot', 'linkedinbot', 'whatsapp', 'telegram',
        'discord', 'slack', 'gptbot', 'claude-web', 'chatgpt'
    ];
    
    // 리퍼러 차단 확인
    var isBlockedReferrer = blockedDomains.some(function(domain) {
        return referrer.includes(domain);
    });
    
    // 봇/크롤러 확인
    var isBot = botPatterns.some(function(pattern) {
        return userAgent.includes(pattern);
    });
    
    // 직접 접속이 아닌 경우 차단
    var isDirect = referrer === '' || referrer === null;
    var isSameDomain = referrer.includes(window.location.hostname);
    
    // 차단 조건 확인
    if (isBlockedReferrer || isBot || (!isDirect && !isSameDomain)) {
        // 접속 차단 메시지
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: #000;
                color: #fff;
                font-family: 'Noto Sans KR', sans-serif;
                text-align: center;
            ">
                <div>
                    <h1 style="font-size: 48px; margin-bottom: 20px;">403</h1>
                    <p style="font-size: 18px;">접근이 차단되었습니다</p>
                    <p style="font-size: 14px; margin-top: 10px; opacity: 0.7;">Access Denied</p>
                </div>
            </div>
        `;
        
        // 뒤로가기 방지
        history.pushState(null, null, location.href);
        window.onpopstate = function() {
            history.go(1);
        };
        
        // 우클릭 방지
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // 개발자 도구 감지
        var devtools = {open: false, orientation: null};
        var threshold = 160;
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    document.body.innerHTML = '';
                    window.location.href = 'about:blank';
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }
    
    // 추가 보안: 특정 키 조합 비활성화
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
    });
    
    // 텍스트 선택 방지
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 드래그 방지
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
})();