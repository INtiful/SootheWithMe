'use server';

import { revalidatePath } from 'next/cache';

import { GatheringsListData } from '@/types/data.type';

const fetchGatherings = async (): Promise<GatheringsListData[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings?limit=10&offset=0`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: GatheringsListData[] = await res.json();

    revalidatePath('/');
    revalidatePath('/gatherings');

    return data;
  } catch (error) {
    throw new Error('모임을 불러오지 못했습니다.');
  }
};

export default fetchGatherings;
