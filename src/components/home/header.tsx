'use client';

import { Badge } from '@/components/ui/badge';
import { MarketData, MarketStatus } from '@/types/market-data';
import { useState, useEffect } from 'react';
import { useMarketStore } from '@/store/market-store';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

const getMarketStatusFromDataForHeader = (
  marketData: MarketData
): MarketStatus => {
  const { buffettIndicator } = marketData;
  if (buffettIndicator <= 81) {
    return {
      status: 'significantly-undervalued',
      color: 'bg-green-500',
      icon: TrendingUp,
    };
  } else if (buffettIndicator <= 105) {
    return {
      status: 'slightly-undervalued',
      color: 'bg-green-300',
      icon: TrendingUp,
    };
  } else if (buffettIndicator <= 128) {
    return { status: 'fair-value', color: 'bg-gray-500', icon: TrendingDown };
  } else if (buffettIndicator <= 151) {
    return {
      status: 'slightly-overvalued',
      color: 'bg-orange-500',
      icon: TrendingDown,
    };
  } else {
    return {
      status: 'significantly-overvalued',
      color: 'bg-red-500',
      icon: AlertTriangle,
    };
  }
};

export default function Header() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const marketData = useMarketStore((state) => state.marketData);
  const marketStatus = getMarketStatusFromDataForHeader(marketData);

  useEffect(() => {
    const fetchTime = () => setLastUpdated(new Date());
    fetchTime();
    const interval = setInterval(fetchTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const { status, color } = marketStatus;

  return (
    <header className='border-b border-slate-700 bg-slate-800/50 backdrop-blur'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-white'>Smart Market View</h1>
            <p className='text-slate-400 text-sm'>
              실시간 주식시장 분석 대시보드
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <Badge
              variant='outline'
              className='text-slate-300 border-slate-600'
              suppressHydrationWarning={true}
            >
              마지막 업데이트: {lastUpdated.toLocaleTimeString('ko-KR')}
            </Badge>
            <div className='flex items-center gap-2'>
              <div className={`w-3 h-3 rounded-full ${color}`}></div>
              <span className='text-sm font-medium'>
                {status === 'significantly-undervalued' && '상당히 저평가'}
                {status === 'slightly-undervalued' && '약간 저평가'}
                {status === 'fair-value' && '적정 가격'}
                {status === 'slightly-overvalued' && '약간 과대평가'}
                {status === 'significantly-overvalued' && '상당히 고평가'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
