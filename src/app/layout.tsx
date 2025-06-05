import Header from '@/components/home/header';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <div className='min-h-screen bg-slate-900 text-white'>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
