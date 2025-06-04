'use client';

import ChartSection from '@/components/chart-section';
import MarketAnalysis from '@/components/market-analysis';
import MarketIndicator from '@/components/market-indicator';
import { Badge } from '@/components/ui/badge';
import { MarketData } from '@/types/market-data';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [marketData, setMarketData] = useState<MarketData>({
    buffettIndicator: 185.2,
    vixIndex: 18.4,
    usdKrw: 1340.5,
    dollarIndex: 104.2,
    fearGreedIndex: 42,
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // 실제 API 호출을 시뮬레이션
    const fetchMarketData = () => {
      // 여기에 실제 API 호출 로직이 들어갑니다
      setLastUpdated(new Date());
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const getMarketStatus = () => {
    const { buffettIndicator, vixIndex, fearGreedIndex } = marketData;

    if (buffettIndicator > 200 && fearGreedIndex > 75) {
      return { status: 'bubble', color: 'bg-orange-500', icon: AlertTriangle };
    } else if (buffettIndicator < 100 && fearGreedIndex < 25) {
      return { status: 'bear', color: 'bg-red-500', icon: TrendingDown };
    } else {
      return { status: 'bull', color: 'bg-green-500', icon: TrendingUp };
    }
  };

  const marketStatus = getMarketStatus();

  return (
    <div className='min-h-screen bg-slate-900 text-white'>
      {/* Header */}
      <header className='border-b border-slate-700 bg-slate-800/50 backdrop-blur'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-white'>
                Smart Market View
              </h1>
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
                <div
                  className={`w-3 h-3 rounded-full ${marketStatus.color}`}
                ></div>
                <span className='text-sm font-medium'>
                  {marketStatus.status === 'bull' && '상승장'}
                  {marketStatus.status === 'bear' && '하락장'}
                  {marketStatus.status === 'bubble' && '버블 위험'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6'>
        {/* Market Indicators Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
          <MarketIndicator
            title='버핏 지수'
            value={marketData.buffettIndicator}
            unit='%'
            change={2.3}
            description='시총/GDP 비율'
          />
          <MarketIndicator
            title='VIX 지수'
            value={marketData.vixIndex}
            unit=''
            change={-1.2}
            description='변동성 지수'
          />
          <MarketIndicator
            title='원달러 환율'
            value={marketData.usdKrw}
            unit='₩'
            change={0.8}
            description='USD/KRW'
          />
          <MarketIndicator
            title='달러 지수'
            value={marketData.dollarIndex}
            unit=''
            change={-0.5}
            description='DXY'
          />
          <MarketIndicator
            title='공포 탐욕 지수'
            value={marketData.fearGreedIndex}
            unit=''
            change={5.2}
            description='Fear & Greed'
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <ChartSection />
          <MarketAnalysis marketData={marketData} />
        </div>
      </main>
    </div>
  );
}
