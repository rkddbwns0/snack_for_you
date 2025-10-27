# 🍫 Snack For You - Full Stack E-Commerce Platform

**Snack For You**는 프리미엄 과자 제품을 온라인으로 판매하는 전체 풀스택 이커머스 플랫폼입니다.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [프로젝트 구조](#프로젝트-구조)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [설치 및 실행](#설치-및-실행)
- [API 문서](#api-문서)
- [개발 가이드](#개발-가이드)

## 프로젝트 개요

Snack For You는 다음과 같은 특징을 가진 완전한 이커머스 플랫폼입니다:

### 🎯 프로젝트 목표
- ✨ 사용자 친화적이고 직관적인 쇼핑 경험 제공
- 🛒 안전하고 효율적인 주문 및 결제 시스템
- ⭐ 사용자 리뷰 및 평점을 통한 신뢰도 구축
- 📱 모든 디바이스에서 최적화된 반응형 디자인
- 🔐 보안이 강화된 사용자 인증 시스템

## 프로젝트 구조

```
snack_for_you/
├── snack_for_you_frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── component/
│   │   ├── context/
│   │   ├── css/
│   │   ├── pages/
│   │   ├── img/
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
│
├── snack_for_you_backend/
│   ├── src/
│   │   ├── address/
│   │   ├── admin_user/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── dashboard/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── favorites/
│   │   ├── order/
│   │   ├── review/
│   │   ├── snack/
│   │   ├── users/
│   │   └── main.ts
│   ├── dist/
│   ├── package.json
│   └── README.md
│
└── README.md
```

## 기술 스택

### 🎨 Frontend
- React 19.1.1
- TypeScript
- React Router DOM 7.9.1
- React Icons 5.5.0
- Swiper 12.0.1
- CSS3 (Flexbox & Grid)

### 🔧 Backend
- NestJS
- TypeScript
- TypeORM
- MySQL/MariaDB
- JWT
- bcryptjs

## 주요 기능

### 🛍️ 쇼핑 기능
- 카테고리별 상품 조회
- 상품 검색 및 필터링
- 장바구니 관리
- 주문 및 결제
- 배송지 관리

### 👤 사용자 기능
- 회원가입/로그인
- 프로필 관리
- 주문 이력 조회
- 즐겨찾기 (좋아요)
- 리뷰 작성

### ⭐ 리뷰 시스템
- 상품 리뷰 작성
- 1-5점 평가
- 평점 계산

### 📊 관리자 기능
- 상품 관리
- 주문 관리
- 대시보드

## 설치 및 실행

### 필수 요구사항
- Node.js v14 이상
- npm 또는 yarn
- MySQL/MariaDB
- Git

### 프론트엔드 설치

```bash
cd snack_for_you_frontend

npm install

npm start
```

프론트엔드: http://localhost:3000

### 백엔드 설치

```bash
cd snack_for_you_backend

npm install
```

**.env 파일 생성 및 설정:**

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=snack_for_you
JWT_SECRET=your_secret_key
JWT_EXPIRATION=3600
NODE_ENV=development
```

```bash
npm run start:dev
```

백엔드 API: http://localhost:3001/api

### 동시 실행

```bash
# 터미널 1: 프론트엔드
cd snack_for_you_frontend && npm start

# 터미널 2: 백엔드
cd snack_for_you_backend && npm run start:dev
```

## API 문서

### 기본 URL
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:3001/api

### 주요 엔드포인트

#### 인증 (Auth)
```
POST   /api/auth/signup          회원가입
POST   /api/auth/login           로그인
POST   /api/auth/logout          로그아웃
POST   /api/auth/refresh         토큰 갱신
```

#### 사용자 (Users)
```
GET    /api/users/:id            사용자 정보 조회
PUT    /api/users/:id            사용자 정보 수정
DELETE /api/users/:id            회원 탈퇴
PUT    /api/users/:id/nickname   닉네임 변경
```

#### 상품 (Snack)
```
GET    /api/snack                전체 상품 조회
GET    /api/snack/:id            상품 상세 조회
GET    /api/snack/category/:id   카테고리별 상품 조회
POST   /api/snack                상품 생성 (관리자)
PUT    /api/snack/:id            상품 수정 (관리자)
DELETE /api/snack/:id            상품 삭제 (관리자)
```

#### 장바구니 (Cart)
```
GET    /api/cart/:userId         장바구니 조회
POST   /api/cart                 상품 추가
PUT    /api/cart/:id             수량 수정
DELETE /api/cart/:id             상품 삭제
```

#### 주문 (Order)
```
GET    /api/order/:userId        주문 내역 조회
GET    /api/order/:orderId       주문 상세 조회
POST   /api/order                주문 생성
PUT    /api/order/:id            주문 상태 수정 (관리자)
```

#### 리뷰 (Review)
```
GET    /api/review/snack/:id     상품 리뷰 조회
GET    /api/review/user/:userId  사용자 리뷰 조회
POST   /api/review               리뷰 작성
PUT    /api/review/:id           리뷰 수정
DELETE /api/review/:id           리뷰 삭제
```

#### 좋아요 (Favorites)
```
GET    /api/favorites/:userId    즐겨찾기 목록 조회
POST   /api/favorites            즐겨찾기 추가/제거
GET    /api/favorites/count/:id  즐겨찾기 수 조회
```

#### 배송지 (Address)
```
GET    /api/address/:userId      배송지 목록 조회
POST   /api/address              배송지 추가
PUT    /api/address/:id          배송지 수정
DELETE /api/address/:id          배송지 삭제
PUT    /api/address/:id/basic    기본 배송지 설정
```

#### 대시보드 (Dashboard)
```
GET    /api/dashboard/summary    판매 요약 (관리자)
GET    /api/dashboard/sales      판매 통계 (관리자)
GET    /api/dashboard/orders     주문 통계 (관리자)
```

### 인증

보호된 엔드포인트는 다음 헤더 필요:

```
Authorization: Bearer <JWT_TOKEN>
```

## 개발 가이드

### 프론트엔드 개발

**폴더 구조**
- `api/`: API 통신 모듈 (기능별로 분리)
- `component/`: 재사용 가능한 컴포넌트
- `context/`: 전역 상태 관리 (Context API)
- `css/`: 스타일 파일 (기능별로 분리)
- `pages/`: 페이지 컴포넌트 (라우트별로 분리)

**코드 스타일**
- TypeScript 타입 정의 필수
- 함수형 컴포넌트 및 Hooks 사용
- Context API로 전역 상태 관리
- Props 타입 정의 필수

**스타일링**
- CSS3 커스텀 CSS 사용
- Flexbox & Grid 레이아웃
- 모바일 우선 반응형 디자인
- 시그니처 색상: `#f7a815`

### 백엔드 개발

**폴더 구조**
- 기능별 모듈 (Module)
- Controller: HTTP 요청 처리
- Service: 비즈니스 로직
- Entity: 데이터베이스 모델
- DTO: 데이터 전송 객체

**코드 스타일**
- TypeScript 타입 정의 필수
- Dependency Injection 활용
- 에러 핸들링 및 검증
- 레이어 구조 유지

**데이터베이스**
- TypeORM 사용
- Migration 활용
- 관계형 데이터베이스 설계

### 환경 변수

**백엔드 (.env)**
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=snack_for_you
JWT_SECRET=your_secret_key
JWT_EXPIRATION=3600
NODE_ENV=development
```

**프론트엔드 (.env)**
```
REACT_APP_API_URL=http://localhost:3001/api
```

## 디자인 시스템

### 색상 팔레트
- 주요 색상: `#f7a815` (주황색)
- 배경색: `#f0f2f5` (밝은 회색)
- 텍스트색: `#333` (진한 회색)
- 빨강: `#e74c3c` (경고/삭제)
- 초록: `#28a745` (성공)

### 레이아웃
- 최대 너비: 1400px
- 기본 패딩: 20px
- 기본 갭: 15-30px
- 모서리 반지름: 8-12px

### 반응형 브레이크포인트
- 모바일: < 768px
- 태블릿: 768px ~ 1024px
- 데스크톱: > 1024px

## 배포

### 프론트엔드 배포

```bash
cd snack_for_you_frontend
npm run build
```

build 폴더를 호스팅 서비스에 배포 (Vercel, Netlify 등)

### 백엔드 배포

```bash
cd snack_for_you_backend
npm run build
npm run start:prod
```

dist 폴더를 서버에 배포 (AWS, Heroku, DigitalOcean 등)

## 트러블슈팅

### 포트 충돌
- 프론트엔드 포트 변경: `PORT=3001 npm start`
- 백엔드 포트 변경: `.env`에서 `PORT=3002` 설정

### 데이터베이스 연결 오류
- MySQL/MariaDB 실행 확인
- `.env` 파일의 DB 설정 확인
- 데이터베이스 및 사용자 생성 확인

### CORS 에러
- 백엔드에서 CORS 설정 확인
- 프론트엔드의 API URL 확인

## 라이센스

MIT License © 2025

## 연락처

- 이메일: your.email@example.com
- GitHub: https://github.com/yourusername

---

**마지막 업데이트**: 2025년 10월  
**버전**: 1.0.0  
**프로젝트 상태**: 활성 개발 중 🚀
