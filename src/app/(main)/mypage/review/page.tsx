'use client';

import Card from '@/app/components/Card/Card';
import { DATA_LIST } from '../created/mockData';
import { useState } from 'react';
import usePreventScroll from '@/hooks/usePreventScroll';
import ReviewModal from '@/app/components/Modal/ReviewModal';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewComment, setReviewComment] = useState<string>('');

  const handleChangeReviewComment = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewComment(e.target.value);
  };

  usePreventScroll(isModalOpen);

  return (
    <>
      <div className='grow'>
        {DATA_LIST.map((data) => (
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
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Page;
