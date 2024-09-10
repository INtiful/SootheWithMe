'use client';

import { Controller, useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from 'next/link';

interface SigninnData {
  email: string;
  password: string;
}

const SignInForm = () => {
  return (
    <form className='rounded-[24px] bg-var-white'>
      <div className='flex flex-col gap-24'>
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
          name='로그인'
          variant='default'
          disabled={false}
        />
      </div>
    </form>
  );
};

export default SignInForm;
