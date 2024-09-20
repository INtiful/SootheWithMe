'use client';

import { useState } from 'react';
import ReviewModal from './components/Modal/ReviewModal';

export default function Home() {
  const [reviewComment, setReviewComment] = useState('');
  return (
    <main className='flex h-screen items-center justify-center'>
      <ReviewModal
        reviewComment={reviewComment}
        onChangeReviewComment={(e: any) => setReviewComment(e.target.value)}
      />
    </main>
  );
}
