// 접속 차단 스크립트
(function() {
    // 비밀번호 확인
    var PASSWORD = '080218';
    var STORAGE_KEY = 'site_auth_' + btoa(window.location.hostname);
    
    // 세션 스토리지에서 인증 상태 확인
    var isAuthenticated = sessionStorage.getItem(STORAGE_KEY) === btoa(PASSWORD);
    
    // 비밀번호 입력 화면 표시
    function showPasswordPrompt() {
        document.body.innerHTML = `
            <div id="password-container" style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: 'Noto Sans KR', sans-serif;
            ">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                ">
                    <h2 style="margin-bottom: 30px; color: #333;">비밀번호를 입력하세요</h2>
                    <input type="password" id="password-input" style="
                        width: 100%;
                        padding: 12px;
                        font-size: 16px;
                        border: 2px solid #ddd;
                        border-radius: 5px;
                        box-sizing: border-box;
                        margin-bottom: 20px;
                    " placeholder="비밀번호" autofocus>
                    <button id="submit-btn" style="
                        width: 100%;
                        padding: 12px;
                        font-size: 16px;
                        background: #667eea;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background 0.3s;
                    " onmouseover="this.style.background='#5a67d8'" onmouseout="this.style.background='#667eea'">
                        확인
                    </button>
                    <div id="error-msg" style="
                        color: #e53e3e;
                        margin-top: 15px;
                        display: none;
                        font-size: 14px;
                    ">비밀번호가 틀렸습니다</div>
                </div>
            </div>
        `;
        
        // 엔터키 처리
        document.getElementById('password-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        
        // 버튼 클릭 처리
        document.getElementById('submit-btn').addEventListener('click', checkPassword);
    }
    
    // 비밀번호 확인
    function checkPassword() {
        var input = document.getElementById('password-input').value;
        if (input === PASSWORD) {
            sessionStorage.setItem(STORAGE_KEY, btoa(PASSWORD));
            location.reload();
        } else {
            document.getElementById('error-msg').style.display = 'block';
            document.getElementById('password-input').value = '';
            document.getElementById('password-input').focus();
            
            // 3초 후 에러 메시지 숨기기
            setTimeout(function() {
                var errorMsg = document.getElementById('error-msg');
                if (errorMsg) errorMsg.style.display = 'none';
            }, 3000);
        }
    }
    
    // 인증되지 않은 경우 비밀번호 입력 화면 표시
    if (!isAuthenticated) {
        // DOM 로드 완료 후 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showPasswordPrompt);
        } else {
            showPasswordPrompt();
        }
        return; // 나머지 보안 체크 건너뛰기
    }
    
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