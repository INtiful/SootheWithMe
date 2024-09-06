'use client';

import { useState } from 'react';

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectStatus(event.target.checked);
  };

  return (
    <div
      className={`h-70 flex w-full items-start gap-8 rounded-lg ${selectStatus ? 'bg-var-gray-900 text-var-white' : 'bg-var-gray-50 text-var-black'} px-8 py-[6px] transition-colors duration-200 ease-in-out md:lg:py-12 md:lg:px-16`}
    >
      <input
        type='checkbox'
        className="h-24 w-24 appearance-none rounded-md bg-[url('/icons/checkbox-default.svg')] bg-center bg-no-repeat checked:bg-[url('/icons/checkbox-active.svg')] checked:bg-center checked:bg-no-repeat"
        onChange={handleCheckboxChange}
      />
      <div className='flex flex-col'>
        <div className='text-[14px] font-bold md:lg:text-[16px]'>{title}</div>
        <div className='text-[12px] font-medium'>{subTitle}</div>
      </div>
    </div>
  );
};

export default BoxSelect;
