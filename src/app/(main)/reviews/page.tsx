import { useState } from 'react';
import {
  LOCATION_OPTIONS,
  REVIEW_MOCK_DATA,
  REVIEW_SCORE_MOCK_DATA,
  SORT_OPTIONS,
  tempData,
} from './mockData';
import Scores from './_components/ReviewScore/Scores';
import AverageRating from './_components/ReviewScore/AverageRating';
import Header from './_components/Hearder';
import ReviewFilters from './_components/ReviewFilters';
import ReviewList from './_components/ReviewList';
import getReviewList from '@/app/actions/reviews/getReviewList';
import Filter from '@/app/components/Filter/Filter';
import FilterDate from '@/app/components/Filter/FilterDate';
import getReviewScore from '@/app/actions/reviews/getReviewScore';
import ReviewScore from './_components/ReviewScore/ReviewScore';

// > 다른 유저가 작성한 리뷰 점수와 내용을 확인할 수 있습니다.
// >
// - 전체 평균 평점 정보: 원하는 모임 종류(달램핏, 워케이션)에 대해 다른 유저가 남긴 전체 평균 평점 및 평점별 리뷰 수를 확인할 수 있습니다.
// - 개별 리뷰 목록: 개별 유저가 남긴 리뷰 및 유저 정보를 확인할 수 있습니다.
//     - 원하는 지역, 날짜 필터링 및 최신순, 리뷰 높은 순, 참여 인원 순으로 정렬할 수 있습니다.
//     - Server Side Rendering 이후 Client Side에서 무한 스크롤을 통해 리뷰 목록을 추가로 Fetching 합니다.

const ReviewsPage = async () => {
  // Server side data fetching 최초 10개, type=dalaemfit
  let reviewList = await getReviewList();

  // 전체 리뷰 스코어
  let reviewScore = await getReviewScore({ type: 'DALLAEMFIT' });

  return (
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100'>
      <Header />

      <section className='mt-24 flex grow flex-col md:mt-32'>
        {/* filter */}
        <ReviewFilters />

        <div className='mb-16 w-full border-y border-var-gray-200' />
        {/* 별점칸 */}
        <ReviewScore initialScore={reviewScore} />

        {/* 데이터 */}
        <div className='mt-24 flex grow flex-col border-t-2 border-t-var-gray-900 bg-white p-24'>
          <div className='mb-24 flex items-center justify-between'>
            <div className='flex gap-8'>
              <Filter state='default' type='list' options={LOCATION_OPTIONS}>
                지역 선택
              </Filter>
              <FilterDate state='default'>날짜 선택</FilterDate>
            </div>
            <div>
              <Filter state='default' type='sort' options={SORT_OPTIONS}>
                정렬
              </Filter>
            </div>
          </div>
          {reviewList.length > 0 ? (
            <ReviewList reviewList={reviewList} />
          ) : (
            <div className='flex grow items-center justify-center text-14 font-medium text-var-gray-500'>
              아직 리뷰가 없어요
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ReviewsPage;
