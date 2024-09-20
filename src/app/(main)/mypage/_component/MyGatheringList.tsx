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
      <ul className='flex h-full flex-col'>
        {data ? (
          data.pages.map((page) =>
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
          )
        ) : (
          <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500'>
            아직 참여한 모임가 없어요
          </div>
        )}
      </ul>
      <div ref={ref} />
    </>
  );
};

export default MyGatheringList;
