import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import getReviewScore from '@/app/api/actions/reviews/getReviewScore';
import useFilterState from './useFilterState';
import buildParams from './buildParams';
import { ReviewScoreType, ReviewsType } from '@/types/data.type';
import { DEFAULT_OFFSET, LIMIT_PER_REQUEST } from '@/constants/common';

const useReviews = (
  initialReviewsData: ReviewsType[],
  reviewScoreData: ReviewScoreType[],
) => {
  const [score, setScrore] = useState(reviewScoreData);

  const {
    activeTab,
    selectedChip,
    filteringOptions,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useFilterState();

  const getParams = () => {
    const type = selectedChip === 'ALL' ? activeTab : selectedChip;
    return buildParams(type, filteringOptions);
  };

  // 타입이 바뀔 때마다 리뷰 스코어를 다시 가져옴
  useEffect(() => {
    const fetchScores = async () => {
      const type = selectedChip === 'ALL' ? activeTab : selectedChip;
      const newScore = await getReviewScore({ type: type });

      setScrore(newScore);
    };

    fetchScores();
  }, [activeTab, selectedChip]);

  // 무한스크롤
  const {
    data,
    fetchNextPage, // loadMore
    hasNextPage, // hasMore
    isFetchingNextPage, // isLoading
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['reviews', filteringOptions, activeTab, selectedChip],
    queryFn: async ({ pageParam = DEFAULT_OFFSET }) => {
      try {
        const params = getParams();
        const response = await getReviewList({
          limit: LIMIT_PER_REQUEST,
          offset: pageParam,
          ...params,
        });
        return response;
      } catch (error) {
        toast.error('리뷰를 불러오는 중 오류가 발생했습니다');
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === LIMIT_PER_REQUEST
        ? allPages.length * LIMIT_PER_REQUEST
        : undefined;
    },
    initialPageParam: DEFAULT_OFFSET,
    initialData: {
      pages: [initialReviewsData], // 서버에서 가져온 첫 페이지 데이터를 초기값으로 설정
      pageParams: [DEFAULT_OFFSET],
    },
  });

  return {
    filteredData: data.pages,
    score,
    activeTab,
    selectedChip,
    handleTabClick,
    handleChipClick,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
    loadMore: fetchNextPage,
    isLoading: isFetchingNextPage,
    hasMore: hasNextPage,
    isError,
    error,
  };
};

export default useReviews;
