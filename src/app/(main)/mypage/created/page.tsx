'use client';

import { useUserCreated } from '@/hooks/useUserCreated';
import GatheringList from './_component/GatheringList';

const CreatedPage = () => {
  const { gatheringsList, isLoading } = useUserCreated();

  return (
    <>
      {isLoading ? (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          모임 정보를 불러오고 있어요...
        </div>
      ) : gatheringsList.length > 0 ? (
        <GatheringList dataList={gatheringsList} />
      ) : (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          아직 만든 모임이 없어요
        </div>
      )}
    </>
  );
};

export default CreatedPage;
