'use client';

import { useState } from 'react';

import { IconSort } from '@/public/icons';
import DropDown from '../DropDown/DropDown';

interface FilterSortProps {
  state?: 'default' | 'active';
  options: string[];
  children: string;
}

const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

const FilterSort = ({
  state = 'default',
  options,
  children,
}: FilterSortProps) => {
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
        className={`flex h-36 w-36 items-center justify-between rounded-[12px] p-[6px] text-[13px] font-medium md:h-40 md:w-120 md:px-12 md:py-[6px] ${stateClasses[currentState]}`}
        onClick={toggleDropDown}
      >
        <IconSort className='h-24 w-24' />
        <span className='hidden md:mr-8 md:inline'>
          {selectedOption || children}
        </span>
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

export default FilterSort;
