import { createQueryKeys } from '@lukemorales/query-key-factory';

export const createdKeys = createQueryKeys('created', {
  all: null,
  detail: (createdBy: string) => ['detail', createdBy],
});
