import { Metadata } from 'next';
import Header from './_components/Hearder';
import ClientSideReviews from './_components/ClientSideReviews';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import getReviewScore from '@/app/api/actions/reviews/getReviewScore';

export const metadata: Metadata = {
  title: '모든 리뷰',
  description: 'Soothe With Me 모든 리뷰 페이지입니다.',
};

const ReviewsPage = async () => {
  const reviewList = await getReviewList({ type: 'DALLAEMFIT' });
  const reviewScore = await getReviewScore({ type: 'DALLAEMFIT' });

  return (
    <main className='mx-auto flex h-full max-w-1200 flex-col bg-var-gray-50 px-16 pt-24 md:px-24 md:pt-40 lg:px-100 dark:bg-neutral-900'>
      <Header />

      <ClientSideReviews
        initialReviewList={reviewList}
        initialReviewScore={reviewScore}
      />
    </main>
  );
};

export default ReviewsPage;
