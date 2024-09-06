import Image from 'next/image';

import { IconHeart } from '@/public/icons';
import { Profile } from '@/public/images';

interface ReviewProps {
  image_source?: string;
  rating: number;
  description: string;
  place?: string;
  location?: string;
  user_name: string;
  date: string;
}

const TOTAL_RATING = 5;

const Review = ({
  image_source,
  rating,
  description,
  place,
  location,
  user_name,
  date,
}: ReviewProps) => {
  return (
    <div className='flex-col space-x-6 p-[10px] font-medium md:flex md:flex-row'>
      {image_source ? (
        <div>
          <Image
            className='mx-auto w-full rounded-[24px] p-[10px] md:p-0'
            src={image_source}
            alt='review image'
            width={378}
            height={200}
            quality={85}
          />
        </div>
      ) : null}

      <div>
        <div className='mt-[10px] flex md:mt-0'>
          {Array.from({ length: TOTAL_RATING }).map((_, index) => (
            <IconHeart
              key={index}
              className={`h-24 w-24 ${
                index < rating ? 'text-var-orange-600' : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        <div className='mt-[10px] text-[14px] text-black'>
          <div>{description}</div>
        </div>

        <div className='mt-[10px] text-var-gray-700'>
          {place} 이용 · {location}
        </div>

        <div className='mt-8 flex items-center space-x-[8px] divide-x divide-var-gray-700 md:mt-10'>
          <div>
            <div className='flex items-center space-x-[8px]'>
              <Profile className='h-24 w-24' />
              <div className='text-[12px] text-var-gray-700'>{user_name}</div>
            </div>
          </div>
          <div className='pl-[12px] text-[12px] text-var-gray-500'>{date}</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
