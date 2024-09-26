'use client';

import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import Review from '@/app/components/Review/Review';
import { MYPAGE_REVIEW_TABS } from '@/constants/common';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useState } from 'react';
import ReviewFilterButtons from '../_component/ReviewFilterButtons';
// TODO: 없애야 할 것들
import { DATA_LIST } from '../created/mockData';
import { MYPAGE_REVIEW_MOCK_DATA } from './mock';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>(MYPAGE_REVIEW_TABS.ALL);
  const [cardId, setCardId] = useState<number>(0);

  const filteredData = DATA_LIST.filter((data) => {
    switch (filterType) {
      case MYPAGE_REVIEW_TABS.WRITABLE: // 작성 가능한 리뷰
        return data?.isCompleted && !data?.isReviewed;
      case MYPAGE_REVIEW_TABS.WRITTEN: // 작성한 리뷰
        return data?.isCompleted && data?.isReviewed;
      default:
        return true;
    }
  });

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
        {filteredData.length === 0 ? (
          <div className='flex h-full items-center justify-center'>
            <p className='text-center text-14 font-medium text-var-gray-500'>
              아직 작성 가능한 리뷰가 없어요
            </p>
          </div>
        ) : (
          [MYPAGE_REVIEW_TABS.ALL, MYPAGE_REVIEW_TABS.WRITABLE].includes(
            filterType,
          ) &&
          filteredData.map((data) => (
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
        )}
        {/* 작성한 리뷰 */}
        <div className='my-24 flex flex-col gap-24'>
          {MYPAGE_REVIEW_MOCK_DATA.length === 0 ? (
            <div className='flex h-full items-center justify-center'>
              <p className='text-center text-14 font-medium text-var-gray-500'>
                아직 작성한 리뷰가 없어요
              </p>
            </div>
          ) : (
            filterType === MYPAGE_REVIEW_TABS.WRITTEN &&
            MYPAGE_REVIEW_MOCK_DATA.map((review) => (
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
