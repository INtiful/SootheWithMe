'use client';

import Chip from '@/app/components/Chip/Chip';
import { useState } from 'react';

const ReviewFilterButtons = () => {
  const filterTypeList = ['작성 가능한 리뷰', '작성한 리뷰'] as const;
  const [filterType, setFilterType] = useState<(typeof filterTypeList)[number]>(
    filterTypeList[0],
  );

  const handleChangeFilterType = (type: (typeof filterTypeList)[number]) => {
    setFilterType(type);
  };

  return (
    <div className='flex items-center gap-8'>
      <button
        onClick={() => handleChangeFilterType('작성 가능한 리뷰')}
        className='transition-all duration-200 ease-in-out'
      >
        <Chip state={filterType === '작성 가능한 리뷰' ? 'active' : 'default'}>
          작성 가능한 리뷰
        </Chip>
      </button>
      <button
        onClick={() => handleChangeFilterType('작성한 리뷰')}
        className='transition-all duration-200 ease-in-out'
      >
        <Chip state={filterType === '작성한 리뷰' ? 'active' : 'default'}>
          작성한 리뷰
        </Chip>
      </button>
    </div>
  );
};

export default ReviewFilterButtons;
