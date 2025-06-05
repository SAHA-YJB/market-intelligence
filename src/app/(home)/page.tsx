import ChartSection from '@/components/chart-section';
import MarketAnalysis from '@/components/market-analysis';
import MarketIndicatorContainer from '@/components/market-indicator/market-indicator-container';

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-6'>
      <MarketIndicatorContainer />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <ChartSection />
        <MarketAnalysis />
      </div>
    </main>
  );
}
