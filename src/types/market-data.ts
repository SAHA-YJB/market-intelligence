import type { LucideIcon } from 'lucide-react';

export interface MarketData {
  buffettIndicator: number;
  vixIndex: number;
  usdKrw: number;
  dollarIndex: number;
  fearGreedIndex: number;
  // 필요에 따라 다른 지표 추가
}

export interface MarketIndicatorProps {
  title: string;
  // value: number; // 삭제: indicatorKey를 통해 store에서 조회
  indicatorKey: keyof MarketData; // 수정된 부분: MarketData의 키 중 하나
  unit: string;
  change: number; // 이 값도 나중에 스토어에서 관리될 수 있음
  description: string;
}

export interface MarketStatus {
  status: string;
  color: string;
  icon: LucideIcon;
}
