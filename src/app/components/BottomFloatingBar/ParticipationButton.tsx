'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { UserData } from '@/types/client.type';
import Button from '../Button/Button';
//@todo 함수 기능 구현
import { onJoin, onWithdraw } from './Mock';
import { GatheringParticipantsType } from '@/types/data.type';
import useCopyUrlToClipboard from '@/hooks/useCopyUrlToClipboard';
import useCancelGathering from '@/hooks/useCancelGathering';
import postGatheringToJoin from '@/app/api/actions/gatherings/postGatheringToJoin';
import deleteGatheringToWithdraw from '@/app/api/actions/gatherings/deleteGatheringToWithdraw';

// @todo api 연결 후 Props 수정
interface ParticipationButtonProps {
  isHost: boolean;
  user: UserData | null;
  participantCount: number;
  capacity: number;
  registrationEnd: string;
  canceledAt: undefined | null | string;
  participantsData: GatheringParticipantsType[];
}

const ParticipationButton = ({
  user,
  isHost,
  participantCount,
  capacity,
  registrationEnd,
  canceledAt,
  participantsData,
}: ParticipationButtonProps) => {
  const params = useParams();

  const { copyUrlToClipboard } = useCopyUrlToClipboard();
  const { cancelGathering } = useCancelGathering(Number(params.id));

  const [hasParticipated, setHasParticipated] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const isParticipated = participantsData.some(
        (participant) => participant.User.id === user.id,
      );
      setHasParticipated(isParticipated);
    }
  }, [user, participantsData]);

  const isFull = participantCount === capacity; //참여인원이 가득찼는지 검사
  const isRegistrationEnded = new Date() > new Date(registrationEnd); // 마감일이 지났는지 검사
  const isCancelled = Boolean(canceledAt); //취소되었는지 검사
  const isParticipationDisabled = isFull || isRegistrationEnded || isCancelled; // 참여 가능 여부 검사

  const buttonName = hasParticipated ? '참여 취소하기' : '참여하기'; //버튼 이름
  const buttonVariant = hasParticipated // 버튼 Variant
    ? 'white'
    : isParticipationDisabled
      ? 'gray'
      : 'default';

  const handleJoinClick = async () => {
    if (!hasParticipated) {
      await postGatheringToJoin(Number(params.id));
      setHasParticipated(true);
    }
  };

  const handleWithdrawClick = async () => {
    if (hasParticipated) {
      await deleteGatheringToWithdraw(Number(params.id));
      setHasParticipated(false);
    }
  };

  /* 버튼 렌더링 함수 */
  const renderButton = (
    name: string,
    variant: 'white' | 'default' | 'gray',
    onClick?: () => void,
    disabled = false,
  ) => (
    <div className={`h-44 w-[115px] ${isHost && 'w-full md:w-[115px]'}`}>
      <Button
        name={name}
        type='button'
        onClick={onClick}
        variant={variant}
        disabled={disabled}
      />
    </div>
  );

  // 주최자일 경우
  if (isHost) {
    const disabled = isRegistrationEnded || isCancelled; // 마감일이 지났거나 취소되었을 경우 button 비활성화
    return (
      <div className='flex w-[330px] gap-[10px]'>
        {renderButton('취소하기', 'white', cancelGathering, disabled)}
        {renderButton('공유하기', 'default', copyUrlToClipboard, disabled)}
      </div>
    );
  }

  return renderButton(
    buttonName,
    buttonVariant,
    hasParticipated ? handleWithdrawClick : handleJoinClick,
    isParticipationDisabled, // disable 여부
  );
};

export default ParticipationButton;
