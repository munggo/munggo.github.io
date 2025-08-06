# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

GitHub Pages에 호스팅된 Munkyo Seo의 개인 포트폴리오/이력서 웹사이트입니다. 정적 HTML, CSS, JavaScript로 구축되었으며, 경력, 기술, 프로젝트 정보가 포함된 한국어 이력서를 제공합니다.

## 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (바닐라)
- **라이브러리**: 
  - GSAP (3.12.1) with ScrollTrigger - 애니메이션 효과
  - Font Awesome - 아이콘
  - Noto Sans KR - 한글 폰트
- **호스팅**: GitHub Pages (munggo.github.io)

## 파일 구조

3개의 주요 HTML 페이지로 구성:
- `index.html` - 전체 애니메이션이 포함된 메인 이력서 페이지
- `new.html` - 이력서 대체 버전 (프로필 호버 효과 제외)
- `mic.html` - 마이크 테스트 유틸리티 페이지

## 주요 기능

- GSAP를 사용한 스크롤 트리거 애니메이션
- 프로필 이미지 호버 시 2배 확대 효과
- viewport 메타 태그를 통한 반응형 디자인
- 커스텀 파비콘 및 웹폰트
- 한국어 컨텐츠

## 개발 참고사항

애니메이션 또는 인터랙티브 요소 수정 시:
- GSAP 애니메이션은 각 HTML 파일 하단에서 초기화됨
- ScrollTrigger 애니메이션은 요소가 뷰포트 높이의 90% 지점에 도달할 때 트리거됨
- 프로필 호버 애니메이션은 GSAP 트랜지션과 함께 mouseenter/mouseleave 이벤트 사용

## 작성 규칙

- 모든 출력과 문서는 한국어로 작성
- 문서나 커밋 메시지에 AI 도구 사용 표시 금지