'use client';

import { MouseEvent, useState } from 'react';
import Image from 'next/image';

import {
  IconSaveActive,
  IconSaveDiscard,
  IconSaveDiscardBtn,
  IconSaveInactive,
} from '@/public/icons';
import { formatDate, formatTimeColon } from '@/utils/formatDate';
import getDaysUntilRegistrationEnd from '@/app/(main)/gatherings/_helpers/getDaysUntilRegistrationEnd';
import { GatheringType } from '@/types/data.type';
import Tag from '@/app/components/Tag/Tag';
import InfoChip from '@/app/components/Chip/InfoChip';
import ProgressBar from '@/app/components/ProgressBar/ProgressBar';
import getTagMessage from '@/app/(main)/gatherings/_helpers/getTagMessage';
import isGatheringFull from '@/app/(main)/gatherings/_helpers/isGatheringFull';
import isClosingTagVisible from '@/app/(main)/gatherings/_helpers/isClosingTagVisible';

interface CardProps {
  data: GatheringType;
  isSaved?: boolean;
  handleButtonClick?: (id: number) => void;
}

const CardList = ({ data, isSaved, handleButtonClick }: CardProps) => {
  const isChallengeEnded =
    new Date(data.dateTime) <= new Date() ||
    isGatheringFull(data.participantCount, data.capacity);
  const daysRemaining = getDaysUntilRegistrationEnd(data.registrationEnd);
  const tagMessage = getTagMessage(
    daysRemaining,
    data.registrationEnd,
    isChallengeEnded,
  );
  const isRenderTag = isClosingTagVisible(daysRemaining, isChallengeEnded);

  const [isSavedActive, setSavedActive] = useState<boolean>(isSaved || false);

  const handleToggleSave = (e: MouseEvent) => {
    e.preventDefault();

    if (!handleButtonClick) {
      return;
    }

    if (isChallengeEnded && !isSaved) {
      return;
    }

    setSavedActive((prev) => !prev);
    handleButtonClick(data.id);
  };

  return (
    <div className='relative flex w-full flex-col overflow-hidden rounded-[24px] border-2 border-var-gray-100 bg-white transition-all duration-300 hover:shadow-lg md:flex-row dark:border-neutral-700 dark:bg-neutral-800'>
      {/* 이미지 */}
      <div className='relative flex h-156 w-full flex-col gap-16 md:h-auto md:w-280'>
        <Image
          className='rounded-t-[24px] object-cover md:rounded-l-[24px] md:rounded-tr-none'
          src={data.image || '/images/mock-image.png'}
          alt='image'
          fill
          quality={85}
          sizes='(max-width: 768px) 100vw, 280px'
        />
        {isRenderTag && <Tag>{tagMessage}</Tag>}
      </div>

      {/* 정보 */}
      <div className='flex grow flex-col gap-[20px] p-16 pb-24'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-8 text-18 font-semibold text-var-gray-900 dark:text-neutral-50'>
              <p>{data.name}</p>
              <span className='dark:text-neutral-200'>|</span>
              <p className='text-14 font-medium text-var-gray-700 dark:text-neutral-200'>
                {data.location}
              </p>
            </div>
            <div className='flex gap-8'>
              <InfoChip type='date'>{formatDate(data.dateTime)}</InfoChip>
              <InfoChip type='time'>{formatTimeColon(data.dateTime)}</InfoChip>
            </div>
          </div>
          {isSavedActive ? (
            <IconSaveActive
              className='h-48 w-48 animate-heartPulse cursor-pointer dark:brightness-90'
              onClick={handleToggleSave}
            />
          ) : (
            <IconSaveInactive
              className='h-48 w-48 cursor-pointer dark:brightness-50'
              onClick={handleToggleSave}
            />
          )}
        </div>

        <ProgressBar
          participantNumber={data.participantCount}
          capacity={data.capacity}
          hasParticipantNumber={true}
          hasOpeningConfirmed={true}
          hasText={true}
        />
      </div>

      {/* 종료된 챌린지의 경우 */}
      {isChallengeEnded && (
        <div className='absolute left-0 top-0 z-base flex h-full w-full flex-col items-center justify-center bg-var-black bg-opacity-80'>
          <p className='text-14 font-medium text-white'>
            마감된 챌린지예요.
            <br />
            다음 기회에 만나요 🙏
          </p>
          <button
            type='button'
            className='right-24 mt-24 md:absolute md:top-24 md:mt-0'
            onClick={handleToggleSave}
            aria-label='종료된 모임을 찜하기 해제'
          >
            <IconSaveDiscardBtn className='h-36 w-116 md:hidden' />
            <IconSaveDiscard className='hidden h-48 w-48 md:block' />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardList;
