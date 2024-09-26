import { useRouter } from 'next/navigation';

import postGatheringToJoin from '@/app/api/actions/gatherings/postGatheringToJoin';

const useJoinGathering = (gatheringId: number) => {
  const router = useRouter();

  const joinGathering = async () => {
    try {
      await postGatheringToJoin(gatheringId);
      alert('모임에 참여하였습니다!');

      router.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return { joinGathering };
};

export default useJoinGathering;
