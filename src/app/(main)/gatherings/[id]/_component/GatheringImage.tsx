import Image from 'next/image';

import { IconAlarm } from '@/public/icons';
import getDaysUntilRegistrationEnd from '@/utils/getDaysUntilRegistrationEnd';

interface GatheringImageProps {
  image: string;
  endTime?: string;
}

const GatheringImage = ({ image, endTime }: GatheringImageProps) => {
  const daysLeft = endTime ? getDaysUntilRegistrationEnd(endTime) : null;

  return (
    <div className='relative h-[270px] w-full md:w-[50vw] lg:max-w-[486px]'>
      <Image
        className='rounded-[20px] object-cover'
        src={image || '/images/mock-image.png'}
        alt='review image'
        fill
        quality={85}
        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw'
      />
      {daysLeft !== null && daysLeft <= 7 && (
        <div className='absolute right-0 top-0 flex items-center gap-4 rounded-bl-[12px] rounded-tr-[20px] bg-orange-600 py-2 pl-4 pr-6 text-xs font-medium text-var-white'>
          <IconAlarm width='24' height='24' />
          {daysLeft === 0 ? (
            <span className='text-12 font-semibold'>오늘 {endTime}시 마감</span>
          ) : (
            <span className='text-12 font-semibold'>{daysLeft}일 후 마감</span>
          )}
        </div>
      )}
    </div>
  );
};

export default GatheringImage;
