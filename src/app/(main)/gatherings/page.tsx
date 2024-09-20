import Header from './_component/Header';
import ClientSideGatherings from './_component/ClientSideGatherings';
import fetchGatherings from '@/app/actions/gatherings/fetchGatherings';

const GatheringsPage = async () => {
  await fetchGatherings();

  return (
    <div className='mx-auto max-w-[1200px]'>
      <div className='min-h-screen bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100'>
        <Header />
        <ClientSideGatherings />
      </div>
    </div>
  );
};

export default GatheringsPage;
