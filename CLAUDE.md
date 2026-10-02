# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

GitHub Pages에 호스팅된 서문교(Munkyo Seo)의 이력서 웹사이트입니다. 사용자가 "이력서"라고 하면 이 사이트의 `index.html`을 뜻합니다. 정적 HTML 한 파일에 CSS와 바닐라 JavaScript가 모두 들어 있으며, 빌드 과정은 없습니다.

## 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (바닐라, 외부 JS 라이브러리 없음)
- **폰트**: Google Fonts — Noto Sans KR, Inter
- **호스팅**: GitHub Pages (munggo.github.io), `master` 브랜치에 푸시하면 1~2분 뒤 반영

## 파일 구조

- `index.html` - 이력서 페이지 (유일한 실제 페이지)
- `imgs/` - 프로필 사진(`202306.jpg`), 파비콘
- `backup/` - 리뉴얼 이전 페이지(`index.html.old`, `new.html.old`, `mic.html.old`), 사용하지 않음
- `data/` - 이전 `mic.html`용 음원, 사용하지 않음
- `robots.txt`, `.htaccess` - 봇 접근 설정 (`.htaccess`는 GitHub Pages에서 적용되지 않음)

## 주요 기능

- **다국어(KO/EN)**: 한국어는 HTML 본문에, 영어는 하단 `<script>`의 `i18n.en` 사전에 있습니다. 요소의 `data-i18n` 키로 짝을 맞춥니다. 저장값(`localStorage.lang`)이 없으면 브라우저 언어가 한국어가 아닐 때 영어로 시작합니다.
- **다크모드**: `localStorage.theme` 저장값, 없으면 `prefers-color-scheme`을 따릅니다. `<html>`에 `dark` 클래스를 붙입니다.
- **인쇄**: `@media print` 스타일이 있고, `.no-print` 요소(테마·언어 버튼)는 인쇄되지 않습니다. PDF 이력서는 브라우저 인쇄로 만듭니다.
- **반응형**: `max-width: 640px` 미디어 쿼리 하나로 모바일을 처리합니다.

## 이력서 갱신 절차

1. 한국어 문구는 HTML 본문에서, 영어 문구는 `i18n.en` 사전에서 함께 고칩니다. 항목을 추가할 때는 새 `data-i18n` 키를 만들고 양쪽에 모두 넣습니다. 키 번호는 화면 순서와 달라도 됩니다(예: `c1_p8`이 `c1_p1` 바로 아래).
2. 푸터의 `Last updated <Month YYYY>`와 `©` 연도를 갱신합니다.
3. 검증합니다.
   - HTML의 `data-i18n` 키 집합과 `i18n.en` 키 집합이 같은지 확인합니다.
   - `<script>` 내용을 따로 저장해 `node --check`로 문법을 검사합니다.
   - 헤드리스 Chrome으로 렌더링을 확인합니다. 헤드리스 Chrome은 브라우저 언어가 영어라서 페이지가 영어로 뜨므로, 확인용 사본에서 `setLang('ko')` / `setLang('en')`을 직접 호출합니다. 화면 폭은 500px보다 좁게 줄어들지 않습니다.
4. 이력서의 수치(장소 수, 언어 수, 출시 상태 등)는 각 프로젝트 저장소의 실제 데이터로 확인한 값만 씁니다.

## 작성 규칙

- 모든 출력과 문서는 한국어로 작성
- 문서나 커밋 메시지에 AI 도구 사용 표시 금지
