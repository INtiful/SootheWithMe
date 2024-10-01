import { getUserData } from '@/app/api/actions/mypage/getUserData';
import ClientSideGatherings from './_component/ClientSideGatherings';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';

const CreatedPage = async () => {
  const userData = await getUserData();

  if (!userData) {
    // TODO : userData가 없을 때 에러 처리 혹은 로그인 페이지로 이동
    return null;
  }
  const gatherings = await getGatherings({
    createdBy: String(userData.id),
  });

  return (
    <>
      {gatherings.length > 0 ? (
        <ClientSideGatherings
          createdBy={String(userData.id)}
          gatherings={gatherings}
        />
      ) : (
        <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
          아직 만든 모임이 없어요
        </div>
      )}
    </>
  );
};

export default CreatedPage;
