'use server';

import { ReviewsType } from '@/types/data.type';

interface GetReviewListParams {
  type?: 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';
  limit?: number;
  offset?: number;
  location?: string; // 건대입구, 을지로3가, 신림, 홍대입구
  date?: string; // (YYYY-MM-DD 형식)
  sortBy?: string; //createdAt, score, participantCount
  sortOrder?: 'asc' | 'desc';
  gatheringId?: number;
}

const getReviewList = async (
  params: GetReviewListParams = {},
): Promise<ReviewsType[]> => {
  try {
    const { limit = 10, offset = 0, gatheringId, ...rest } = params;

    const queryParams = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      ...rest,
    });

    if (gatheringId) {
      queryParams.append('gatheringId', String(gatheringId));
    }

    const queryString = queryParams.toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          // TODO : cache 관련 처리 협의 필요
        },
      },
    );

    const data: ReviewsType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error('리뷰를 불러오지 못했습니다.');
  }
};

export default getReviewList;
