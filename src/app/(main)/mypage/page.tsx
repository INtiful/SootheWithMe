import { Metadata } from 'next';
import MyGatheringList from './_component/MyGatheringList';
import getMyGatherings from '@/app/api/actions/gatherings/getMyGatherings';

export const metadata: Metadata = {
  title: '나의 모임 | Soothe With Me',
  description: 'Soothe With Me 나의 모임 페이지입니다.',
};

const Mygatherings = async () => {
  const myGatherings = await getMyGatherings();
  return <MyGatheringList initData={myGatherings} />;
};

export default Mygatherings;
