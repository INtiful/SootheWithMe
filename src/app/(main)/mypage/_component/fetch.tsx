import { FetchGatheringsResponse } from '@/types/data.type';

const fetchGatherings = async (
  offset?: number,
): Promise<FetchGatheringsResponse> => {
  const response = await fetch(`/api/mock?offset=${offset || 0}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default fetchGatherings;
