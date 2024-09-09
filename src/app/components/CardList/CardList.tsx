'use client';

import {
  IconSaveActive,
  IconSaveDiscard,
  IconSaveDiscardBtn,
  IconSaveInactive,
} from '@/public/icons';
import Image from 'next/image';
import {
  formatDate,
  formatTimeColon,
  formatTimeHours,
  isSameDate,
} from '@/utils/formatDate';
import { GatheringsListData } from '@/types/data.type';
import Tag from '@/app/components/Tag/Tag';
import InfoChip from '../Chip/InfoChip';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useState } from 'react';

interface CardProps {
  data: GatheringsListData;
}

const CardList = ({ data }: CardProps) => {
  // 모임의 날짜와 현재 날짜를 비교하여 태그 렌더링
  const isRenderTag = isSameDate(data.dateTime);

  // 모임의 날짜와 현재 날짜를 비교하여 마감 여부 표시
  const isChallengeEnded = new Date(data.dateTime) <= new Date();

  //
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
    // TODO
    // storage 변경 코드
  };

  return (
    <div className='relative flex w-full flex-col overflow-hidden rounded-[24px] border-2 border-var-gray-100 bg-white transition-all duration-300 hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.04)] md:flex-row'>
      {/* 이미지 */}
      <div className='relative flex h-156 w-full flex-col gap-16 md:h-auto md:w-280'>
        <Image
          className='rounded-t-[24px] object-cover md:rounded-l-[24px] md:rounded-tr-none'
          src={data.image}
          alt='image'
          fill
          quality={85}
          sizes='(max-width: 768px) 100vw, 280px'
        />
        {isRenderTag && <Tag>오늘 {formatTimeHours(data.dateTime)}시 마감</Tag>}
      </div>

      {/* 정보 */}
      <div className='flex grow flex-col gap-[20px] p-16 pb-24'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-8 text-18 font-semibold text-var-gray-900'>
              <p>{data.name}</p>
              <span>|</span>
              <p className='text-14 font-medium text-var-gray-700'>
                {data.location}
              </p>
            </div>
            <div className='flex gap-8'>
              <InfoChip type='date'>{formatDate(data.dateTime)}</InfoChip>
              <InfoChip type='time'>{formatTimeColon(data.dateTime)}</InfoChip>
            </div>
          </div>
          {isSaved ? (
            <IconSaveActive
              className='animate-heartPulse h-48 w-48 cursor-pointer'
              onClick={handleToggleSave}
            />
          ) : (
            <IconSaveInactive
              className='h-48 w-48 cursor-pointer'
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
        <div className='absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-var-black bg-opacity-80'>
          <p className='text-14 font-medium text-white'>
            마감된 챌린지예요.
            <br />
            다음 기회에 만나요 🙏
          </p>
          <button
            type='button'
            className='right-24 mt-24 md:absolute md:top-24 md:mt-0'
            // TODO : onClick={}
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
