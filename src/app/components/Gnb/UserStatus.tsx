'use client';

import { deleteCookie } from '@/actions/auth/cookie/cookie';
import { useUser } from '@/app/(auth)/context/UserContext';
import { Profile } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserStatus = () => {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    deleteCookie('token');
    setUser(null);
    setIsOpen(false);
    router.push('/');
  };

  return (
    <>
      {user ? (
        <div className='relative' ref={dropDownRef}>
          <div className='relative size-40 cursor-pointer overflow-hidden rounded-full'>
            {user.image ? (
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <Image fill src={user.image} alt='프로필 이미지' />
              </button>
            ) : (
              <Profile onClick={() => setIsOpen((prev) => !prev)} />
            )}
          </div>

          {isOpen && (
            <ul className='absolute right-0 mt-8 max-h-240 w-120 overflow-y-auto rounded-xl bg-var-gray-50 lg:left-0'>
              <Link href='/mypage' onClick={() => setIsOpen(false)}>
                <li className='cursor-pointer px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16'>
                  마이페이지
                </li>
              </Link>
              <li className='cursor-pointer px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16'>
                <button onClick={handleLogout}>로그아웃</button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <Link href='/signin'>
          <button className='text-[16px] font-semibold text-white'>
            로그인
          </button>
        </Link>
      )}
    </>
  );
};

export default UserStatus;
