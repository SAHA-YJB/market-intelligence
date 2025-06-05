'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMarketStore } from '@/store/market-store';
import {
  AlertTriangle,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  HelpCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export default function MarketAnalysis() {
  const marketData = useMarketStore((state) => state.marketData);
  const { buffettIndicator, vixIndex, fearGreedIndex, dollarIndex, usdKrw } =
    marketData;

  const getOverallSentiment = () => {
    let score = 0;
    if (buffettIndicator > 150) score -= 2;
    else if (buffettIndicator > 120) score -= 1;
    else if (buffettIndicator < 80) score += 2;
    else if (buffettIndicator < 100) score += 1;

    if (vixIndex > 30) score -= 2;
    else if (vixIndex > 20) score -= 1;

    if (fearGreedIndex < 25) score += 2; // 공포
    else if (fearGreedIndex < 45) score += 1; // 약간 공포
    else if (fearGreedIndex > 75) score -= 2; // 탐욕
    else if (fearGreedIndex > 55) score -= 1; // 약간 탐욕

    if (score >= 3)
      return { text: '매우 긍정적', Icon: TrendingUp, color: 'text-green-400' };
    if (score >= 1)
      return {
        text: '긍정적',
        Icon: ArrowUpNarrowWide,
        color: 'text-green-300',
      };
    if (score <= -3)
      return { text: '매우 부정적', Icon: TrendingDown, color: 'text-red-400' };
    if (score <= -1)
      return {
        text: '부정적',
        Icon: ArrowDownNarrowWide,
        color: 'text-red-300',
      };
    return { text: '중립적', Icon: HelpCircle, color: 'text-slate-400' };
  };

  const overallSentiment = getOverallSentiment();

  const insights = [
    {
      title: '버핏 지수 분석',
      value: `${buffettIndicator}%`,
      interpretation:
        buffettIndicator > 150
          ? '고평가 구간'
          : buffettIndicator < 100
          ? '저평가 구간'
          : '적정 구간',
      Icon: buffettIndicator > 150 ? AlertTriangle : TrendingUp,
      color:
        buffettIndicator > 150
          ? 'text-orange-400'
          : buffettIndicator < 100
          ? 'text-green-400'
          : 'text-slate-400',
    },
    {
      title: 'VIX 지수 분석',
      value: vixIndex.toFixed(1),
      interpretation:
        vixIndex > 30
          ? '높은 변동성 (공포)'
          : vixIndex > 20
          ? '다소 높은 변동성'
          : '낮은 변동성 (안정)',
      Icon: vixIndex > 20 ? AlertTriangle : TrendingUp,
      color: vixIndex > 20 ? 'text-orange-400' : 'text-green-400',
    },
    {
      title: '공포 & 탐욕 지수',
      value: fearGreedIndex.toString(),
      interpretation:
        fearGreedIndex > 75
          ? '극단적 탐욕'
          : fearGreedIndex > 55
          ? '탐욕'
          : fearGreedIndex < 25
          ? '극단적 공포'
          : fearGreedIndex < 45
          ? '공포'
          : '중립',
      Icon:
        fearGreedIndex > 55 || fearGreedIndex < 45 ? AlertTriangle : HelpCircle, // 단순화된 아이콘 로직
      color:
        fearGreedIndex > 75
          ? 'text-red-500'
          : fearGreedIndex > 55
          ? 'text-orange-400'
          : fearGreedIndex < 25
          ? 'text-green-500'
          : fearGreedIndex < 45
          ? 'text-green-300'
          : 'text-slate-400',
    },
  ];

  return (
    <Card className='bg-slate-800 border-slate-700 text-white'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold text-white flex items-center'>
          종합 시장 분석
          <overallSentiment.Icon
            className={`ml-2 h-6 w-6 ${overallSentiment.color}`}
          />
        </CardTitle>
        <p className={`text-sm ${overallSentiment.color}`}>
          {overallSentiment.text} 상태입니다.
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        {insights.map((item, index) => (
          <div key={index} className='p-3 bg-slate-700/50 rounded-lg'>
            <div className='flex justify-between items-center mb-1'>
              <h4 className='text-sm font-medium text-slate-300'>
                {item.title}
              </h4>
              <item.Icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <p className='text-lg font-semibold text-white'>{item.value}</p>
            <p className={`text-xs ${item.color}`}>{item.interpretation}</p>
          </div>
        ))}
        <div className='mt-4 pt-4 border-t border-slate-700'>
          <h4 className='text-sm font-medium text-slate-300 mb-1'>
            주요 환율 및 지수
          </h4>
          <p className='text-sm text-slate-400'>
            원/달러: {usdKrw.toLocaleString()}원
          </p>
          <p className='text-sm text-slate-400'>
            달러 인덱스: {dollarIndex.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
