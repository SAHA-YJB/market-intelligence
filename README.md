# 1. 프로젝트 개요

- 프로젝트명: Smart Market View (market-intelligence)
- 목적: 실시간 시장 지표를 대시보드 형태로 시각화·분석하여 투자 의사결정에 참고할 수 있는 웹 애플리케이션

# 2. 주요 기능

1. **실시간 지표 모니터링**
   - 버핏 지수(Buffett Indicator), VIX 지수, 원/달러 환율, 달러 지수, 공포·탐욕 지수 등
   - 1분 단위로 자동 갱신 (useEffect + setInterval)
2. **지표별 카드(Indicator) UI**
   - `MarketIndicator` 컴포넌트에서 값, 변동폭, 아이콘 표시
   - 호버 시 강조 효과
3. **추세 차트(Chart Section)**
   - 최근 6개월 간 주요 지표 추이 그래프
   - 반응형 컨테이너
4. **시장 종합 분석**
   - `MarketAnalysis`에서 지표별 시그널(위험·긍정·중립) 도출
   - 전체 시장 심리(강세/약세/중립) 및 투자 추천 문구 제공
   - 면책 조항 표시
5. **레이아웃 및 글로벌 스타일**
   - App Router(`src/app/layout.tsx`) + 글로벌 CSS(`globals.css`)
   - TailwindCSS + shadcn UI
6. **추가 예정 기능 (확장 아이디어)**
   - Supabase 연동: 사용자 로그인/프로필, 관심 지표 저장
   - Zustand 도입: 전역 상태 관리(테마, 사용자 설정)
   - Next.js API Route: 실제 시장 데이터 페칭
   - 알림 시스템: 지표 임계치 도달 시 푸시 알림

# 3. 기술 스택

- 프레임워크: Next.js 15 (App Router)
- 언어: TypeScript (interface 사용)
- 스타일: TailwindCSS, TW-Animate, shadcn UI, Radix-ui Slot
- 차트: Recharts
- 아이콘: Lucide-react
- 상태 관리: Zustand
- 백엔드: Supabase, Next.js API Routes

# 4. 아키텍처 & 데이터 흐름

1. **클라이언트(CSR)**
   - 실시간 갱신이 필요한 컴포넌트만 `"use client"` 선언
   - `useEffect` → Fetch API (추후 Supabase/REST) → 상태 업데이트
2. **서버(RSC)**
   - 전역 레이아웃, 정적 CSS/글로벌 설정
   - 빌드 시 미리 렌더링 가능한 부분은 RSC로 처리
3. **컴포넌트 분리**
   - 재사용 가능한 UI 컴포넌트(`ui/card.tsx`, `ui/badge.tsx`)
   - 도메인 로직 컴포넌트(`ChartSection`, `MarketIndicator`, `MarketAnalysis`)

# 5. 데이터 및 API 설계

- **MarketData**
  - buffettIndicator, vixIndex, usdKrw, dollarIndex, fearGreedIndex (모두 `number`)
- **API Endpoint** (추후 구현)
  - GET /api/market-data → 최신 시장 지표 반환
  - GET /api/market-history?months=6 → 차트용 과거 데이터 반환
- **Supabase** (추후)
  - 사용자 테이블(users), 관심 지표(user_metrics)

# 6. 보안 및 성능 고려사항

- API 요청 속도 제한 및 오류 처리(Guard Clause)
- 데이터 검증(Zod 등)
- React Server Components로 불필요한 JS 번들링 최소화
- Tailwind `twMerge` + `clsx` 로 CSS 중복 제거
- 이미지 최적화(WebP, lazy loading)

# 7. 향후 확장

## //
