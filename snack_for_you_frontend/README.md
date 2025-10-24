# 🍫 Snack For You - Frontend

**Snack For You**는 다양한 과자 제품을 온라인으로 구매할 수 있는 전자상거래 플랫폼입니다. 사용자 친화적인 인터페이스와 반응형 디자인으로 모든 기기에서 최적의 경험을 제공합니다.

## 📋 목차
- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [주요 페이지](#주요-페이지)
- [API 연동](#api-연동)
- [디자인 특징](#디자인-특징)
- [기여](#기여)

## 프로젝트 개요

Snack For You는 고급 과자 제품을 판매하는 이커머스 플랫폼입니다. 사용자는 다양한 카테고리의 과자를 탐색하고, 장바구니에 담아 구매할 수 있으며, 구매한 제품에 대해 리뷰를 작성할 수 있습니다.

### 주요 목표
- ✨ 직관적이고 우아한 사용자 인터페이스 제공
- 🛒 원활한 쇼핑 경험 제공
- 📱 모든 기기에서 최적화된 반응형 디자인
- ⭐ 사용자 리뷰 및 평점 시스템
- 🔐 안전한 사용자 인증 및 데이터 관리

## 주요 기능

### 🏪 쇼핑 기능
- **상품 조회**: 카테고리별 과자 제품 탐색
- **추천 과자**: 메인 페이지의 수평 스크롤 추천 섹션
- **상품 상세**: 제품 정보, 가격, 리뷰 및 평점 확인
- **장바구니**: 선택한 상품 추가 및 관리
- **주문 및 결제**: 배송지 선택 및 결제 방식 선택

### 👤 사용자 기능
- **회원가입 및 로그인**: 안전한 사용자 인증
- **마이페이지**: 사용자 정보 및 주문 내역 확인
- **배송지 관리**: 주소 추가, 수정, 기본 주소 설정
- **닉네임 변경**: 사용자 프로필 커스터마이징
- **좋아요**: 즐겨찾기 기능

### ⭐ 리뷰 및 평점
- **리뷰 작성**: 구매 완료 후 상품 리뷰 작성
- **별점 시스템**: 1~5점 평가
- **리뷰 목록**: 작성한 리뷰 조회
- **상품 평점**: 전체 사용자의 평점 확인

### 📦 주문 관리
- **주문 내역**: 모든 주문 이력 조회
- **주문 상세**: 상세 주문 정보 및 배송 상태 확인
- **결제 방식**: Toss Pay, Kakao Pay, Naver Pay 지원

## 기술 스택

### 프론트엔드
- **React** (v19.1.1): UI 라이브러리
- **TypeScript**: 타입 안정성
- **React Router DOM** (v7.9.1): 클라이언트 라우팅
- **React Icons** (v5.5.0): 아이콘 라이브러리

### 상태 관리 및 라우팅
- **Context API**: 전역 상태 관리 (사용자 인증)
- **Protected Routes**: 인증된 사용자만 접근 가능한 경로

### 플러그인 및 라이브러리
- **Swiper** (v12.0.1): 반응형 슬라이더
- **React Daum Postcode** (v3.2.0): 주소 검색 API
- **js-cookie** (v3.0.5): 쿠키 관리

### 스타일링
- **CSS3**: 커스텀 CSS
- **Flexbox & Grid**: 레이아웃 구성
- **반응형 디자인**: 미디어 쿼리를 통한 모바일 최적화

## 설치 및 실행

### 필수 요구사항
- Node.js (v14 이상)
- npm 또는 yarn

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/yourusername/snack_for_you_frontend.git
cd snack_for_you_frontend
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
필요한 API 엔드포인트를 설정합니다 (src/api 폴더 참고)

4. **개발 서버 실행**
```bash
npm start
```
브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

5. **빌드**
```bash
npm run build
```

## 프로젝트 구조

```
snack_for_you_frontend/
├── public/                 # 정적 파일
├── src/
│   ├── api/               # API 통신 모듈
│   │   ├── snack.api.tsx
│   │   ├── cart.api.tsx
│   │   ├── order.api.tsx
│   │   ├── review.api.tsx
│   │   ├── favorite.api.tsx
│   │   └── address.api.tsx
│   ├── component/         # 재사용 가능한 컴포넌트
│   │   ├── app-header.tsx
│   │   ├── app-footer.tsx
│   │   ├── menu-bar.tsx
│   │   ├── main-swiper.tsx
│   │   ├── address_modal.tsx
│   │   └── address_input.tsx
│   ├── context/           # 전역 상태 관리
│   │   ├── context.tsx
│   │   └── protectedRoute.tsx
│   ├── css/               # 스타일 파일
│   │   ├── common.css     # 공통 스타일
│   │   ├── main.css
│   │   ├── snack_list.css
│   │   ├── snack_detail.css
│   │   ├── auth.css
│   │   └── ...
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── main.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── snack_list.tsx
│   │   ├── snack_detail.tsx
│   │   ├── cart.tsx
│   │   ├── order.tsx
│   │   ├── receipt.tsx
│   │   ├── myPage.tsx
│   │   ├── favorite.tsx
│   │   ├── review.tsx
│   │   ├── review_list.tsx
│   │   └── ...
│   ├── img/               # 이미지 자산
│   ├── App.tsx            # 메인 앱 컴포넌트
│   └── index.tsx
├── package.json
└── README.md
```

## 주요 페이지

### 🏠 메인 페이지 (Main)
- 추천 과자 섹션 (가로 스크롤)
- 최신 상품 표시
- 메뉴 네비게이션

### 🔐 인증 페이지
- **로그인**: 기존 사용자 로그인
- **회원가입**: 새 사용자 계정 생성
- 이메일 중복 확인

### 🍫 상품 페이지
- **상품 목록**: 카테고리별 3열 그리드 레이아웃
- **상품 상세**: 상품 정보, 이미지, 가격, 리뷰, 평점
- 수량 조절 및 장바구니 추가
- 좋아요 기능

### 🛒 장바구니 (Cart)
- 선택한 상품 관리
- 수량 증감
- 상품 삭제
- 주문 버튼

### 📦 주문 및 결제 (Order)
- 배송지 선택/변경
- 주문 상품 확인
- 결제 방식 선택
- 총 결제 금액 표시

### 🧾 영수증 (Receipt)
- 주문 정보 확인
- 배송 정보
- 구매 상품 목록
- 리뷰 작성 버튼

### ⭐ 리뷰 (Review)
- 상품 이미지 및 정보 표시
- 별점 선택 (1-5점)
- 리뷰 내용 작성
- 리뷰 제출

### 📝 리뷰 목록 (ReviewList)
- 작성한 모든 리뷰 조회
- 평점 및 작성일 표시
- 클릭 시 상품 상세 페이지로 이동

### 👤 마이페이지 (MyPage)
- 사용자 정보 표시
- 메뉴 네비게이션
  - 주문내역
  - 배송지 관리
  - 닉네임 변경
  - 로그아웃

### 📍 배송지 관리 (AddressInfo)
- 저장된 배송지 목록
- 배송지 추가
- 배송지 삭제
- 기본 배송지 설정

## API 연동

### Snack API
- GET `/api/snack` - 전체 상품 조회
- GET `/api/snack/category/:id` - 카테고리별 상품 조회
- GET `/api/snack/:id` - 상품 상세 조회

### Cart API
- GET `/api/cart/:userId` - 장바구니 조회
- POST `/api/cart` - 상품 추가
- PUT `/api/cart/:id` - 수량 수정
- DELETE `/api/cart/:id` - 상품 삭제

### Order API
- GET `/api/order/:userId` - 주문 내역 조회
- GET `/api/order/detail/:orderId` - 주문 상세 조회
- POST `/api/order` - 주문 생성

### Review API
- GET `/api/review/snack/:snackId` - 상품 리뷰 조회
- GET `/api/review/user/:userId` - 사용자 리뷰 조회
- POST `/api/review` - 리뷰 작성

### Favorite API
- GET `/api/favorite/:userId` - 좋아요 목록 조회
- POST `/api/favorite/:userId/:snackId` - 좋아요 추가/제거

### Address API
- GET `/api/address/:userId` - 배송지 목록 조회
- POST `/api/address` - 배송지 추가
- DELETE `/api/address/:addressId` - 배송지 삭제
- PUT `/api/address/:addressId` - 기본 배송지 설정

## 디자인 특징

### 🎨 색상 팔레트
- **주요 색상**: `#f7a815` (시그니처 주황색)
- **배경색**: `#f0f2f5` (밝은 회색)
- **텍스트색**: `#333` (진한 회색)
- **보조색**: `#e74c3c` (빨강), `#28a745` (초록)

### 📐 레이아웃
- **최대 너비**: 1400px (대화면 최적화)
- **패딩**: 일관된 20px 여백
- **간격**: 일관된 15-30px 갭

### 🎯 반응형 디자인
- **모바일** (<768px): 1열 레이아웃
- **태블릿** (768px~1024px): 2열 레이아웃
- **데스크톱** (>1024px): 3열 레이아웃

### ✨ 인터랙션
- **호버 효과**: 아이템 이동 및 색상 변화
- **애니메이션**: 부드러운 트랜지션 (0.2s)
- **피드백**: 버튼 상태 변화 시각화

### 🎨 컴포넌트 스타일
- **카드**: 둥근 모서리, 그림자 효과
- **버튼**: 충분한 패딩, 명확한 색상
- **입력필드**: 포커스 상태 강조
- **아이콘**: React Icons 사용

## 기여

이 프로젝트에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다.

## 연락처

- **개발자**: Your Name
- **이메일**: your.email@example.com
- **GitHub**: https://github.com/yourusername

---

**마지막 업데이트**: 2025년 10월
**버전**: 1.0.0
