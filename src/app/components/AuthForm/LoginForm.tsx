'use client';

import { Controller, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from 'next/link';

interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  return (
    <form className='max-w-[510px] rounded-[24px] bg-var-white px-[54px] py-32'>
      <div className='flex w-full flex-col gap-24'>
        <h1 className='pb-8 text-center text-24 font-semibold'>로그인</h1>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>아이디</label>
          <Input placeholder='이메일을 입려해주세요.' className='h-44' />
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>비밀번호</label>
          <Input
            placeholder='비밀번호를 입력해주세요.'
            className='mb-16 h-44'
          />
        </div>
        <Button
          type='submit'
          name='로그인 하기'
          variant='default'
          disabled={false}
        />
        <p className='flex items-center justify-center text-[15px] font-medium'>
          같이 달램이 처음이신가요?
          <span className='text-var-orange-600 underline'>
            <Link href='/signup'>회원가입</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
