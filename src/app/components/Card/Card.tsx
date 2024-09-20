import {
  IconPerson,
  IconSaveDiscard,
  IconSaveDiscardBtn,
} from '@/public/icons';
import Image from 'next/image';
import Button from '@/app/components/Button/Button';
import StateChip from '@/app/components/Chip/StateChip';
import { formatDate, formatTime } from '@/utils/formatDate';
import { UserJoinedGatheringsData } from '@/types/data.type';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface CardProps {
  data: UserJoinedGatheringsData;
  handleSaveDiscard: () => void;
}

// Card Wapper
const Card = ({
  data,
  handleSaveDiscard,
  children,
}: PropsWithChildren<CardProps>): JSX.Element => {
  return (
    <div className='w-full border-b-2 border-dashed border-var-gray-200 py-24'>
      <div className='relative flex w-full flex-col gap-16 overflow-hidden rounded-[12px] md:flex-row md:rounded-[24px]'>
        {/* Image */}
        <div className='md: relative flex h-156 w-full flex-col gap-16 md:w-280'>
          <Image
            className='rounded-[24px] object-cover'
            src={data.image}
            alt='모임 이미지'
            fill
            quality={85}
            sizes='(max-width: 768px) 100vw, 378px'
          />
        </div>

        {/* content - chip, info, button */}
        <div className='flex flex-col gap-[6px] p-2'>{children}</div>

        {data.canceledAt && (
          <CardOverlay handleButtonClick={handleSaveDiscard} />
        )}
      </div>
    </div>
  );
};

// Ooption Components - Chips
const CardChips = ({
  isCompleted,
  participantCount,
}: Pick<
  UserJoinedGatheringsData,
  'isCompleted' | 'participantCount'
>): JSX.Element => {
  if (isCompleted) {
    return (
      <div className='mb-[6px] flex gap-8'>
        <StateChip state='done' />
      </div>
    );
  }

  const MIN_PARTICIPANTS = 5;
  const isConfirmed = participantCount >= MIN_PARTICIPANTS;
  return (
    <div className='mb-[6px] flex gap-8'>
      {/* 이용 예정 */}
      <StateChip state='scheduled' />
      {/* 개설 확정 || 개설 대기 */}
      <StateChip state={isConfirmed ? 'confirmed' : 'pending'} />
    </div>
  );
};

// Ooption Components - Button
const CardButton = ({
  isCompleted,
  isReviewed,
  handleButtonClick,
}: Pick<UserJoinedGatheringsData, 'isCompleted' | 'isReviewed'> & {
  handleButtonClick: () => void;
}): JSX.Element => {
  // 데이터에 따라 버튼의 이름과 스타일을 변경
  const getButtonProps = () => {
    if (!isCompleted)
      return { name: '예약 취소하기', variant: 'white' as const };
    if (!isReviewed)
      return { name: '리뷰 작성하기', variant: 'default' as const };
    return null;
  };

  const buttonProps = getButtonProps();

  return (
    <>
      {buttonProps ? (
        <div className='mt-12 w-120 md:mt-auto'>
          <Button
            type='button'
            name={buttonProps.name}
            variant={buttonProps.variant}
            onClick={handleButtonClick}
          />
        </div>
      ) : null}
    </>
  );
};

// Ooption Components - Info
const CardInfo = ({
  data,
}: {
  data: UserJoinedGatheringsData;
}): JSX.Element => {
  return (
    <>
      <div className='flex items-center gap-8 text-18 font-semibold text-var-gray-900'>
        <p>{data.name}</p>
        <span>|</span>
        <p className='text-14 font-medium text-var-gray-700'>{data.location}</p>
      </div>
      <div className='flex items-center gap-4 text-14 font-medium text-var-gray-700'>
        <p>{formatDate(data.dateTime)}</p>
        <span>·</span>
        <p>{formatTime(data.dateTime)}</p>
        <IconPerson className='ml-8 h-16 w-16' />
        <p>
          {data.participantCount}/{data.capacity}
        </p>
      </div>
    </>
  );
};

const CardOverlay = ({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}): JSX.Element => {
  return (
    <div className='absolute left-0 top-0 z-base flex h-full w-full flex-col items-center justify-center bg-var-black bg-opacity-80'>
      <p className='text-14 font-medium text-white'>
        모집 취소된 모임이에요.
        <br />
        다음 기회에 만나요 🙏
      </p>
      <button
        type='button'
        data-testid='save-discard-button'
        className='right-24 mt-24 md:absolute md:top-24 md:mt-0'
        onClick={handleButtonClick}
      >
        <IconSaveDiscardBtn className='h-36 w-116 md:hidden' />
        <IconSaveDiscard className='hidden h-48 w-48 md:block' />
      </button>
    </div>
  );
};

Card.Chips = CardChips;
Card.Button = CardButton;
Card.Info = CardInfo;

export default Card;
