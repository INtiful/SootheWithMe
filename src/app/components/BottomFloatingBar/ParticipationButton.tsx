import Button from '../Button/Button';
//@todo 함수 기능 구현
import { onCancel, onShare, onJoin, onWithdraw } from './Mock';

interface Participant {
  User: {
    id: number;
  };
}

// @todo api 연결 후 Props 수정
interface ParticipationButtonProps {
  user: { name: string; id: number };
  createdBy: number;
  participantCount: number;
  capacity: number;
  registrationEnd: Date;
  canceledAt: null | Date;
  participantsData: Participant[];
}

const ParticipationButton = ({
  user,
  createdBy,
  participantCount,
  capacity,
  registrationEnd,
  canceledAt,
  participantsData,
}: ParticipationButtonProps) => {
  const isHost = createdBy === user.id; //주최자인지 검사
  const isFull = participantCount === capacity; //참여인원이 가득찼는지 검사
  const isRegistrationEnded = new Date() > new Date(registrationEnd); // 마감일이 지났는지 검사
  const hasParticipated = participantsData.some(
    (participant) => participant.User.id === user.id,
  ); //이미 참여했는지 검사
  const isCancelled = Boolean(canceledAt); //취소되었는지 검사

  /* 버튼 렌더링 함수 */
  const renderButton = (
    name: string,
    variant: 'white' | 'default' | 'gray',
    onClick?: () => void,
    disabled = false,
  ) => (
    <div className='h-44 w-[115px]'>
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
    return (
      <div className='flex gap-[10px]'>
        {renderButton('취소하기', 'white', onCancel)}
        {renderButton('공유하기', 'default', onShare)}
      </div>
    );
  }

  // 참여 불가능한 조건 (정원이 찼거나, 마감일이 지났거나, 취소된 모임)
  if (isFull || isRegistrationEnded || isCancelled) {
    return renderButton('참여하기', 'gray', undefined, true);
  }

  // 참여 상태에 따른 버튼 표시
  return hasParticipated
    ? renderButton('참여 취소하기', 'white', onWithdraw)
    : renderButton('참여하기', 'default', onJoin);
};

export default ParticipationButton;
