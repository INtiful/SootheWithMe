import { useRouter } from 'next/navigation';

import putGatheringToCancelled from '@/app/api/actions/gatherings/putGatheringToCancelled';

import toast from 'react-hot-toast';

const useCancelGathering = (gatheringId: number) => {
  const router = useRouter();

  const cancelGathering = async () => {
    const { success, message } = await putGatheringToCancelled(gatheringId);

    if (!success) {
      toast.error(message, {
        className: 'text-14 font-bold',
      });

      return;
    }

    toast.success(message, {
      className: 'text-14 font-bold',
    });

    router.push('/gatherings');
  };

  return { cancelGathering };
};

export default useCancelGathering;
