'use client';

import { Logo } from '@/public/images';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserStatus from './UserStatus';
import TopTab from '../Tab/TopTab';

//@todo pathname 정해질 시 추가 예정
const navList = [
  {
    name: '모임 찾기',
    link: '#',
  },
  {
    name: '찜한 모임',
    link: '#',
  },
  {
    name: '모든 리뷰',
    link: '#',
  },
];

const Gnb = () => {
  const pathname = usePathname();

  return (
    <header className='bg-var-orange-600 py-16'>
      <div className='mx-16 flex max-w-[1200px] items-center justify-between md:mx-24 lg:mx-auto'>
        <nav className='flex items-center'>
          <Link href='/'>
            <Logo className='mr-20 h-40 w-72' />
          </Link>
          <ul className='flex gap-24'>
            {navList.map((nav, index) => (
              <li key={index}>
                <Link href={nav.link}>
                  <TopTab isActive={pathname.includes(nav.link)}>
                    {nav.name}
                  </TopTab>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <UserStatus />
      </div>
    </header>
  );
};

export default Gnb;
