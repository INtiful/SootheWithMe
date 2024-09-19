'use client';

import Card from '@/app/components/Card/Card';
import mockData from '../mockData/mockData';

const MyGatheringList = () => {
  //@todo 카드 함수 추가예정
  const handleCancelGatherings = () => console.log('Cancel gathering');
  const handleWriteReview = () => console.log('Write review');

  return (
    <ul>
      {mockData.map((data, index) => (
        <li key={index}>
          <Card
            data={data.data}
            hasButton={data.hasButton}
            hasChips={data.hasChips}
            handleCancelGatherings={handleCancelGatherings}
            handleWriteReview={handleWriteReview}
          />
        </li>
      ))}
    </ul>
  );
};

export default MyGatheringList;
