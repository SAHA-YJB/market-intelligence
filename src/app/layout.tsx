import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Header from '@/components/home/header';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Smart Market View',
  description: '실시간 주식시장 분석 대시보드',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${notoSansKr.className} bg-slate-900 text-white flex flex-col min-h-screen`}
      >
        <Header />
        <div className='flex-grow flex items-center'>{children}</div>
      </body>
    </html>
  );
}
