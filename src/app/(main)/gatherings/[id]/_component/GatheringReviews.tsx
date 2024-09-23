'use client';

import Pagination from '@/app/components/Pagination/Pagination';
import Review from '@/app/components/Review/Review';
import { MOCK_REVIEWS } from '../../mockData/mockData';

interface GatheringReviewsProps {
  reviews: any;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const REVIEWS_PER_PAGE = 4;

const GatheringReviews = ({
  reviews,
  currentPage,
  handlePageChange,
}: GatheringReviewsProps) => {
  const totalPages = Math.ceil(MOCK_REVIEWS.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = MOCK_REVIEWS.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE,
  );

  return (
    <div className='mt-24 border-t-2 p-24'>
      <div className='text-[18px] font-semibold'>
        이용자들은 이 프로그램을 이렇게 느꼈어요!
      </div>
      <div className='divide-y divide-dashed'>
        {/* 리뷰가 없는 경우 */}
        {/* <div className='flex h-[400px] items-center justify-center'>
                <p className='text-center text-14 font-medium text-var-gray-500'>
                  아직 리뷰가 없어요.
                </p>
              </div> */}

        {/* 리뷰가 있는 경우 */}
        {currentReviews.map((MOCK_REVIEWS, index) => (
          <div key={index} className='pb-16 pt-16'>
            <Review
              rating={MOCK_REVIEWS.rating}
              description={MOCK_REVIEWS.description}
              user_name={MOCK_REVIEWS.user_name}
              date={MOCK_REVIEWS.date}
            />
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {/* TODO: 리뷰가 있는 경우에만 보여주기 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GatheringReviews;
