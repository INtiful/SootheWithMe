'use client';

import getJoinedGatherings from '@/app/api/actions/gatherings/getJoinedGathering';
import Card from '@/app/components/Card/Card';
import ReviewModal from '@/app/components/Modal/ReviewModal';
import usePreventScroll from '@/hooks/usePreventScroll';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReviewFilterButtons from '../../_component/ReviewFilterButtons';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ['writableReviews'],
    queryFn: () => getJoinedGatherings(),
  });

  const writableReviews = data?.filter((data) => {
    return data?.isCompleted && !data?.isReviewed;
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
        <ReviewFilterButtons />

        {/* cards */}
        {writableReviews?.length ? (
          writableReviews.map((data) => (
            <Card key={data.id} data={data}>
              <Card.Chips />
              <Card.Info />
              <Card.Button
                handleButtonClick={() =>
                  data.isCompleted && handleOpenModal(data.id)
                }
              />
            </Card>
          ))
        ) : (
          <EmptyPage />
        )}
      </div>

      {isModalOpen && (
        <ReviewModal gatheringId={cardId} onClose={handleCloseModal} />
      )}
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
