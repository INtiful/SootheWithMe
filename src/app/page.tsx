'use client';

import { ChangeEvent, useState } from 'react';
import Popup from './components/Popup/Popup';
import CalendarModal from './components/Modal/CalendarModal';
import MakeGatheringModal from './components/Modal/MakeGatheringModal';

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
      {/* <Popup
        type='exit'
        hasCancelButton={true}
        onClickClosePopup={() => console.log('')}
      />
      <Popup
        type='exit'
        hasCancelButton={false}
        onClickClosePopup={() => console.log('')}
      />
      <Popup
        type='signUpCompleted'
        hasCancelButton={true}
        onClickClosePopup={() => console.log('')}
      />
      <Popup
        type='signUpCompleted'
        hasCancelButton={false}
        onClickClosePopup={() => console.log('')}
      /> */}
      <CalendarModal />
      <MakeGatheringModal onCloseClick={() => console.log('')} />
    </main>
  );
}
