
snack_for_you/
├── snack_for_you_frontend/ # React 프론트엔드
│ ├── public/
│ ├── src/
│ │ ├── api/ # API 통신 모듈
│ │ ├── component/ # 재사용 컴포넌트
│ │ ├── context/ # 전역 상태 관리
│ │ ├── css/ # 스타일 파일
│ │ ├── pages/ # 페이지 컴포넌트
│ │ ├── img/ # 이미지 자산
│ │ └── App.tsx
│ ├── package.json
│ └── README.md
│
├── snack_for_you_backend/ # NestJS 백엔드
│ ├── src/
│ │ ├── address/ # 배송지 관리 모듈
│ │ ├── auth/ # 인증 모듈
│ │ ├── cart/ # 장바구니 모듈
│ │ ├── dto/ # Data Transfer Objects
│ │ ├── entities/ # 데이터베이스 엔티티
│ │ ├── favorites/ # 좋아요 모듈
│ │ ├── order/ # 주문 모듈
│ │ ├── review/ # 리뷰 모듈
│ │ ├── snack/ # 상품 모듈
│ │ ├── users/ # 사용자 모듈
│ │ └── main.ts
│ ├── dist/
│ ├── package.json
│ └── README.md
│
└── README.md # 이 파일
백엔드 설치
동시 실행
API 문서
기본 URL
프론트엔드: http://localhost:3000
백엔드 API: http://localhost:3001/api
주요 엔드포인트
인증
POST /api/auth/signup - 회원가입
POST /api/auth/login - 로그인
상품
GET /api/snack - 상품 조회
GET /api/snack/:id - 상품 상세
장바구니
GET /api/cart/:userId - 장바구니 조회
POST /api/cart - 상품 추가
주문
GET /api/order/:userId - 주문 내역
POST /api/order - 주문 생성
리뷰
GET /api/review/snack/:snackId - 상품 리뷰
POST /api/review - 리뷰 작성
자세한 API 문서는 각 폴더의 README.md를 참고하세요.
개발 가이드
프론트엔드 개발
TypeScript 사용
함수형 컴포넌트 및 Hooks 활용
Context API로 전역 상태 관리
반응형 CSS 설계
백엔드 개발
NestJS 모듈 구조 활용
TypeORM을 통한 데이터베이스 관리
JWT 기반 인증
에러 핸들링 및 검증
코드 스타일
TypeScript 타입 정의 필수
ESLint 규칙 준수
Prettier 포맷팅 사용
배포
프론트엔드 배포
백엔드 배포
라이센스
MIT License © 2025
연락처
이메일: your.email@example.com
GitHub: https://github.com/yourusername
마지막 업데이트: 2025년 10월
버전: 1.0.0
