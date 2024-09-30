import { useCallback } from 'react';

import {
  GatheringChipsType,
  GatheringFilters,
  GatheringTabsType,
} from '@/types/client.type';

// sorting 시 한글 옵션을 영어로 변환해주는 기능
export const sortOptionsMap: { [key: string]: string } = {
  최신순: 'dateTime',
  '마감 임박': 'registrationEnd',
  '참여 인원 순': 'participantCount',
};

const useHandlers = (
  setActiveTab: (tab: GatheringTabsType) => void,
  setSelectedChip: (chip: GatheringChipsType | null) => void,
  setSelectedLocation: (location: string | undefined) => void,
  setSelectedDate: (date: Date | null) => void,
  setSortOption: (sortBy: string | undefined) => void,
  resetFilters: (filters: GatheringFilters) => void,
  updateFilteredData: (filters: GatheringFilters) => void,
) => {
  const handleTabClick = useCallback(
    (type: GatheringTabsType) => {
      setActiveTab(type);
      setSelectedChip(null);
      resetFilters({ type });
      updateFilteredData({ type });
    },
    [setActiveTab, setSelectedChip, resetFilters, updateFilteredData],
  );

  const handleChipClick = useCallback(
    (label: GatheringChipsType) => {
      setSelectedChip(label);
      const type = label === 'ALL' ? 'DALLAEMFIT' : label;
      resetFilters({ type });
      updateFilteredData({ type });
    },
    [setSelectedChip, resetFilters, updateFilteredData],
  );

  const handleLocationChange = useCallback(
    (location: string | undefined) => {
      setSelectedLocation(location);
      resetFilters({ location });
      updateFilteredData({ location });
    },
    [setSelectedLocation, resetFilters, updateFilteredData],
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
      resetFilters({ date });
      updateFilteredData({ date });
    },
    [setSelectedDate, resetFilters, updateFilteredData],
  );

  const handleSortChange = useCallback(
    (option: string | undefined) => {
      const sortBy = option ? sortOptionsMap[option] : undefined;
      setSortOption(sortBy);
      resetFilters({ sortBy });
      updateFilteredData({ sortBy });
    },
    [setSortOption, resetFilters, updateFilteredData],
  );

  return {
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  };
};

export default useHandlers;
