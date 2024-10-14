// 마이 페이지 - 내가 만든 모임

import { createQueryKeys } from '@lukemorales/query-key-factory';

export const createdKeys = createQueryKeys('created', {
  all: null,
  detail: (createdBy: string) => ({ queryKey: ['detail', createdBy] }),
});
