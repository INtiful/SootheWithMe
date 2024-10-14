// 모든 리뷰 페이지

import {
  FilteringOptionsType,
  GatheringChipsType,
  GatheringTabsType,
} from '@/types/client.type';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const reviewKeys = createQueryKeys('reviews', {
  all: null,
  score: (activeTab: GatheringTabsType, selectedChip: GatheringChipsType) => [
    'score',
    activeTab,
    selectedChip,
  ],
  detail: (
    activeTab: GatheringTabsType,
    selectedChip: GatheringChipsType,
    filteringOptions: FilteringOptionsType,
  ) => ['detail', activeTab, selectedChip, filteringOptions],
});
