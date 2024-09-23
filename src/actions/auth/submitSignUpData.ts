import { SignUpData } from '@/types/client.type';

export const submitSignUpData = async ({
  name,
  email,
  password,
  companyName,
}: SignUpData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, companyName }),
    },
  );

  if (response.ok) {
    const { token } = await response.json();
    document.cookie = `token=${token}; path=/;`; // 쿠키에 토큰 저장
    console.log('로그인 성공');
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message); // 오류 처리
  }
};
