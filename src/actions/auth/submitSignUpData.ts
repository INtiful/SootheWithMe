// actions/auth.ts
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
        Accept: 'application/json',
      },
      body: JSON.stringify({ name, email, password, companyName }),
    },
  );

  if (response.ok) {
    const result = await response.json();
    return result.message; // 성공 메시지 반환
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message); // 오류 처리
  }
};
