import LoginForm from '@/app/components/AuthForm/LoginForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 | Soothe With Me',
  description: 'Soothe Wit hMe 로그인 페이지입니다.',
};

const SignIn = () => {
  return <LoginForm />;
};

export default SignIn;
