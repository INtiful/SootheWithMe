'use client';

import { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';
import DatePicker from 'react-datepicker';

interface CalendarModalProps {}

const CalendarModal = () => {
  const datepickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className='flex h-328 w-336 flex-col items-center justify-center gap-12 rounded-xl bg-var-white px-44 py-24'>
      <DatePicker
        id='datepicker'
        locale='ko'
        ref={datepickerRef}
        shouldCloseOnSelect
        dateFormat='yyyy-MM-dd'
        selected={selectedDate} // 선택된 날짜를 ReactDatePicker에 전달
        onChange={(date) => setSelectedDate(date as Date)}
        minDate={new Date()} // 오늘 이전의 날짜 선택 불가능하게 설정
        inline
      />
      {/* TODO: 날짜 선택을 하면 버튼 상태 변경 */}
      <div className='flex gap-[6px]'>
        <div className='w-124'>
          <Button name='초기화' variant='grayOutline' />
        </div>
        <div className='w-124'>
          <Button name='적용' variant='gray' />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
