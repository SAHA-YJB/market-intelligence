'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MarketIndicatorProps } from '@/types/market-data';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketIndicator({
  title,
  value,
  unit,
  change,
  description,
}: MarketIndicatorProps) {
  const isPositive = change > 0;

  const formatValue = (val: number) => {
    if (unit === '₩') return val.toLocaleString();
    return val.toFixed(1);
  };

  return (
    <Card className='bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium text-slate-300'>
          {title}
        </CardTitle>
        <p className='text-xs text-slate-500'>{description}</p>
      </CardHeader>
      <CardContent>
        <div className='flex items-end justify-between'>
          <div>
            <div className='text-2xl font-bold text-white'>
              {formatValue(value)}
              {unit}
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isPositive ? (
                <TrendingUp className='w-4 h-4' />
              ) : (
                <TrendingDown className='w-4 h-4' />
              )}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
