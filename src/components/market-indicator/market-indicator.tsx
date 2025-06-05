'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { MarketIndicatorProps } from '@/types/market-data';
import { useMarketStore } from '@/store/market-store';

export const MarketIndicator: React.FC<MarketIndicatorProps> = ({
  title,
  indicatorKey,
  unit,
  change,
  description,
}) => {
  const marketData = useMarketStore((state) => state.marketData);
  const value = marketData[indicatorKey];

  const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';
  const ChangeIcon = change >= 0 ? TrendingUp : TrendingDown;

  if (typeof value !== 'number') {
    return (
      <Card className='bg-slate-800 border-slate-700 text-white'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-base font-medium flex justify-between items-center'>
            {title}
            <span className='text-xs text-slate-400'>{description}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>-</div>
          <div className={`text-xs ${changeColor} flex items-center`}>
            데이터 로딩 중...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-slate-800 border-slate-700 text-white'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base font-medium flex justify-between items-center'>
          {title}
          <span className='text-xs text-slate-400'>{description}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {value.toLocaleString()} {unit}
        </div>
        <div className={`text-xs ${changeColor} flex items-center`}>
          <ChangeIcon className='mr-1 h-4 w-4' />
          {change.toLocaleString()} (
          {((change / (value - change)) * 100).toFixed(1)}%)
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIndicator;
