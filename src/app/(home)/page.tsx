import ChartSection from '@/components/chart-section';
import Header from '@/components/home/header';
import MarketAnalysis from '@/components/market-analysis';
import MarketIndicator from '@/components/market-indicator';

export default function Home() {
  return (
    <div className='min-h-screen bg-slate-900 text-white'>
      <Header />

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6'>
        {/* Market Indicators Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
          <MarketIndicator
            title='버핏 지수'
            indicatorKey='buffettIndicator'
            unit='%'
            change={2.3}
            description='시총/GDP 비율'
          />
          <MarketIndicator
            title='VIX 지수'
            indicatorKey='vixIndex'
            unit=''
            change={-1.2}
            description='변동성 지수'
          />
          <MarketIndicator
            title='원달러 환율'
            indicatorKey='usdKrw'
            unit='₩'
            change={0.8}
            description='USD/KRW'
          />
          <MarketIndicator
            title='달러 지수'
            indicatorKey='dollarIndex'
            unit=''
            change={-0.5}
            description='DXY'
          />
          <MarketIndicator
            title='공포 탐욕 지수'
            indicatorKey='fearGreedIndex'
            unit=''
            change={5.2}
            description='Fear & Greed'
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <ChartSection />
          <MarketAnalysis />
        </div>
      </main>
    </div>
  );
}
