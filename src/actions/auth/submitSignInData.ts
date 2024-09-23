import { SignInData } from '@/types/client.type';

export const submitSignInData = async (data: SignInData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const result = await response.json();

  // 쿠키에 토큰 저장
  document.cookie = `token=${result.token}; path=/; HttpOnly;`;

  return result; // 메시지 반환
};
