'use client';

import { ChangeEvent, useRef } from 'react';
import Button from '../../Button/Button';

interface ImageUploaderProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const ImageUploader = ({ image, setImage }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const [file] = files;
      setImage(file.name);
    }
  };

  return (
    <div className='space-y-12 text-16 font-semibold'>
      <h2>이미지</h2>
      <div>
        <input
          ref={inputRef}
          type='file'
          className='hidden'
          onChange={handleChange}
        />
        <div className='flex gap-12'>
          <div className='flex w-full items-center rounded-xl bg-gray-50 px-16 py-[10px]'>
            {image ?? <p className='text-gray-400'>이미지를 첨부해 주세요</p>}
          </div>
          <div className='w-100'>
            <Button
              name='파일 찾기'
              variant='white'
              onClick={() => inputRef.current?.click()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
