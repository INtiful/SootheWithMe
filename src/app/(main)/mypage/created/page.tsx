'use client';

import Card from '@/app/components/Card/Card';
import Tab from '../_component/Tab';
import { DATA_LIST } from './mockData';

const CreatedPage = () => {
  const handleSaveDiscard = () => {
    // TODO : 스토리지 삭제 로직 추가
    console.log('스토리지 삭제 버튼 클릭');
  };

  return (
    <section className='flex w-full grow flex-col border-t-2 border-var-gray-900 bg-white px-16 py-24 md:px-24'>
      <Tab />

      <div className='grow'>
        {DATA_LIST.map((data) => (
          <Card
            key={data.id}
            handleSaveDiscard={handleSaveDiscard}
            data={DATA_LIST[0]}
          >
            <Card.Info />
          </Card>
        ))}
      </div>

      {/* 내가 만든 모임이 없을 경우 */}
      {/* <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
        아직 만든 모임이 없어요
      </div> */}
    </section>
  );
};

export default CreatedPage;
