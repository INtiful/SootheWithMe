'use client';

import Chip from '@/app/components/Chip/Chip';
import { useState } from 'react';

interface ReviewFilterButtonsProps {
  filterType: string;
  setFilterType: (type: string) => void;
}

const ReviewFilterButtons = ({
  filterType,
  setFilterType,
}: ReviewFilterButtonsProps) => {
  const filterTypeList = ['작성 가능한 리뷰', '작성한 리뷰'] as const;

  const handleChangeFilterType = (type: (typeof filterTypeList)[number]) => {
    if (filterType === type) {
      setFilterType('');
    } else {
      setFilterType(type);
    }
  };

  return (
    <div className='flex items-center gap-8'>
      <button
        onClick={() => handleChangeFilterType(filterTypeList[0])}
        className='transition-all duration-200 ease-in-out'
      >
        <Chip state={filterType === filterTypeList[0] ? 'active' : 'default'}>
          {filterTypeList[0]}
        </Chip>
      </button>
      <button
        onClick={() => handleChangeFilterType(filterTypeList[1])}
        className='transition-all duration-200 ease-in-out'
      >
        <Chip state={filterType === filterTypeList[1] ? 'active' : 'default'}>
          {filterTypeList[1]}
        </Chip>
      </button>
    </div>
  );
};

export default ReviewFilterButtons;
