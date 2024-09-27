import { useState } from 'react';

import getGatherings from '@/app/api/actions/gatherings/getGatherings';
import { formatCalendarDate } from '@/utils/formatDate';
import { GatheringsListData, ReviewsType } from '@/types/data.type';
import { GatheringChipsType, GatheringTabsType } from '@/types/client.type';
import getReviewList from '@/app/actions/reviews/getReviewList';
import fetchReviews from '@/app/api/actions/reviews/fetchReviews';

// sorting 시 한글 옵션을 영어로 변환해주는 기능
export const sortOptionsMap: { [key: string]: string } = {
  최신순: 'dateTime',
  '마감 임박': 'registrationEnd',
  '참여 인원 순': 'participantCount',
};

const useReviews = (initialReviewsData: ReviewsType[]) => {
  // 모임 종류에 따른 탭 상태
  const [activeTab, setActiveTab] = useState<GatheringTabsType>('DALLAEMFIT');

  // 리뷰 데이터 리스트
  const [filteredData, setFilteredData] =
    useState<ReviewsType[]>(initialReviewsData);

  // 지역 선택 필터링 상태
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );

  // 달램핏의 하위 종류 탭 상태
  const [selectedChip, setSelectedChip] = useState<GatheringChipsType>('ALL');

  // 날짜 선택 필터링
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 정렬 필터링
  const [sortOption, setSortOption] = useState<string | undefined>();

  // 모임 종류 탭 클릭 이벤트 핸들러
  const handleTabClick = async (type: GatheringTabsType) => {
    setActiveTab(type);
    setSelectedChip('ALL'); // 탭 변경 시 하위 종류 탭 초기화

    if (type === 'WORKATION') {
      const newData = initialReviewsData.filter(
        (data) => data.Gathering.type === type,
      );
      setFilteredData(newData);
    } else {
      const newData = initialReviewsData.filter(
        (data) => data.Gathering.type !== 'WORKATION',
      );
      setFilteredData(newData);
    }

    // 기존 데이터를 필터링
  };

  // 달램핏 세부 종류 탭 클릭 이벤트 핸들러
  const handleChipClick = async (label: GatheringChipsType) => {
    setSelectedChip(label);

    if (label === 'ALL') {
      const newData = initialReviewsData.filter(
        (data) => data.Gathering.type !== 'WORKATION',
      );
      setFilteredData(newData);
    } else {
      const newData = initialReviewsData.filter(
        (data) => data.Gathering.type === label,
      );
      setFilteredData(newData);
    }
  };

  // 지역 선택 필터링 이벤트 핸들러
  const handleLocationChange = async (location: string | undefined) => {
    setSelectedLocation(location);

    //TODO : 선택되어 있는 탭을 고려한 지역 필터링
  };

  const handleDateChange = async (date: Date | null) => {
    setSelectedDate(date);
    //TODO : 선택되어 있는 탭을 고려한 날짜 필터링
  };

  const handleSortChange = async (option: string | undefined) => {
    setSortOption(option);

    // TODO : 선택되어 있는 탭을 고려한 정렬 필터링
  };

  return {
    filteredData,
    activeTab,
    selectedChip,
    selectedLocation,
    selectedDate,
    sortOption,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  };
};

export default useReviews;
