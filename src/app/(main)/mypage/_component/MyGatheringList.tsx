'use client';

import fetchGatherings from './fetch';
import Card from '@/app/components/Card/Card';
import InfiniteScroll from '@/app/components/InfiniteScroll/InfiniteScroll';

const MyGatheringList = () => {
  return (
    <InfiniteScroll
      queryKey={['gatherings']}
      queryFn={fetchGatherings}
      emptyText='아직 참여한 모임이 없습니다.'
      renderItem={(item, index) => (
        <Card
          key={index}
          data={item}
          hasButton={true}
          hasChips={true}
          handleCancelGatherings={() => console.log('Cancel gathering')}
          handleWriteReview={() => console.log('Write review')}
        />
      )}
    />
  );
};

export default MyGatheringList;
