import { ImageLogin } from '@/public/images';
import Footer from '../components/AuthForm/Footer';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='min-h-dvh w-full bg-var-gray-100'>
      <div className='flex max-w-[1200px] flex-col items-center justify-between gap-32 pt-40 md:mx-24 lg:mx-auto lg:flex-row lg:pt-40'>
        <div className='flex flex-col'>
          <div className='text-center'>
            <h1 className='text-20 font-semibold md:text-24'>
              Welcome to 같이 달램!
            </h1>
            <p className='text-14 font-medium md:text-16'>
              바쁜 일상 속 잠깐의 휴식, <br />
              이제는 같이 달램과 함께 해보세요
            </p>
          </div>
          <ImageLogin className='w-[588px]' />
        </div>
        <div className='rounded-[24px] bg-var-white px-[54px] py-32'>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
