import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '@/constants/common';
import Loader from '../Loader/Loader';
interface ItemWithId {
  id: number;
}

interface InfiniteQueryResponse<T extends ItemWithId> {
  hasNextPage: boolean;
  offset: number;
  data: T[];
}

interface InfiniteScrollProps<T extends ItemWithId> {
  initData: T[];
  queryKey: string[];
  queryFn: (offset?: number) => Promise<InfiniteQueryResponse<T>>;
  limit?: number;
  emptyText: string;
  renderItem: (item: T, index: number) => JSX.Element;
}

const InfiniteScroll = <T extends ItemWithId>({
  initData,
  queryKey,
  queryFn,
  limit = DEFAULT_LIMIT,
  emptyText,
  renderItem,
}: InfiniteScrollProps<T>) => {
  const { ref, inView } = useInView({});

  const { data, isError, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = DEFAULT_LIMIT }) => queryFn(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.offset + limit : undefined;
      },
      initialPageParam: DEFAULT_OFFSET,
      initialData: {
        pages: [
          {
            hasNextPage: initData.length === DEFAULT_LIMIT,
            offset: DEFAULT_OFFSET,
            data: initData,
          },
        ],
        pageParams: [DEFAULT_OFFSET],
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 데이터가 없거나 비어있을 때 emptyText를 표시
  if (!data || data.pages[0].data.length === 0) {
    return (
      <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500 dark:text-neutral-200'>
        {emptyText}
      </div>
    );
  }

  if (isError)
    return (
      <div className='flex grow items-center justify-center text-[14px] font-medium text-gray-500 dark:text-neutral-200'>
        모임을 불러오지 못했습니다.
      </div>
    );

  const allItems = data.pages.flatMap((page) => page.data);
  return (
    <>
      <ul className='flex h-full flex-col'>
        {allItems.map((item, index) => (
          <li key={item.id}>{renderItem(item, index)}</li>
        ))}
      </ul>
      {isFetching && (
        <div className='flex h-80 grow items-center justify-center'>
          <span>
            <Loader />
          </span>
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default InfiniteScroll;
