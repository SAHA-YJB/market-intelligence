'use client';

import { Badge } from '@/components/ui/badge';
import { useMarketStore } from '@/store/market-store';
import { MarketData, MarketStatus } from '@/types/market-data';
import {
  AlertTriangle,
  ArrowUpNarrowWide,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  ChartNoAxesCombined,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const getMarketStatus = (marketData: MarketData): MarketStatus => {
  const { buffettIndicator, vixIndex, fearGreedIndex, dollarIndex } =
    marketData;

  if (vixIndex >= 30 && vixIndex <= 50 && fearGreedIndex < 45) {
    return {
      status: 'extreme-fear-oversold',
      color: 'text-red-500',
      icon: AlertTriangle,
    };
  }

  if (vixIndex >= 15 && vixIndex <= 20 && buffettIndicator > 128) {
    return {
      status: 'extreme-greed-overbought',
      color: 'text-orange-500',
      icon: AlertTriangle,
    };
  }

  if (buffettIndicator >= 151) {
    if (fearGreedIndex > 75) {
      return {
        status: 'bubble-risk',
        color: 'text-red-600',
        icon: AlertTriangle,
      };
    }
    return {
      status: 'significantly-overvalued',
      color: 'text-red-500',
      icon: TrendingDown,
    };
  } else if (buffettIndicator >= 128) {
    if (dollarIndex >= 1300 && dollarIndex <= 1500) {
      return {
        status: 'overvalued-dollar-high',
        color: 'text-orange-500',
        icon: TrendingDown,
      };
    }
    return {
      status: 'slightly-overvalued',
      color: 'text-orange-400',
      icon: TrendingDown,
    };
  } else if (buffettIndicator >= 105) {
    if (dollarIndex >= 900 && dollarIndex <= 1100 && fearGreedIndex < 45) {
      return {
        status: 'fair-value-dollar-low-fear',
        color: 'text-yellow-400',
        icon: HelpCircle,
      };
    }
    return { status: 'fair-value', color: 'text-gray-400', icon: HelpCircle };
  } else if (buffettIndicator >= 81) {
    if (fearGreedIndex < 25) {
      return {
        status: 'undervalued-extreme-fear',
        color: 'text-green-400',
        icon: ArrowUpNarrowWide,
      };
    }
    return {
      status: 'slightly-undervalued',
      color: 'text-green-500',
      icon: TrendingUp,
    };
  } else {
    if (fearGreedIndex < 25) {
      return {
        status: 'significantly-undervalued-extreme-fear',
        color: 'text-green-600',
        icon: TrendingUp,
      };
    }
    return {
      status: 'significantly-undervalued',
      color: 'text-green-500',
      icon: TrendingUp,
    };
  }
};

export default function Header() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const marketData = useMarketStore((state) => state.marketData);
  const marketStatus = getMarketStatus(marketData);

  useEffect(() => {
    const fetchTime = () => setLastUpdated(new Date());
    fetchTime();
    const interval = setInterval(fetchTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const { status, color } = marketStatus;

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'extreme-fear-oversold':
        return '과매도/폭락주의';
      case 'extreme-greed-overbought':
        return '과매수/버블주의';
      case 'bubble-risk':
        return '버블 위험';
      case 'significantly-overvalued':
        return '상당히 고평가';
      case 'overvalued-dollar-high':
        return '고평가/달러강세';
      case 'slightly-overvalued':
        return '약간 고평가';
      case 'fair-value-dollar-low-fear':
        return '적정가/달러약세주의';
      case 'fair-value':
        return '적정 가격';
      case 'undervalued-extreme-fear':
        return '저평가/극도공포';
      case 'slightly-undervalued':
        return '약간 저평가';
      case 'significantly-undervalued-extreme-fear':
        return '초저평가/극도공포';
      case 'significantly-undervalued':
        return '상당히 저평가';
      default:
        return '중립';
    }
  };

  return (
    <header className='border-b border-slate-700 bg-slate-800/50 backdrop-blur sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <ChartNoAxesCombined className='h-8 w-8 text-white md:hidden' />
            <div className='hidden md:block'>
              <h1 className='text-2xl font-bold text-white'>
                Smart Market View
              </h1>
              <p className='text-slate-400 text-sm'>
                실시간 주식시장 분석 대시보드
              </p>
            </div>
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
              <marketStatus.icon className={`w-5 h-5 ${color}`} />
              <span className={`text-sm font-medium ${color} hidden md:inline`}>
                {getStatusText(status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
