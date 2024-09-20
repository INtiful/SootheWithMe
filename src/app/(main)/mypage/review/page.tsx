'use client';

import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useState } from 'react';
import { DATA_LIST } from '../created/mockData';
import ReviewFilterButtons from '../_component/ReviewFilterButtons';

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
      <div className='grow pt-16'>
        {/* chips */}
        <ReviewFilterButtons />
        {/* cards */}
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
