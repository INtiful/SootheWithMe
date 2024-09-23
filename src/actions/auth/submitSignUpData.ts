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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message); // 오류 처리
  }

  const result = await response.json();

  return result;
};
