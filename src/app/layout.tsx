import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/reset.css';

import Gnb from './components/Gnb/Gnb';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='min-h-dvh bg-var-gray-100 font-pretendard'>
        <Gnb />
        <div className='pt-60'>{children}</div>
      </body>
    </html>
  );
}
