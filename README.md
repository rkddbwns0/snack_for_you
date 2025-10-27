
# 🍫 Snack For You - Full Stack E-Commerce Platform

**Snack For You**는 프리미엄 과자 제품을 온라인으로 판매하는 전체 풀스택 이커머스 플랫폼입니다. 현대적이고 반응형인 프론트엔드와 견고한 백엔드 서버로 구성되어 있습니다.

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

### 📊 프로젝트 규모
- **프론트엔드**: React + TypeScript 기반 SPA
- **백엔드**: NestJS + TypeScript 기반 REST API
- **데이터베이스**: MySQL/MariaDB
- **인증**: JWT 기반 토큰 인증

## 프로젝트 구조
```snack_for_you/
├── snack_for_you_frontend/        # React 프론트엔드
│   ├── public/
│   ├── src/
│   │   ├── api/                   # API 통신 모듈
│   │   ├── component/             # 재사용 가능한 컴포넌트
│   │   ├── context/               # 전역 상태 관리
│   │   ├── css/                   # 스타일 파일
│   │   ├── pages/                 # 페이지 컴포넌트
│   │   ├── img/                   # 이미지 리소스
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
├── snack_for_you_backend/         # NestJS 백엔드
│   ├── src/
│   │   ├── address/               # 배송지 관리 모듈
│   │   ├── auth/                  # 인증 모듈
│   │   ├── cart/                  # 장바구니 모듈
│   │   ├── dto/                   # 데이터 전송 객체 (DTO)
│   │   ├── entities/              # 데이터베이스 엔티티
│   │   ├── favorites/             # 좋아요 모듈
│   │   ├── order/                 # 주문 모듈
│   │   ├── review/                # 리뷰 모듈
│   │   ├── snack/                 # 상품 모듈
│   │   ├── users/                 # 사용자 모듈
│   │   └── main.ts
│   ├── dist/
│   ├── package.json
│   └── README.md
└── README.md
```


## 기술 스택

### 🎨 Frontend
- **React** 19.1.1
- **TypeScript**
- **React Router DOM** 7.9.1
- **React Icons** 5.5.0
- **CSS3** (Flexbox & Grid)

### 🔧 Backend
- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **JWT**
- **bcryptjs**

## 주요 기능

### 🛍️ 쇼핑 기능
- ✅ 카테고리별 상품 조회
- ✅ 상품 검색 및 필터링
- ✅ 장바구니 관리
- ✅ 주문 및 결제
- ✅ 배송지 관리

### 👤 사용자 기능
- ✅ 회원가입/로그인
- ✅ 프로필 관리
- ✅ 주문 이력 조회
- ✅ 즐겨찾기 (좋아요)
- ✅ 리뷰 작성

### ⭐ 리뷰 시스템
- ✅ 상품 리뷰 작성
- ✅ 1-5점 평가
- ✅ 평점 계산

## 설치 및 실행

### 프론트엔드 설치

```bash
cd snack_for_you_frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build
```

### 백엔드 설치

```bash
cd snack_for_you_backend

# 의존성 설치
npm install

# 환경 변수 설정 (.env)
# DB_HOST=localhost
# DB_PORT=3306
# DB_USERNAME=root
# DB_PASSWORD=password
# DB_NAME=snack_for_you

# 개발 서버 실행
npm run start:dev

# 프로덕션 빌드 및 실행
npm run build
npm run start:prod
```

### 동시 실행

```bash
# 터미널 1: 프론트엔드
cd snack_for_you_frontend && npm start

# 터미널 2: 백엔드
cd snack_for_you_backend && npm run start:dev
```

## API 문서

### 기본 URL
- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:3001/api

### 주요 엔드포인트

#### 인증
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인

#### 상품
- `GET /api/snack` - 상품 조회
- `GET /api/snack/:id` - 상품 상세

#### 장바구니
- `GET /api/cart/:userId` - 장바구니 조회
- `POST /api/cart` - 상품 추가

#### 주문
- `GET /api/order/:userId` - 주문 내역
- `POST /api/order` - 주문 생성

#### 리뷰
- `GET /api/review/snack/:snackId` - 상품 리뷰
- `POST /api/review` - 리뷰 작성

자세한 API 문서는 각 폴더의 README.md를 참고하세요.

## 개발 가이드

### 프론트엔드 개발
- TypeScript 사용
- 함수형 컴포넌트 및 Hooks 활용
- Context API로 전역 상태 관리
- 반응형 CSS 설계

### 백엔드 개발
- NestJS 모듈 구조 활용
- TypeORM을 통한 데이터베이스 관리
- JWT 기반 인증
- 에러 핸들링 및 검증
