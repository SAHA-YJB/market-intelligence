'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ChartSection() {
  // 샘플 데이터 - 실제로는 API에서 가져올 데이터
  const chartData = [
    { date: '1월', buffett: 165, vix: 22, fearGreed: 35, dollarIndex: 103.5 },
    { date: '2월', buffett: 170, vix: 19, fearGreed: 45, dollarIndex: 104.2 },
    { date: '3월', buffett: 175, vix: 25, fearGreed: 30, dollarIndex: 105.1 },
    { date: '4월', buffett: 180, vix: 18, fearGreed: 55, dollarIndex: 104.8 },
    { date: '5월', buffett: 185, vix: 16, fearGreed: 65, dollarIndex: 103.9 },
    { date: '6월', buffett: 185, vix: 18, fearGreed: 42, dollarIndex: 104.2 },
  ];

  return (
    <Card className='bg-slate-800/50 border-slate-700'>
      <CardHeader>
        <CardTitle className='text-white'>주요 지표 추이</CardTitle>
        <p className='text-slate-400 text-sm'>최근 6개월 데이터</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey='date' stroke='#9CA3AF' fontSize={12} />
            <YAxis stroke='#9CA3AF' fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB',
              }}
            />
            <Line
              type='monotone'
              dataKey='buffett'
              stroke='#F59E0B'
              strokeWidth={2}
              name='버핏 지수'
            />
            <Line
              type='monotone'
              dataKey='vix'
              stroke='#EF4444'
              strokeWidth={2}
              name='VIX'
            />
            <Line
              type='monotone'
              dataKey='fearGreed'
              stroke='#10B981'
              strokeWidth={2}
              name='공포탐욕지수'
            />
            <Line
              type='monotone'
              dataKey='dollarIndex'
              stroke='#8B5CF6'
              strokeWidth={2}
              name='달러지수'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
