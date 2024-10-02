'use server';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { ReviewPostType } from '@/types/data.type';
import toast from 'react-hot-toast';

interface PostReviewsParams {
  gatheringId: number;
  score: number;
  comment: string;
}

const postReviews = async (
  params: PostReviewsParams,
): Promise<ReviewPostType> => {
  try {
    const token = await getCookie('token');

    if (!token) {
      toast.error('로그인이 필요합니다.');
      throw new Error('토큰이 없습니다.');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data: ReviewPostType = await res.json();

    return data;
  } catch (error) {
    toast.error('리뷰 생성이 실패하였습니다.');
    throw new Error('리뷰 생성이 실패하였습니다.');
  }
};

export default postReviews;
