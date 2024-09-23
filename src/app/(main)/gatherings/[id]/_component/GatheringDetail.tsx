'use client';

import { useState } from 'react';

import BottomFloatingBar from '@/app/components/BottomFloatingBar/BottomFloatingBar';
import GatheringImage from './GatheringImage';
import GatheringInfo from './GatheringInfo';
import GatheringReviews from './GatheringReviews';
import {
  MOCK_PARTICIPANTS,
  MOCK_REVIEWS,
  MOCKUSER,
} from '../../mockData/mockData';
import { GatheringInfoType } from '@/types/data.type';

interface GatheringDetailProps {
  gatheringInfo: GatheringInfoType;
}

const GatheringDetail = ({ gatheringInfo }: GatheringDetailProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log('here');
  console.log(gatheringInfo);

  return (
    <>
      <div className='mx-auto max-w-[1200px]'>
        <div className='min-h-screen bg-var-gray-50 px-16 pb-60 pt-24 md:px-24 md:pt-40 lg:px-100'>
          {/* 사진, Information Card */}
          <div className='flex flex-col items-center gap-y-16 md:flex md:flex-row md:gap-x-[14px] md:gap-y-0 lg:gap-x-24'>
            <GatheringImage image={gatheringInfo.image} />
            <GatheringInfo
              name='테스트'
              location={gatheringInfo.location}
              dateTime={gatheringInfo.dateTime}
              participantCount={gatheringInfo.participantCount}
              capacity={gatheringInfo.capacity}
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
