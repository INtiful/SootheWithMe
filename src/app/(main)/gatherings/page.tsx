import { Metadata } from 'next';
import Header from './_component/Header';
import ClientSideGatherings from './_component/ClientSideGatherings';
import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { getUserData } from '@/app/api/actions/mypage/getUserData';
import { pageMetadata } from '@/utils/makeMetadata';

export const metadata: Metadata = pageMetadata('모임찾기', '/gatherings');

const GatheringsPage = async () => {
  const gatherings = await getGatherings({
    type: 'DALLAEMFIT',
  });
  const userData = await getUserData();

  return (
    <div className='mx-auto max-w-[1200px]'>
      <div className='min-h-screen bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100 dark:bg-neutral-900'>
        <Header />
        <ClientSideGatherings gatherings={gatherings} user={userData} />
      </div>
    </div>
  );
};

export const fetchCache = 'force-no-store';

export default GatheringsPage;
