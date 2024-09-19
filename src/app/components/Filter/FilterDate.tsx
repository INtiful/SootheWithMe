import { useEffect, useRef, useState } from 'react';
import { IconCaret } from '@/public/icons';
import CalendarModal from '../Modal/CalendarModal';

const stateClasses = {
  default: 'border border-var-gray-100 bg-var-gray-50 text-var-gray-800',
  active: 'text-var-gray-50 bg-var-gray-900',
};

interface FilterDateProps {
  state?: 'default' | 'active';
  children: string;
}

const FilterDate = ({ state = 'default', children }: FilterDateProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<'default' | 'active'>(state);

  const containerRef = useRef<HTMLDivElement>(null);

  // TODO : 적용 버튼 클릭 시 핸들러를 CalendarModal로 전달
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsOpen(false);
    setCurrentState('active');
  };

  // TODO : 초기화 버튼 클릭 시 핸들러를 CalendarModal로 전달
  const handleDateReset = () => {
    setSelectedDate(null);
    setIsOpen(false);
    setCurrentState('default');
  };

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  // 외부 클릭 시 드롭다운 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={containerRef}>
      <div
        className={`flex h-36 w-[110px] cursor-pointer items-center justify-between rounded-[12px] py-[6px] pl-12 pr-8 text-14 font-medium md:h-40 md:w-120 md:py-8 ${stateClasses[currentState]}`}
        onClick={toggleDropDown}
        data-testid='filterList'
      >
        {selectedDate || children}
        <IconCaret className='h-24 w-24' />
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 mt-4 h-auto w-full min-w-max overflow-y-auto rounded-xl bg-var-gray-50 ring-2 ring-var-gray-400`}
        >
          <CalendarModal />
        </div>
      )}
    </div>
  );
};

export default FilterDate;
