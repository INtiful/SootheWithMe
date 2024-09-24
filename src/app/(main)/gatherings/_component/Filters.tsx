import FilterList from '@/app/components/Filter/FilterList';
import FilterSort from '@/app/components/Filter/FilterSort';
import FilterDate from '@/app/components/Filter/FilterDate';

import { OPTIONS, SORT_OPTIONS } from '../mockData/mockData';

interface FiltersProps {
  onLocationChange: (location: string | undefined) => void;
  onDateChange: (date: Date | null) => void;
  onSortChange: (sortOption: string) => void;
}

const Filters = ({
  onLocationChange,
  onDateChange,
  onSortChange,
}: FiltersProps) => {
  const handleLocationSelect = (selectedOption: string | undefined) => {
    onLocationChange(selectedOption);
  };

  const handleSortSelect = (sortOption: string) => {
    onSortChange(sortOption);
  };

  return (
    <div className='flex justify-between pt-16'>
      <div className='flex space-x-8'>
        <FilterList
          state='default'
          options={OPTIONS}
          onSelect={handleLocationSelect}
        >
          지역 전체
        </FilterList>
        <FilterDate state='default' onSelectDate={onDateChange}>
          날짜 전체
        </FilterDate>
      </div>
      <div>
        <FilterSort
          state='default'
          options={SORT_OPTIONS}
          onSelect={handleSortSelect}
        >
          필터
        </FilterSort>
      </div>
    </div>
  );
};

export default Filters;
