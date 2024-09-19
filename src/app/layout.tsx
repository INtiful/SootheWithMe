import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/reset.css';
import '@/styles/style.css';
import Gnb from './components/Gnb/Gnb';
import Providers from './react-query-providers';

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
        <Providers>
          <div className='pt-60'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
