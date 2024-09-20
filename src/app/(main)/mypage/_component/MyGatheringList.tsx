'use client';

import { myGatheringData } from '@/types/data.type';
import fetchGatherings from './fetch';
import Card from '@/app/components/Card/Card';
import useInfiniteScroll from '@/utils/useInfiniteScroll';

const MyGatheringList = () => {
  const { ref, data, isError, isLoading } = useInfiniteScroll<myGatheringData>({
    queryKey: ['gatherings'],
    queryFn: fetchGatherings,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occurred</p>;

  return (
    <>
      <ul>
        {data?.pages.map((page) =>
          page.data.map((item: myGatheringData, index: number) => (
            <li key={index}>
              <Card
                data={item}
                hasButton={true}
                hasChips={true}
                handleCancelGatherings={() => console.log('Cancel gathering')}
                handleWriteReview={() => console.log('Write review')}
              />
            </li>
          )),
        )}
      </ul>
      <div ref={ref} />
    </>
  );
};

export default MyGatheringList;
