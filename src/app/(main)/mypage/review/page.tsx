'use client';

import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { ChangeEvent, useState } from 'react';
import { DATA_LIST } from '../created/mockData';
import ReviewFilterButtons from '../_component/ReviewFilterButtons';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');

  const filteredData = DATA_LIST.filter((data) => {
    switch (filterType) {
      case '작성 가능한 리뷰':
        return data.isCompleted && !data.isReviewed;
      case '작성한 리뷰':
        return data.isCompleted && data.isReviewed;
      default:
        return true;
    }
  });

  const handleChangeReviewComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewComment(e.target.value);
  };

  const handleCloseModal = () => {
    setReviewComment('');
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
        {filteredData.map((data) => (
          <Card
            key={data.id}
            data={data}
            hasButton={true}
            hasChips={true}
            handleWriteReview={() => setIsModalOpen(true)}
          />
        ))}
      </div>
      {isModalOpen && (
        <ReviewModal
          reviewComment={reviewComment}
          onChangeReviewComment={handleChangeReviewComment}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Page;
