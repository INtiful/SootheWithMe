'use server';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { UserData } from '@/types/client.type';

export const putProfileData = async (
  formData: FormData,
): Promise<UserData | null> => {
  const token = await getCookie('token');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/user`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('프로필 업데이트에 실패했습니다.');
    }

    const result: UserData = await response.json();

    return result; // 업데이트된 사용자 데이터를 반환
  } catch (error) {
    console.error('프로필 업데이트 중 오류가 발생했습니다:', error);
    return null;
  }
};
