import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/reset.css';
import '@/styles/style.css';
import Gnb from './components/Gnb/Gnb';
import Providers from './providers';
import { getUserData } from './api/actions/mypage/getUserData';
import { toastOptions } from '@/constants/toast.config';

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Soothe With Me',
  description:
    '유저가 바쁜 일상 속 휴식을 위한 다양한 모임을 탐색하고 참여하며, 직접 모임을 개설하고 리뷰를 생성할 수 있는 서비스입니다.',
  icons: {
    icon: '/icons/bye.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUserData();
  return (
    <html lang='ko'>
      <body className='flex min-h-dvh flex-col bg-var-gray-100 font-pretendard'>
        <Providers>
          <Gnb user={userData} />
          <div className='grow pt-60'>{children}</div>
          <div id='modal-root'></div>
          <Toaster toastOptions={toastOptions} />
        </Providers>
      </body>
    </html>
  );
}
