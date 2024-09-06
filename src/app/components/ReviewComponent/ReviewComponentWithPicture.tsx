import Image from 'next/image';

import { IconHeart } from '@/public/icons';
import { Profile } from '@/public/images';

const ReviewComponentWithPicture = () => {
  return (
    <div className='flex-col space-x-6 font-medium md:flex md:flex-row'>
      <div>
        <Image
          className='mx-auto w-full rounded-[24px] p-[10px] md:p-0'
          src='/images/mock-image.png'
          alt='mock'
          width={378}
          height={200}
          quality={85}
        />
      </div>

      <div>
        <div className='mt-[10px] flex md:mt-0'>
          <IconHeart className='h-24 w-24 text-var-orange-600' />
          <IconHeart className='h-24 w-24 text-var-orange-600' />
          <IconHeart className='h-24 w-24 text-var-orange-600' />
          <IconHeart className='h-24 w-24 text-var-orange-600' />
          <IconHeart className='h-24 w-24 text-var-orange-600' />
        </div>

        <div className='mt-[10px] text-[14px] text-black'>
          <div>
            따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데
            이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면
            좋겠어요.
          </div>
        </div>

        <div className='mt-[10px] text-var-gray-700'>
          달램핏 오피스 스트레칭 이용 · 을지로 3가
        </div>

        <div className='mt-8 flex items-center space-x-[8px] divide-x divide-var-gray-700 md:mt-10'>
          <div>
            <div className='flex items-center space-x-[8px]'>
              <Profile className='h-24 w-24' />
              <div className='text-[12px] text-var-gray-700'>럽윈즈올</div>
            </div>
          </div>
          <div className='pl-[12px] text-[12px] text-var-gray-500'>
            2024.01.25
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponentWithPicture;
