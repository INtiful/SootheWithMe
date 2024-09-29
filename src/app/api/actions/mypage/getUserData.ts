'use server';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { UserData } from '@/types/client.type';
import { revalidatePath } from 'next/cache';

export const getUserData = async () => {
  const token = await getCookie('token');

  if (!token) {
    revalidatePath('/');
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/user`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          cache: 'force-cache',
        },
      },
    );

    if (!response.ok) {
      throw new Error('유저 정보를 불러오는데 실패했습니다.');
    }

    const result: UserData = await response.json();

    return result; // 사용자 데이터를 반환
  } catch (error) {
    console.error('유저 정보를 불러오는데 실패했습니다:', error);
    return null;
  }
};
