'use client';

import postGatherings from '@/app/api/gatherings/postGatherings';
import { MouseEvent, useRef, useState } from 'react';
import { MOCK_DROPDOWN_OPTIONS } from '../BottomFloatingBar/Mock';
import Button from '../Button/Button';
import ImageUploader from './MakeGatheringModal/ImageUploader';
import PlaceDropdown from './MakeGatheringModal/PlaceDropdown';
import SelectTimeChip from './MakeGatheringModal/SelectTimeChip';
import ModalFrame from './ModalFrame';
import BoxSelectGroup from './MakeGatheringModal/BoxSelectGroup';
import Header from './MakeGatheringModal/Header';
import Calendar from './MakeGatheringModal/Calendar';
import RecruitmentNumber from './MakeGatheringModal/RecruitmentNumber';

interface MakeGatheringModalProps {
  onClose: () => void;
}

const MakeGatheringModal = ({ onClose }: MakeGatheringModalProps) => {
  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<null | string>(null);
  const [gatheringType, setGatheringType] = useState<Record<string, boolean>>({
    OFFICE_STRETCHING: false,
    MINDFULLNESS: false,
    WORKATION: false,
  });
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);

  const getSelectedGatheringType = () => {
    const selectedGatheringType = String(
      Object.keys(gatheringType).filter((key) => gatheringType[key]),
    ); // true인 key 값만 필터링
    return selectedGatheringType;
  };

  const handleSubmit = () => {
    postGatherings(
      location as string,
      getSelectedGatheringType() as string,
      dateTime?.toISOString() as string,
      capacity as number,
      image as string,
      new Date().toISOString(),
    );
    onClose();
  };

  return (
    <ModalFrame onClose={onClose}>
      <div
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className='flex h-full w-full flex-col gap-24 overflow-y-auto rounded-none bg-var-white p-24 md:h-auto md:w-532 md:rounded-xl'
      >
        {/* 헤더 */}
        <Header onClose={onClose} />
        {/* 장소 */}
        <PlaceDropdown
          options={MOCK_DROPDOWN_OPTIONS}
          selectedOption={location}
          setSelectedOption={setLocation}
        >
          장소를 선택해주세요
        </PlaceDropdown>
        <ImageUploader image={image} setImage={setImage} />
        {/* 선택 서비스 */}
        <BoxSelectGroup
          gatheringType={gatheringType}
          setGatheringType={setGatheringType}
        />
        {/* 날짜 */}
        <Calendar dateTime={dateTime} setDateTime={setDateTime} />
        {/* 시간 */}
        <SelectTimeChip
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        {/* 모집 정원 */}
        <RecruitmentNumber setCapacity={setCapacity} />
        {/* 확인 버튼 */}
        <Button
          name='확인'
          variant={
            location && image && dateTime && selectedTime && capacity
              ? 'default'
              : 'gray'
          }
          onClick={handleSubmit}
        />
      </div>
    </ModalFrame>
  );
};

export default MakeGatheringModal;
