'use client';

import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { signinSchema } from '../../_component/FormOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../../_component/FormField';
import { SignInData } from '@/types/client.type';
import { submitSignInData } from '@/actions/auth/submitSignInData';

const SignInForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInData>({
    mode: 'onBlur',
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = async (data: SignInData) => {
    try {
      const message = await submitSignInData(data);
      /* 테스트 성공로직 추가 */
      console.log(message);
    } catch (error: any) {
      console.error('Error:', error.message); // 오류 처리
    }
  };

  return (
    <form
      className='rounded-[24px] bg-var-white'
      onSubmit={handleSubmit(submit)}
    >
      <div className='flex flex-col gap-24'>
        <h1 className='pb-8 text-center text-24 font-semibold'>로그인</h1>
        <FormField
          label='아이디'
          name='email'
          placeholder='이메일을 입력해주세요.'
          register={register}
          error={errors.email?.message}
        />
        <FormField
          label='비밀번호'
          name='password'
          placeholder='비밀번호를 입력해주세요.'
          register={register}
          error={errors.password?.message}
          type='password'
        />
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
