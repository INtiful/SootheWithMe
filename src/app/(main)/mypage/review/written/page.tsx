'use client';

import { useUser } from '@/app/(auth)/context/UserContext';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import Review from '@/app/components/Review/Review';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ReviewFilterButtons from '../../_component/ReviewFilterButtons';

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
    <>
      <div className='grow pt-16'>
        {/* chips */}
        <ReviewFilterButtons />

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
          <EmptyPage />
        )}
      </div>
    </>
  );
};

export default Page;

const EmptyPage = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <p className='text-center text-14 font-medium text-var-gray-500'>
        아직 작성한 리뷰가 없어요
      </p>
    </div>
  );
};
