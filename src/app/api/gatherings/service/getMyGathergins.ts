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
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default getMyGathergins;
