import fetchGatherings from '@/app/api/actions/gatherings/fetchGatherings';
import GatheringList from './_component/GatheringList';
import { DATA_LIST } from './mockData';

const CreatedPage = async () => {
  // TODO : User ID를 조회
  const USER_ID = '716';
  // User ID로 모임 리스트 조회
  const gatherings = await fetchGatherings({ createdBy: USER_ID });

  return (
    <>
      {gatherings.length > 0 ? (
        <GatheringList dataList={DATA_LIST} />
      ) : (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          아직 만든 모임이 없어요
        </div>
      )}
    </>
  );
};

export default CreatedPage;
