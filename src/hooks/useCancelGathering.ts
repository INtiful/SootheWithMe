import updateGatheringToCancelled from '@/app/api/actions/gatherings/updateGatheringToCancelled';
import { useRouter } from 'next/navigation';

const useCancelGathering = (gatheringId: number) => {
  const router = useRouter();

  const cancelGathering = async () => {
    try {
      await updateGatheringToCancelled(gatheringId);

      alert('모임이 취소되었습니다!');

      router.push('/gatherings');
    } catch (error) {
      throw new Error('모임을 취소하지 못했습니다.');
    }
  };

  return { cancelGathering };
};

export default useCancelGathering;
