'use client';

import { ChangeEvent, useState } from 'react';

/**
 * BoxSelect component
 * @param {string} title - 제목
 *  @param {string} subTitle - 부제목
 */

interface BoxSelectProps {
  title: string;
  subTitle: string;
}

const BoxSelect = ({ title = '', subTitle = '' }: BoxSelectProps) => {
  const [selectStatus, setSelectStatus] = useState<boolean>(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectStatus(event.target.checked);
  };

  return (
    <label
      className={`flex h-76 w-full items-start gap-8 rounded-lg ${selectStatus ? 'bg-var-gray-900 text-var-white' : 'bg-var-gray-50 text-var-black'} md:h-70 lg:h-70 px-8 py-[6px] transition-colors duration-200 ease-in-out md:px-16 md:py-12 lg:px-16 lg:py-12`}
    >
      <input
        id='checkbox'
        type='checkbox'
        className="h-24 w-24 appearance-none rounded-md bg-[url('/icons/checkbox-default.svg')] bg-center bg-no-repeat checked:bg-[url('/icons/checkbox-active.svg')] checked:bg-center checked:bg-no-repeat"
        onChange={handleCheckboxChange}
      />
      <div className='flex flex-col'>
        <div className='text-[14px] font-bold md:text-[16px] lg:text-[16px]'>
          {title}
        </div>
        <div className='text-[12px] font-medium'>{subTitle}</div>
      </div>
    </label>
  );
};

export default BoxSelect;
