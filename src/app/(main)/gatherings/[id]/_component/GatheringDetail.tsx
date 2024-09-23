'use client';

import BottomFloatingBar from '@/app/components/BottomFloatingBar/BottomFloatingBar';
import GatheringImage from './GatheringImage';
import GatheringInfo from './GatheringInfo';
import GatheringReviews from './GatheringReviews';
import {
  MOCK_PARTICIPANTS,
  MOCK_REVIEWS,
  MOCKUSER,
} from '../../mockData/mockData';
import { useState } from 'react';

const GatheringDetail = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className='mx-auto max-w-[1200px]'>
        <div className='min-h-screen bg-var-gray-50 px-16 pb-60 pt-24 md:px-24 md:pt-40 lg:px-100'>
          {/* 사진, Information Card */}
          <div className='flex flex-col items-center gap-y-16 md:flex md:flex-row md:gap-x-[14px] md:gap-y-0 lg:gap-x-24'>
            <GatheringImage image='/images/mock-image.png' />
            <GatheringInfo
              name='테스트'
              location='건대입구'
              dateTime='2024-09-23T12:00:00.000Z'
              participantCount={1}
              capacity={10}
            />
          </div>

          {/* 리뷰 */}
          <GatheringReviews
            reviews={MOCK_REVIEWS}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <BottomFloatingBar
        user={MOCKUSER}
        createdBy={2024}
        participantCount={1}
        capacity={5}
        registrationEnd='2024'
        canceledAt='2024'
        participantsData={MOCK_PARTICIPANTS}
      />
    </>
  );
};

export default GatheringDetail;
