'use client';

import { BtnEditProfile } from '@/public/images';
import { UserData } from '@/types/client.type';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import ModalHeader from './ModalHeader';

/**
 * Profile Edit Modal
 * @param onClose - 모달을 닫는 함수
 * @param onUploadProfileImage - 프로필 이미지를 업로드하는 함수
 * @param onSubmit - 프로필 수정하는 함수
 * @param imagePreview - 프로필 이미지보기 url
 */

interface ProfileEditModalProps {
  user: UserData | null;
  onClose: () => void;
  onUploadProfileImage?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  imagePreview?: string;
  profileInput: string;
  setProfileInput: Dispatch<SetStateAction<string>>;
}

const ProfileEditModal = ({
  user,
  onClose,
  onUploadProfileImage,
  onSubmit,
  imagePreview,
  profileInput,
  setProfileInput,
}: ProfileEditModalProps) => {
  const onChangeProfileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileInput(e.target.value);
  };

  const isValid = profileInput !== user?.companyName && profileInput !== '';

  return (
    <div className='w-342 flex max-h-328 flex-col gap-24 rounded-xl bg-var-white p-24 md:w-520'>
      {/* 헤더 */}
      <ModalHeader title={'프로필 수정하기'} onClose={onClose} />

      {/* 프로필 이미지 변경 */}
      <label htmlFor='profileImage' className='h-56 w-56 cursor-pointer'>
        <div className='relative h-full w-full'>
          {imagePreview ? (
            <Image
              fill
              className='overflow-hidden rounded-full'
              src={imagePreview}
              alt='프로필 미리보기'
            />
          ) : (
            <BtnEditProfile className='h-full w-full' />
          )}
        </div>
        <input
          type='file'
          id='profileImage'
          accept='image/*'
          onChange={onUploadProfileImage}
          className='hidden'
        />
      </label>

      {/* 프로필 이름 변경 */}
      <div className='flex flex-col gap-12'>
        <h2 className='text-16 font-semibold'>회사</h2>
        <Input
          className='h-40 bg-gray-50 text-16 font-medium md:h-44'
          value={profileInput}
          onChange={onChangeProfileInput}
        />
      </div>

      {/* 버튼 그룹 */}
      <div className='flex items-center gap-16'>
        <Button name='취소' onClick={onClose} variant='white' />
        <Button
          name='수정하기'
          onClick={onSubmit}
          type='button'
          variant={`${isValid ? 'default' : 'gray'}`}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

export default ProfileEditModal;
