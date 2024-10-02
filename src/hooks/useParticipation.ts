import { useState } from 'react';
import { useParams } from 'next/navigation';

import postGatheringToJoin from '@/app/api/actions/gatherings/postGatheringToJoin';
import deleteGatheringToWithdraw from '@/app/api/actions/gatherings/deleteGatheringToWithdraw';
import { UserData } from '@/types/client.type';

import toast from 'react-hot-toast';

export default function useParticipation(user: UserData | null) {
  const params = useParams();

  const [hasParticipated, setHasParticipated] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleJoinClick = async () => {
    if (!user) {
      setShowPopup(true);
      return;
    }

    if (!hasParticipated) {
      const { success, message } = await postGatheringToJoin(Number(params.id));

      if (!success) {
        toast.error(message, {
          className: 'text-14 font-bold',
        });
        return;
      }

      toast.success(message, {
        className: 'text-14 font-bold',
      });
      setHasParticipated(true);
    }
  };

  const handleWithdrawClick = async () => {
    if (hasParticipated) {
      const { success, message } = await deleteGatheringToWithdraw(
        Number(params.id),
      );

      if (!success) {
        toast.error(message, {
          className: 'text-14 font-bold',
        });
        return;
      }

      toast.success(message, {
        className: 'text-14 font-bold',
      });
      setHasParticipated(false);
    }
  };

  return {
    hasParticipated,
    setHasParticipated,
    showPopup,
    setShowPopup,
    handleJoinClick,
    handleWithdrawClick,
  };
}
