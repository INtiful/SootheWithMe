'use client';

import { IconHeart, IconX } from '@/public/icons';
import { ChangeEvent } from 'react';
import Button from '../Button/Button';
import InputText from '../Input/InputText';

/**
 * Review Modal
 * @param onCloseClick - 모달을 닫는 함수
 * @param reviewComment - 리뷰 코멘트 값
 * @param onChangeReviewComment - 리뷰 코멘트를 변경하는 함수
 * @param onSubmit - 리뷰를 등록하는 함수
 */

interface ReviewModalProps {
  onCloseClick?: () => void;
  reviewComment: string;
  onChangeReviewComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
}

const TOTAL_RATING = 5;

const ReviewModal = ({
  onCloseClick,
  reviewComment,
  onChangeReviewComment,
  onSubmit,
}: ReviewModalProps) => {
  return (
    <div className='flex max-h-408 w-344 flex-col gap-24 rounded-xl bg-var-white p-24 md:w-520'>
      <div className='flex items-center justify-between'>
        <h1 className='text-18 font-semibold text-var-gray-900'>리뷰 쓰기</h1>
        <button onClick={onCloseClick}>
          <IconX className='h-24 w-24' />
        </button>
      </div>
      <div className='flex flex-col gap-12'>
        <h2 className='text-16 font-semibold'>만족스러운 경험이었나요?</h2>
        <div className='flex gap-[2px]'>
          {Array.from({ length: TOTAL_RATING }).map((_, index) => (
            <IconHeart key={index} className={`h-24 w-24 text-gray-200`} />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-12'>
        <h2 className='text-16 font-semibold'>경험에 대해 남겨주세요.</h2>
        <InputText
          value={reviewComment}
          onChange={onChangeReviewComment}
          className='text-16 min-h-120 bg-var-gray-50 font-medium text-var-gray-900 placeholder-var-gray-400 placeholder:text-balance'
          placeholder='남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.'
        />
      </div>
      <div className='flex items-center gap-16'>
        <Button name='취소' variant='white' />
        <Button name='리뷰 등록' variant='gray' />
      </div>
    </div>
  );
};

export default ReviewModal;
