import { create } from 'zustand';
import { MarketData } from '@/types/market-data';

interface MarketState {
  marketData: MarketData;
  // API 호출 시뮬레이션을 위해 setMarketData 유지
  setMarketData: (data: MarketData) => void;
  // 개별 지표 업데이트 함수 (선택적)
  // updateBuffettIndicator: (value: number) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  marketData: {
    buffettIndicator: 185.2, // 초기값
    vixIndex: 18.4,
    usdKrw: 1340.5,
    dollarIndex: 104.2,
    fearGreedIndex: 42,
  },
  // API를 통해 전체 marketData를 업데이트한다고 가정
  setMarketData: (data) => set({ marketData: data }),
  // 예시: 개별 지표 업데이트 함수 구현
  // updateBuffettIndicator: (value) => set((state) => ({ marketData: { ...state.marketData, buffettIndicator: value }})),
}));
