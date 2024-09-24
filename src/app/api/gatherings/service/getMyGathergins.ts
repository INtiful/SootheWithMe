'use client';

import { FetchGatheringsResponse } from '@/types/data.type';

const getMyGathergins = async (
  offset = 0,
  limit = 5,
): Promise<FetchGatheringsResponse> => {
  const response = await fetch(
    `/api/gatherings/joined?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
<<<<<<< HEAD
    throw new Error('나의 모임을 불러오는데 실패했습니다.');
=======
    throw new Error('Network response was not ok');
>>>>>>> 83b8fdf ([KAN-71] feat: 나의 모임 api 연결)
  }
  return response.json();
};

export default getMyGathergins;
