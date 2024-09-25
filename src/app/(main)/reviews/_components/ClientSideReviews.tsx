// TODO : 무한 스크롤로 추가 데이터 Fetching
// TODO : 필터 옵션에 따른 데이터 필터링

'use client';

import ReviewList from './ReviewList';
import ReviewScore from './ReviewScore/ReviewScore';
import { ReviewScoreType, ReviewsType } from '@/types/data.type';
import useReviews from '@/hooks/useReveiws';
import Tabs from '@/app/components/Tabs/Tabs';
import Chips from './Chips';
import Filters from '../../gatherings/_component/Filters';
import { useEffect } from 'react';

interface ClientSideReviewsProps {
  reviewListData: ReviewsType[];
  reviewScoreData: ReviewScoreType[];
}

const ClientSideReviews = ({
  reviewListData,
  reviewScoreData,
}: ClientSideReviewsProps) => {
  const {
    filteredData,
    activeTab,
    selectedChip,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useReviews(reviewListData);

  // 최초 렌더링 시 handleTabClick 실행하여 달램핏으로 데이터 필터링
  useEffect(() => {
    handleTabClick('DALLAEMFIT');
  }, []);

  return (
    <section className='mt-24 flex grow flex-col md:mt-32'>
      <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
      <Chips
        activeTab={activeTab}
        activeChip={selectedChip}
        onChipClick={handleChipClick}
      />

      <div className='mb-16 w-full border-y border-var-gray-200' />

      {/* 별점칸 */}
      <ReviewScore initialScore={reviewScoreData} />

      <div className='mt-24 flex grow flex-col border-t-2 border-t-var-gray-900 bg-white p-24 pt-8'>
        <Filters
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
          onSortChange={handleSortChange}
        />

        {filteredData.length > 0 ? (
          <ReviewList reviewList={filteredData} />
        ) : (
          <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
            아직 리뷰가 없어요
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientSideReviews;
