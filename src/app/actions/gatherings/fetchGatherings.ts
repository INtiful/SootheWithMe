'use server';

import { revalidatePath } from 'next/cache';

import { GatheringsListData } from '@/types/data.type';

interface FetchGatheringsParams {
  limit?: number;
  offset?: number;
  type?: 'DALLAEMFIT' | 'WORKATION';
  location?: string;
  date?: string;
  createdBy?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const fetchGatherings = async (
  params: FetchGatheringsParams = {},
): Promise<GatheringsListData[]> => {
  try {
    const { limit = 10, offset = 0, ...rest } = params;

    const queryString = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      ...rest,
    }).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: GatheringsListData[] = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    throw new Error('모임을 불러오지 못했습니다.');
  }
};

export default fetchGatherings;
