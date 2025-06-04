'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react';
import type { MarketAnalysisProps } from '@/types/market-data';

export default function MarketAnalysis({ marketData }: MarketAnalysisProps) {
  const getAnalysis = () => {
    const { buffettIndicator, vixIndex, fearGreedIndex, usdKrw, dollarIndex } =
      marketData;

    const signals: { type: string; text: string; icon: LucideIcon }[] = [];
    let overallSentiment = 'neutral';
    let recommendation = '';

    // 버핏 지수 분석
    if (buffettIndicator > 200) {
      signals.push({
        type: 'warning',
        text: '버핏 지수 과열 (>200%)',
        icon: AlertTriangle,
      });
      overallSentiment = 'bearish';
    } else if (buffettIndicator < 100) {
      signals.push({
        type: 'positive',
        text: '버핏 지수 저평가 (<100%)',
        icon: TrendingUp,
      });
      overallSentiment = 'bullish';
    }

    // VIX 분석
    if (vixIndex > 30) {
      signals.push({
        type: 'warning',
        text: '높은 변동성 (VIX >30)',
        icon: AlertTriangle,
      });
    } else if (vixIndex < 15) {
      signals.push({
        type: 'neutral',
        text: '낮은 변동성 (VIX <15)',
        icon: TrendingUp,
      });
    }

    // 공포 탐욕 지수 분석
    if (fearGreedIndex > 75) {
      signals.push({
        type: 'warning',
        text: '극도의 탐욕 (>75)',
        icon: AlertTriangle,
      });
    } else if (fearGreedIndex < 25) {
      signals.push({
        type: 'positive',
        text: '극도의 공포 (<25)',
        icon: TrendingUp,
      });
    }

    // 환율 분석
    if (usdKrw > 1400) {
      signals.push({
        type: 'warning',
        text: '원화 약세 (>1400원)',
        icon: TrendingDown,
      });
    }

    // 종합 추천
    if (overallSentiment === 'bullish') {
      recommendation = '점진적 매수 기회를 고려해보세요.';
    } else if (overallSentiment === 'bearish') {
      recommendation =
        '신중한 접근이 필요합니다. 현금 비중을 늘리는 것을 고려해보세요.';
    } else {
      recommendation = '관망하며 추가 신호를 기다리는 것이 좋겠습니다.';
    }

    return { signals, recommendation, overallSentiment };
  };

  const analysis = getAnalysis();

  return (
    <Card className='bg-slate-800/50 border-slate-700'>
      <CardHeader>
        <CardTitle className='text-white'>시장 분석</CardTitle>
        <p className='text-slate-400 text-sm'>현재 지표들을 종합한 분석 결과</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* 신호들 */}
        <div className='space-y-2'>
          <h4 className='font-medium text-slate-300'>주요 신호</h4>
          {analysis.signals.map((signal, index) => (
            <div key={index} className='flex items-center gap-2'>
              <signal.icon
                className={`w-4 h-4 ${
                  signal.type === 'positive'
                    ? 'text-green-400'
                    : signal.type === 'warning'
                    ? 'text-orange-400'
                    : 'text-slate-400'
                }`}
              />
              <span
                className={`text-sm ${
                  signal.type === 'positive'
                    ? 'text-green-400'
                    : signal.type === 'warning'
                    ? 'text-orange-400'
                    : 'text-slate-300'
                }`}
              >
                {signal.text}
              </span>
            </div>
          ))}
        </div>

        {/* 전체 시장 심리 */}
        <div>
          <h4 className='font-medium text-slate-300 mb-2'>시장 심리</h4>
          <Badge
            variant='outline'
            className={`${
              analysis.overallSentiment === 'bullish'
                ? 'border-green-400 text-green-400'
                : analysis.overallSentiment === 'bearish'
                ? 'border-red-400 text-red-400'
                : 'border-slate-400 text-slate-400'
            }`}
          >
            {analysis.overallSentiment === 'bullish'
              ? '강세'
              : analysis.overallSentiment === 'bearish'
              ? '약세'
              : '중립'}
          </Badge>
        </div>

        {/* 투자 추천 */}
        <div className='bg-slate-700/50 p-4 rounded-lg'>
          <h4 className='font-medium text-slate-300 mb-2'>투자 추천</h4>
          <p className='text-sm text-slate-400'>{analysis.recommendation}</p>
        </div>

        {/* 면책조항 */}
        <div className='text-xs text-slate-500 border-t border-slate-700 pt-2'>
          * 이 분석은 참고용이며, 투자 결정은 본인의 판단에 따라 신중히 하시기
          바랍니다.
        </div>
      </CardContent>
    </Card>
  );
}
