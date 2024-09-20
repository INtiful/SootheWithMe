'use server';

import { revalidatePath } from 'next/cache';

const fetchGatherings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings?limit=1&offset=0`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await res.json();

    revalidatePath('/');
    revalidatePath('/gatherings');

    console.log(data);
  } catch (error) {
    throw new Error('모임을 불러오지 못했습니다.');
  }
};

export default fetchGatherings;
