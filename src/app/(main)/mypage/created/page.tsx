import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import GatheringList from './_component/GatheringList';

const CreatedPage = async () => {
  // TODO : User ID를 조회
  const USER_ID = '718';
  const gatherings = await getGatherings({ createdBy: USER_ID });

  return (
    <>
      {gatherings.length > 0 ? (
        <GatheringList dataList={gatherings} />
      ) : (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          아직 만든 모임이 없어요
        </div>
      )}
    </>
  );
};

export default CreatedPage;
