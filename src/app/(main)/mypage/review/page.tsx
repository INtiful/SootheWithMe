'use client';

import Card from '@/app/components/Card/Card';
import Chip from '@/app/components/Chip/Chip';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useState } from 'react';
import { DATA_LIST } from '../created/mockData';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewComment, setReviewComment] = useState<string>('');

  const filterTypeList = ['작성 가능한 리뷰', '작성한 리뷰'] as const;
  const [filterType, setFilterType] = useState<(typeof filterTypeList)[number]>(
    filterTypeList[0],
  );

  const handleChangeReviewComment = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewComment(e.target.value);
  };

  const handleChangeFilterType = (type: (typeof filterTypeList)[number]) => {
    setFilterType(type);
  };

  usePreventScroll(isModalOpen);

  return (
    <>
      <div className='grow pt-16'>
        {/* chips */}
        <div className='flex items-center gap-8'>
          <button
            onClick={() => handleChangeFilterType('작성 가능한 리뷰')}
            className='transition-all duration-200 ease-in-out'
          >
            <Chip
              state={filterType === '작성 가능한 리뷰' ? 'active' : 'default'}
            >
              작성 가능한 리뷰
            </Chip>
          </button>
          <button
            onClick={() => handleChangeFilterType('작성한 리뷰')}
            className='transition-all duration-200 ease-in-out'
          >
            <Chip state={filterType === '작성한 리뷰' ? 'active' : 'default'}>
              작성한 리뷰
            </Chip>
          </button>
        </div>
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
