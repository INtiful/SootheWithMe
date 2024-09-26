'use client';

import { BtnEdit, ImageProfile, Profile } from '@/public/images';
import { useUser } from '@/app/(auth)/context/UserContext';
import ProfileEditModal from '../Modal/ProfileEditModal';
import { useState } from 'react';
import onChangeProfileImage from './onChangeProfileImage';
import { putProfileData } from '@/app/api/actions/mypage/putProfileData';

const UserProfileLayout = () => {
  const { user, setUser } = useUser();
  const [profileInput, setProfileInput] = useState<string>(
    user?.companyName || '',
  ); // 회사이름 인풋
  const [profileImage, setProfileImage] = useState<File | null>(null); // 서버에 보낼 이미지 파일
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.image || null,
  ); // 이미지 미리보기 상태 추가
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /* 프로필 수정 제충 함수 */
  const onSubmit = async () => {
    const updatedUser = await putProfileData({
      companyName: profileInput,
      profileImage: profileImage,
    });

    if (updatedUser) {
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            companyName: updatedUser.companyName, // 새 회사 이름
            image: updatedUser.image, // 새 이미지 URL
          };
        }
        return prevUser;
      });
      setIsModalOpen(false);
    }
  };
  /* 모달 열기 */
  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  /* 모달 닫기 */
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='relative w-full rounded-[24px] border-2 border-var-gray-200'>
      <div className='flex items-center justify-between rounded-t-[24px] bg-var-orange-400 p-4 px-24 pb-16 pt-[14px]'>
        <div className='text-18 font-semibold text-var-gray-900'>내 프로필</div>
        <ImageProfile className='mx-auto mb-[-26px] h-40 w-156 md:mr-156' />
        <button onClick={onOpenModal}>
          <BtnEdit className='size-32' />
        </button>
      </div>
      {/* 프로필 헤더 밑줄입니다. */}
      <div className='h-8 w-full border-t-2 border-var-orange-600 bg-var-orange-400'></div>
      <div className='rounded-b-[24px] bg-var-white px-92 py-16'>
        {/* 프로필 이미지 */}
        <div className='absolute left-24 top-56 size-56'>
          {user?.image ? (
            <img src={user.image} alt='Profile' className='rounded-full' />
          ) : (
            <Profile />
          )}
        </div>
        {/* 이름 */}
        <div className='text-16 font-semibold text-var-gray-800'>
          {user?.name}
        </div>
        <div className='text-14 font-medium text-var-gray-800'>
          {/* 회사명 */}
          <div>
            company.
            <span className='pl-[6px] font-normal'>{user?.companyName}</span>
          </div>
          {/* 이메일 */}
          <div>
            E-mail. <span className='pl-24 font-normal'>{user?.email}</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 z-popup flex items-center justify-center bg-black bg-opacity-50'>
          <ProfileEditModal
            onCloseClick={onCloseModal}
            onUploadProfileImage={onChangeProfileImage({
              setProfileImage,
              setImagePreview,
            })}
            profileInput={profileInput}
            setProfileInput={setProfileInput}
            imagePreview={imagePreview}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfileLayout;
