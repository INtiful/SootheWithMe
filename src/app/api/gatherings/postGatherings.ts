'use server';

import { GatheringInfoType } from '@/types/data.type';
import { getCookie } from '@/actions/auth/cookie/cookie';

const postGatherings = async (
  location: string,
  type: string,
  dateTime: string,
  capacity: number,
  image: string,
  registrationEnd: string,
): Promise<GatheringInfoType> => {
  try {
    const token = await getCookie('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location,
          type,
          dateTime,
          capacity,
          image,
          registrationEnd,
        }),
      },
    );

    const data: GatheringInfoType = await res.json();

    return data;
  } catch (error) {
    throw new Error('모임 생성이 실패하였습니다.');
  }
};

export default postGatherings;
