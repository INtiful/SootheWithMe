// 개설 확정은 참여 인원수가 최소 인원 수(5명)을 충족한 경우 자동 확정 처리됩니다.
// Progress bar(참여 인원수) 처음 렌더링 시 숫자가 올라가면서 바가 채워지도록 합니다. (애니메이션)
'use client';

import { IconArrow } from '@/public/icons';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className='flex w-full items-end gap-24 border border-solid'>
      <div className='flex h-4 w-full rounded-md bg-var-orange-100'>
        <div
          className='h-full bg-var-orange-600 transition-all ease-in-out'
          style={{ width: `${(progress / 20) * 100}%` }}
        ></div>
      </div>
      <div className='flex w-full items-center gap-8 text-[16px] font-semibold text-var-orange-600'>
        join now
        <IconArrow className='h-[18px] w-[18px]' />
      </div>
    </div>
  );
};

export default ProgressBar;
