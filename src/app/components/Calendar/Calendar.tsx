// 커스텀해서 사용할 수 있는 캘린더 컴포넌트
// 커스텀 원하시면 styles/style.css 코드를 참고하시면 됩니다.
'use client';

import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
  dateTime: Date | null;
  setDateTime: (date: Date | null) => void;
  locale?: 'ko' | 'en';
  dateFormat: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm';
  pastDays?: number;
  inline?: boolean;
}
const Calendar = ({
  dateTime,
  setDateTime,
  locale = 'ko',
  dateFormat = 'yyyy-MM-dd',
  pastDays = 0,
  inline = false,
}: CalendarProps) => {
  const datepickerRef = useRef(null);

  // 지난 날 어디까지 선택 가능한지 설정
  const subDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  return (
    <DatePicker
      id='datepicker'
      locale={locale}
      ref={datepickerRef}
      shouldCloseOnSelect
      dateFormat={dateFormat}
      selected={dateTime}
      onChange={(date) => setDateTime(date as Date)}
      minDate={subDays(new Date(), pastDays)}
      inline={inline}
    />
  );
};

export default Calendar;
