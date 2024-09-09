'use client';

import { ChangeEvent, useState } from 'react';
import ReviewModal from './components/Modal/ReviewModal';

export default function Home() {
  const [reviewComment, setReviewComment] = useState('');

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewComment(e.target.value);
  };

  return (
    <main className='flex h-dvh w-dvw items-center justify-center'>
      {/* <ProfileEditModal /> */}
      <ReviewModal
        reviewComment={reviewComment}
        onChangeReviewComment={onChange}
      />
    </main>
  );
}
