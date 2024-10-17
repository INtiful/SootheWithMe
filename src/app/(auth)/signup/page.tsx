import SignUpForm from '@/app/(auth)/signup/_component/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'Soothe With Me 회원가입 페이지입니다.',
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
