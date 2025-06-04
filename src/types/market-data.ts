export interface MarketData {
  buffettIndicator: number;
  vixIndex: number;
  usdKrw: number;
  dollarIndex: number;
  fearGreedIndex: number;
}

export interface MarketIndicatorProps {
  title: string;
  value: number;
  unit: string;
  change: number;
  description: string;
}

export interface MarketAnalysisProps {
  marketData: MarketData;
}
