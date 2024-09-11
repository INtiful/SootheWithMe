'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { errorMessageStyle, signupSchema } from './FormOptions';

interface SignUpData {
  name: string;
  email: string;
  company: string;
  password: string;
  passwordCheck: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      password: '',
      passwordCheck: '',
    },
  });

  const submit = (data: SignUpData) => {
    console.log(data);
  };
  return (
    <form
      className='rounded-[24px] bg-var-white'
      onSubmit={handleSubmit(submit)}
    >
      <div className='flex w-full flex-col gap-24'>
        <h1 className='pb-8 text-center text-24 font-semibold'>회원가입</h1>
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>이름</label>

          <Input
            placeholder='이름을 입려해주세요.'
            className='h-44'
            hasError={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <div className={errorMessageStyle}>{errors.name.message}</div>
          )}
        </div>
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
          <label className='text-14 font-semibold'>회사명</label>
          <Input
            placeholder='회사명을 입려해주세요.'
            className='h-44'
            hasError={!!errors.company}
            {...register('company')}
          />
          {errors.company && (
            <div className={errorMessageStyle}>{errors.company.message}</div>
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
        <div className='flex flex-col gap-4'>
          <label className='text-14 font-semibold'>비밀번호 확인</label>

          <Input
            placeholder='비밀번호를 다시 한 번 입력해주세요.'
            className='h-44'
            hasError={!!errors.passwordCheck}
            {...register('passwordCheck')}
          />
          {errors.passwordCheck && (
            <div className={errorMessageStyle}>
              {errors.passwordCheck.message}
            </div>
          )}
        </div>
        <Button
          type='submit'
          name='확인'
          variant={isValid ? 'default' : 'gray'}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default SignUpForm;
