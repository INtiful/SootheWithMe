import { Logo } from '@/public/images';
import Link from 'next/link';

//@todo Link 정해질 시 추가 예정
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
  return (
    <header className='flex items-center justify-between gap-0 bg-var-orange-600 py-16'>
      <div className='flex items-center'>
        <Link href='/'>
          <Logo className='mr-20 h-40 w-72' />
        </Link>
        <nav className='flex'>
          <ul className='flex gap-24'>
            {navList.map((nav, index) => (
              <li className='text-[16px] font-semibold text-white' key={index}>
                <Link href={nav.link}>{nav.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='text-[16px] font-semibold text-white'>로그인</div>
    </header>
  );
};

export default Gnb;
