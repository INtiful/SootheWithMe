'use client';

import { useUser } from '@/app/(auth)/context/UserContext';
import { Profile } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const options = [
  { name: '마이페이지', link: '/mypage' },
  { name: '로그아웃', link: '/gatherings' },
];

const UserStatus = () => {
  const { user, setUser, isLoading, errorMsg } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {user ? (
        <div className='relative' ref={dropDownRef}>
          <div className='relative size-40 cursor-pointer overflow-hidden rounded-full'>
            {user.image ? (
              <Image fill src={user.image} alt='프로필 이미지' />
            ) : (
              <Profile onClick={() => setIsOpen((prev) => !prev)} />
            )}
          </div>

          {isOpen && (
            <ul className='absolute right-0 mt-8 max-h-240 w-120 overflow-y-auto rounded-xl bg-var-gray-50 lg:left-0'>
              {options.map((option, index) => (
                <Link key={index} href={option.link}>
                  <li className='cursor-pointer px-16 py-12 text-[12px] font-medium text-var-black hover:bg-var-orange-100 md:px-16'>
                    {option.name}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Link href='/signin'>
          <div className='text-[16px] font-semibold text-white'>로그인</div>
        </Link>
      )}
    </>
  );
};

export default UserStatus;
