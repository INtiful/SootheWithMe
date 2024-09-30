'use client';

import postGatherings from '@/app/api/actions/gatherings/postGatherings';
import { LOCATION_OPTIONS } from '@/constants/common';
import { FormEvent, useState } from 'react';
import Button from '../Button/Button';
import BoxSelectGroup from './MakeGatheringModal/BoxSelectGroup';
import Calendar from './MakeGatheringModal/Calendar';
import Header from './MakeGatheringModal/Header';
import ImageUploader from './MakeGatheringModal/ImageUploader';
import PlaceDropdown from './MakeGatheringModal/PlaceDropdown';
import RecruitmentNumber from './MakeGatheringModal/RecruitmentNumber';
import SelectTimeChip from './MakeGatheringModal/SelectTimeChip';
import ModalFrame from './ModalFrame';

interface MakeGatheringModalProps {
  onClose: () => void;
}

const MakeGatheringModal = ({ onClose }: MakeGatheringModalProps) => {
  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [gatheringType, setGatheringType] = useState<Record<string, boolean>>({
    OFFICE_STRETCHING: false,
    MINDFULNESS: false,
    WORKATION: false,
  });
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<number>(0);

  // true인 key 값만 필터링
  const getSelectedGatheringType = () => {
    const selectedGatheringType = String(
      Object.keys(gatheringType).filter((key) => gatheringType[key]),
    );
    return selectedGatheringType;
  };

  // 모든 gatheringType이 false인지 확인
  const isAllGatheringTypeFalse = () => {
    return Object.values(gatheringType).every((value) => value === false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location || !dateTime || !image) {
      return;
    }

    const res = await postGatherings({
      location,
      type: getSelectedGatheringType(),
      dateTime: dateTime.toISOString(),
      capacity,
      image,
    });
    onClose();
    alert('모임이 생성되었습니다.');
    console.log(res);
  };

  return (
    <ModalFrame>
      <form
        onSubmit={handleSubmit}
        className='flex h-full w-full flex-col gap-24 overflow-y-auto rounded-none bg-var-white p-24 md:h-auto md:w-532 md:rounded-xl'
      >
        {/* 헤더 */}
        <Header onClose={onClose} />
        {/* 장소 */}
        <PlaceDropdown
          options={LOCATION_OPTIONS}
          selectedOption={location}
          setSelectedOption={setLocation}
        >
          장소를 선택해주세요
        </PlaceDropdown>
        {/* 이미지 업로더 */}
        <ImageUploader setImage={setImage} />
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
          type='submit'
          variant={
            location &&
            image &&
            !isAllGatheringTypeFalse() &&
            dateTime &&
            selectedTime &&
            capacity >= 5
              ? 'default'
              : 'gray'
          }
        />
      </form>
    </ModalFrame>
  );
};

export default MakeGatheringModal;
