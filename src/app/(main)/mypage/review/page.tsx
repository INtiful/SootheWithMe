'use client';

import { useUser } from '@/app/(auth)/context/UserContext';
import getJoinedGatherings from '@/app/api/actions/gatherings/getJoinedGathering';
import getReviews from '@/app/api/actions/reviews/getReviews';
import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import Review from '@/app/components/Review/Review';
import { MYPAGE_REVIEW_TABS } from '@/constants/common';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReviewFilterButtons from '../_component/ReviewFilterButtons';
import { DATA_LIST } from '../created/mockData';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>(MYPAGE_REVIEW_TABS.ALL);
  const [cardId, setCardId] = useState<number>(0);

  const { user } = useUser();

  const { data: writableReviewData } = useQuery({
    queryKey: ['writableReviews'],
    queryFn: () => getJoinedGatherings(),
  });

  const { data: reviewData } = useQuery({
    queryKey: ['myreviews'],
    queryFn: () =>
      getReviews({
        userId: Number(user?.id), // user.id 가져와야 함
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
  });

  console.log(typeof user?.id);
  console.log(writableReviewData);
  console.log(reviewData);

  const filteredData = Array.isArray(writableReviewData)
    ? writableReviewData.filter((data) => {
        switch (filterType) {
          case MYPAGE_REVIEW_TABS.WRITABLE: // 작성 가능한 리뷰
            return data?.isCompleted && !data?.isReviewed;
          case MYPAGE_REVIEW_TABS.WRITTEN: // 작성한 리뷰
            return data?.isCompleted && data?.isReviewed;
          default:
            return true;
        }
      })
    : [];

  const handleOpenModal = (id: number) => {
    setCardId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  usePreventScroll(isModalOpen);

  return (
    <>
      <div className='grow pt-16'>
        {/* chips */}
        <ReviewFilterButtons
          filterType={filterType}
          setFilterType={setFilterType}
        />
        {/* cards */}
        {/* 전체 혹은 작성 가능한 리뷰 */}
        {filteredData && filteredData?.length !== 0 ? (
          [MYPAGE_REVIEW_TABS.ALL, MYPAGE_REVIEW_TABS.WRITABLE].includes(
            filterType,
          ) &&
          filteredData?.map((data) => (
            <Card key={data?.id} data={data}>
              <Card.Chips />
              <Card.Info />
              <Card.Button
                handleButtonClick={() => {
                  data.isCompleted && handleOpenModal(data?.id);
                }}
              />
            </Card>
          ))
        ) : (
          <div className='flex h-full items-center justify-center'>
            <p className='text-center text-14 font-medium text-var-gray-500'>
              아직 작성 가능한 리뷰가 없어요
            </p>
          </div>
        )}
        {/* 작성한 리뷰 */}
        <div className='my-24 flex flex-col gap-24'>
          {reviewData?.length === 0 ? (
            <div className='flex h-full items-center justify-center'>
              <p className='text-center text-14 font-medium text-var-gray-500'>
                아직 작성한 리뷰가 없어요
              </p>
            </div>
          ) : (
            filterType === MYPAGE_REVIEW_TABS.WRITTEN &&
            reviewData?.map((review) => (
              <Review
                key={review?.id}
                rating={review?.score}
                image_source={review?.Gathering.image}
                description={review?.comment}
                user_name={review?.User.name}
                date={review?.createdAt}
              />
            ))
          )}
        </div>
      </div>
      {isModalOpen && (
        <ReviewModal gatheringId={cardId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Page;
