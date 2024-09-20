import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

interface InfiniteQueryResponse<T> {
  hasNextPage: boolean;
  offset: number;
  data: T[];
}

interface useInfiniteScroll<T> {
  queryKey: string[];
  queryFn: (offset?: number) => Promise<InfiniteQueryResponse<T>>;
  limit?: number;
}

const useInfiniteScroll = <T,>({
  queryKey,
  queryFn,
  limit = 5,
}: useInfiniteScroll<T>) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const { data, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 0 }) => queryFn(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.offset + limit : undefined;
      },
      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return { ref, data, isError, isLoading };
};

export default useInfiniteScroll;
