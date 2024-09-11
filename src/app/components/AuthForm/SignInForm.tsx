'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { errorMessageStyle, signinSchema } from './FormOptions';
import { zodResolver } from '@hookform/resolvers/zod';

interface SignInData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInData>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //@todo 제출 함수 작성
  const submit = (data: SignInData) => {
    console.log(data);
  };
  return (
    <form
      className='rounded-[24px] bg-var-white'
      onSubmit={handleSubmit(submit)}
    >
      <div className='flex flex-col gap-24'>
        <h1 className='pb-8 text-center text-24 font-semibold'>로그인</h1>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>아이디</label>

          <Input
            placeholder='이메일을 입려해주세요.'
            className='h-44'
            hasError={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <div className={errorMessageStyle}>{errors.email.message}</div>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>비밀번호</label>
          <Input
            placeholder='비밀번호를 입력해주세요.'
            className='h-44'
            hasError={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <div className={errorMessageStyle}>{errors.password.message}</div>
          )}
        </div>
        <Button
          type='submit'
          name='로그인'
          variant={isValid ? 'default' : 'gray'}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default SignInForm;
