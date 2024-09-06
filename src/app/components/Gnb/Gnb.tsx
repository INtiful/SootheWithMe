'use client';
import { Logo } from '@/public/images';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//@todo pathname 정해질 시 추가 예정
const navList = [
  {
    text: '모임 찾기',
    link: '#',
  },
  {
    text: '찜한 모임',
    link: '#',
  },
  {
    text: '모든 리뷰',
    link: '#',
  },
];

const Gnb = () => {
  const pathname = usePathname();

  return (
    <header className='flex items-center justify-between gap-0 bg-var-orange-600 py-16'>
      <div className='flex items-center'>
        <Link href='/'>
          <Logo className='mr-20 h-40 w-72' />
        </Link>
        <nav className='flex'>
          <ul className='flex gap-24'>
            {navList.map((nav, index) => (
              <li key={index}>
                <Link
                  className={`text-[16px] font-semibold ${pathname.includes(nav.link) ? 'text-black' : 'text-white'}`}
                  href={nav.link}
                >
                  {nav.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* @todo 임시 경로입니다. */}
      <Link href='/signin'>
        <div className='text-[16px] font-semibold text-white'>로그인</div>
      </Link>
    </header>
  );
};

export default Gnb;
