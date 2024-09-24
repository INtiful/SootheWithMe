'use client';

import { useState } from 'react';
import BoxSelect from './BoxSelect';

const BoxSelectGroup = () => {
  const [gatheringType, setGatheringType] = useState<Record<string, boolean>>({
    OFFICE_STRETCHING: false,
    MINDFULLNESS: false,
    WORKATION: false,
  });

  const handleCheckboxChange = (type: string) => {
    setGatheringType((prevType) => ({
      ...prevType,
      [type]: !prevType[type],
    }));
  };

  return (
    <div className='flex gap-12'>
      <BoxSelect
        title='달램핏'
        subTitle='오피스 트레이닝'
        isSelected={gatheringType.OFFICE_STRETCHING}
        onChange={() => handleCheckboxChange('OFFICE_STRETCHING')}
      />
      <BoxSelect
        title='달램핏'
        subTitle='마인드풀니스'
        isSelected={gatheringType.MINDFULLNESS}
        onChange={() => handleCheckboxChange('MINDFULLNESS')}
      />
      <BoxSelect
        title='워케이션'
        isSelected={gatheringType.WORKATION}
        onChange={() => handleCheckboxChange('WORKATION')}
      />
    </div>
  );
};

export default BoxSelectGroup;
