'use client';

import { useUser } from '@/app/(auth)/context/UserContext';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import Review from '@/app/components/Review/Review';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import EmptyReviewPage from '../../_component/EmptyReviewPage';
import ReviewFilterTab from '../../_component/ReviewFilterTab';

const Page = () => {
  const { user } = useUser();

  const { data: writtenReviews } = useQuery({
    queryKey: ['myreviews'],
    queryFn: () =>
      getReviewList({
        userId: Number(user?.id),
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
  });

  return (
    <div className='grow pt-16'>
      {/* tab */}
      <ReviewFilterTab />

      {/* cards */}
      {writtenReviews?.length ? (
        <div className='my-24 flex flex-col gap-24'>
          {writtenReviews.map((review) => (
            <Link href={`/gatherings/${review.Gathering.id}`} key={review.id}>
              <Review
                key={review.id}
                rating={review.score}
                image_source={review.Gathering.image}
                description={review.comment}
                user_name={review.User.name}
                date={review.createdAt}
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyReviewPage />
      )}
    </div>
  );
};

export default Page;
