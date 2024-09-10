import { useState } from 'react';

import { IconCaret } from '@/public/icons';
import DropDown from '../DropDown/DropDown';

interface FilterListProps {
  state?: 'default' | 'active';
  children: string;
  options?: string[];
}

const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

const FilterList = ({
  state = 'default',
  children,
  options = [],
}: FilterListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<'default' | 'active'>(state);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setCurrentState('active');
  };

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='relative'>
      <div
        className={`flex h-36 w-[110px] items-center justify-between rounded-[12px] py-[6px] pl-12 pr-8 text-14 font-medium md:h-40 md:w-120 md:py-8 ${stateClasses[currentState]}`}
        onClick={toggleDropDown}
      >
        {selectedOption || children}
        <IconCaret className='h-24 w-24' />
      </div>

      {isOpen && (
        <DropDown
          options={options}
          onSelect={handleOptionSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FilterList;
