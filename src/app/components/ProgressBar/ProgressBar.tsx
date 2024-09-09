// 개설 확정은 참여 인원수가 최소 인원 수(5명)을 충족한 경우 자동 확정 처리됩니다.
// Progress bar(참여 인원수) 처음 렌더링 시 숫자가 올라가면서 바가 채워지도록 합니다. (애니메이션) - framer motion
'use client';

import { IconArrow, IconCheckCircle, IconPerson } from '@/public/icons';

interface ProgressBarProps {
  participantNumber: number;
  hasParticipantNumber: boolean;
}

const ProgressBar = ({
  participantNumber,
  hasParticipantNumber,
}: ProgressBarProps) => {
  const isOpeningConfirmed = participantNumber >= 5; // 개설 확정 여부 (boolean)
  const isClosedGathering = participantNumber === 20; // 참여 인원이 20명인 경우 (boolean)

  return (
    <div className='flex gap-24 border border-solid'>
      <div className='flex w-full flex-col gap-12'>
        {/* gathering information */}
        <div className='flex items-center gap-8'>
          {/* 참가 인원 렌더링 선택 */}
          {hasParticipantNumber && (
            <div
              className={`text-14 flex items-center gap-[2px] font-medium ${isClosedGathering ? 'text-var-orange-400' : 'text-var-black'}`}
            >
              <IconPerson className='h-16 w-16' />
              {`${participantNumber} / 20`}
            </div>
          )}
          {/* 개설확정 렌더링 선택 */}
          {isOpeningConfirmed && !isClosedGathering && (
            <div className='text-14 flex items-center gap-4 text-var-orange-400'>
              <IconCheckCircle className='h-24 w-24' />
              개설확정
            </div>
          )}
        </div>
        {/* progress bar */}
        <div className='flex h-4 w-full rounded-md bg-var-orange-100'>
          <div
            className={`h-full ${isClosedGathering ? 'bg-var-orange-400' : 'bg-var-orange-600'} transition-all ease-in-out`}
            style={{ width: `${(participantNumber / 20) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* user action */}
      {isClosedGathering ? (
        <div className='text-16 flex w-full items-center font-semibold text-var-orange-400'>
          Closed
        </div>
      ) : (
        <div className='text-16 flex w-full items-center gap-8 font-semibold text-var-orange-600'>
          join now
          <IconArrow className='h-[18px] w-[18px]' />
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
