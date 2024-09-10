'use client';

import { ChangeEvent, useState } from 'react';
import ExitPopup from './components/Popup/ExitPopup';

export default function Home() {
  const [reviewComment, setReviewComment] = useState('');

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewComment(e.target.value);
  };

  return (
    <main className='flex h-dvh w-dvw items-center justify-center gap-20'>
      {/* <ProfileEditModal /> */}
      {/* <ReviewModal
        reviewComment={reviewComment}
        onChangeReviewComment={onChange}
      /> */}
      <ExitPopup
        hasCancelButton={true}
        onClickClosePopup={() => console.log('')}
      />
      <ExitPopup
        hasCancelButton={false}
        onClickClosePopup={() => console.log('')}
      />
    </main>
  );
}
