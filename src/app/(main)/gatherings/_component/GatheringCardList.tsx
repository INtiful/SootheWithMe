import CardList from '@/app/components/CardList/CardList';

import { mockData } from '../mockData/mockData';

const GatheringCardList = () => {
  return (
    <div className='mt-24 space-y-24'>
      {/* 모임이 없는 경우 */}
      {/* <div className='flex h-[400px] items-center justify-center'>
            <p className='text-center text-14 font-medium text-var-gray-500'>
              아직 모임이 없어요.
              <br />
              지금 바로 모임을 만들어보세요.
            </p>
          </div> */}

      {/* 모임이 있는 경우 */}
      <CardList data={mockData} />
      <CardList data={mockData} />
      <CardList data={mockData} />
      <CardList data={mockData} />
      <CardList data={mockData} />
    </div>
  );
};

export default GatheringCardList;
