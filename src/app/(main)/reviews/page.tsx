import Header from './_components/Hearder';
import getReviewList from '@/app/actions/reviews/getReviewList';
import getReviewScore from '@/app/actions/reviews/getReviewScore';
import ClientSideReviews from './_components/ClientSideReviews';
import { REVIEW_MOCK_DATA } from './mockData';

const ReviewsPage = async () => {
  // Server side data fetching 최초 10개
  const reviewList = await getReviewList();

  // 전체 리뷰 스코어
  const reviewScore = await getReviewScore({ type: 'DALLAEMFIT' });

  return (
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100'>
      <Header />

      <ClientSideReviews
        reviewListData={REVIEW_MOCK_DATA}
        reviewScoreData={reviewScore}
      />
    </main>
  );
};

export default ReviewsPage;
