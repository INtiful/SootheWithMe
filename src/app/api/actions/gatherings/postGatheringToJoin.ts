'use server';

import { revalidatePath } from 'next/cache';

import { getCookie } from '@/actions/auth/cookie/cookie';

const postGatheringToJoin = async (gatheringId: number) => {
  try {
    const token = await getCookie('token');

    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/${gatheringId}/join`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const data = await res.json();

    revalidatePath('/');
    revalidatePath('/(main)/gatherings/[id]', 'page');

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : '모임에 참여하지 못했습니다.',
    );
  }
};

export default postGatheringToJoin;
