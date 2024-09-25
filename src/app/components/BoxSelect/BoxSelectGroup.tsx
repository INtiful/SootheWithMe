'use client';

import BoxSelect from './BoxSelect';

interface GatheringType {
  [key: string]: boolean;
}

interface BoxSelectGroupProps {
  gatheringType: GatheringType;
  setGatheringType: (type: (prevType: GatheringType) => GatheringType) => void;
}

const BoxSelectGroup = ({
  gatheringType,
  setGatheringType,
}: BoxSelectGroupProps) => {
  const handleCheckboxChange = (type: string) => {
    setGatheringType((prevType: GatheringType) => ({
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
