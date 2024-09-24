import FilterList from '@/app/components/Filter/FilterList';
import FilterSort from '@/app/components/Filter/FilterSort';

import { OPTIONS, SORT_OPTIONS } from '../mockData/mockData';
import FilterDate from '@/app/components/Filter/FilterDate';

interface FiltersProps {
  onLocationChange: (location: string | undefined) => void;
  onDateChange: (date: Date | null) => void;
}

const Filters = ({ onLocationChange, onDateChange }: FiltersProps) => {
  const handleLocationSelect = (selectedOption: string | undefined) => {
    onLocationChange(selectedOption);
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
        <FilterSort state='default' options={SORT_OPTIONS}>
          마감임박
        </FilterSort>
      </div>
    </div>
  );
};

export default Filters;
