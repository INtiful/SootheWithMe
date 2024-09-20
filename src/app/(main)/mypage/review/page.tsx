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
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Page;
