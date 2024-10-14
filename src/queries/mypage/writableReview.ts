// 마이페이지 - 나의 리뷰 - 작성 가능한 리뷰

import { createQueryKeys } from '@lukemorales/query-key-factory';

export const writableReviewKeys = createQueryKeys('reviews', {
  all: null,
  writable: () => ({ queryKey: ['writable'] }),
});
