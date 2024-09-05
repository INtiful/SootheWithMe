'use client';

import { useState, useRef, useEffect } from 'react';

// mock data
const OPTIONS = [
  '건대입구',
  '을지로 3가',
  '신림',
  '홍대입구',
  '시청',
  '신대방',
  '서울대입구',
];

interface DropDownProps {
  options?: string[];
  placeholder?: string;
}

const DropDown = ({
  options = OPTIONS,
  placeholder = '위치를 입력하세요.',
}: DropDownProps) => {
  const [inputText, setInputText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const filteredOptions =
    inputText === ''
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(inputText.toLowerCase()),
        );

  const handleSelect = (option: string) => {
    setIsOpen(false);
    setInputText(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    setInputText(e.target.value);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
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
    <div
      className='relative w-full font-pretendard text-[14px] font-medium md:text-[16px]'
      ref={dropDownRef}
    >
      <input
        type='text'
        className='w-full rounded-xl px-12 py-12 text-var-black focus:outline-none md:px-16'
        placeholder={placeholder}
        value={inputText}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul className='absolute max-h-240 w-full overflow-y-auto rounded-xl border bg-var-white'>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className='cursor-pointer px-12 py-12 text-var-black hover:bg-var-orange-100 md:px-16'
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filteredOptions.length === 0 && (
        <div className='absolute w-full rounded-xl bg-var-white px-12 py-12 text-var-black md:px-16'>
          일치하는 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default DropDown;
