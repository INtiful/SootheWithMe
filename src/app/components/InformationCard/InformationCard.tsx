'use client';

import { useState } from 'react';

import {
  IconCheckCircle,
  IconSaveActive,
  IconSaveInactive,
} from '@/public/icons';
import { Profile } from '@/public/images';
import InfoChip from '../Chip/InfoChip';

interface InformationCardProps {
  title: string;
  address: string;
  date: string;
  time: string;
  capacity: number;
  maxParticipants: number;
  minParticipants: number;
}

const InformationCard = ({
  title,
  address,
  date,
  time,
  capacity,
  maxParticipants,
  minParticipants,
}: InformationCardProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  // function of setting Profiles with remaining
  const renderProfiles = () => {
    const profiles = [];
    const maxVisible = 4;

    if (capacity <= maxVisible) {
      for (let i = 0; i < capacity; i++) {
        profiles.push(<Profile key={i} className='h-28 w-28' />);
      }
    } else {
      for (let i = 0; i < maxVisible; i++) {
        profiles.push(<Profile key={i} className='h-28 w-28' />);
      }
      profiles.push(
        <div
          key='remaining'
          className='flex h-28 w-28 items-center justify-center rounded-full bg-gray-100 text-14 font-semibold'
        >
          +{capacity - maxVisible}
        </div>,
      );
    }

    return profiles;
  };

  return (
    <div className='w-full divide-y divide-dashed p-6 text-var-gray-900'>
      <div className='pb-44'>
        <div className='flex justify-between'>
          <div>
            <div className='text-[18px] font-semibold'>{title}</div>
            <div className='text-[14px] font-medium'>{address}</div>
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

        <div className='mt-12 space-x-8'>
          <InfoChip type='date'>{date}</InfoChip>
          <InfoChip type='time'>{time}</InfoChip>
        </div>
      </div>

      <div className='pt-6'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='text-14 font-semibold'>모집 정원 {capacity}명</div>
            <div className='ml-12 flex -space-x-6'>{renderProfiles()}</div>
          </div>
          <div className='flex items-center'>
            {capacity >= minParticipants ? (
              <>
                <IconCheckCircle />
                <div className='text-14 font-medium text-var-orange-500'>
                  개설확정
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div>{/* progress bar */}</div>

        <div className='flex justify-between text-12 font-semibold'>
          <div>최소인원 {minParticipants}명</div>
          <div className='text-var-orange-500'>
            최대인원 {maxParticipants}명
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
