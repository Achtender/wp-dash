'use client';

import { useContext } from 'react';

import { QueryContext } from '@/components/utils/client-contexts';
import { FetchContext } from '@/components/utils/client-contexts';

import { RenderBlock } from '@/components/craft-blocks';
import { Button } from '@/components/ui/button';
import { CircleSmall } from 'lucide-react';

const CoreQueryPaginationNumbers = ({}: RenderBlock) => {
  const { query, setQuery } = useContext(QueryContext) ?? {};
  const { fetch } = useContext(FetchContext) ?? {};

  if (!query || !fetch) {
    return null;
  }
  if (fetch.total_pages == 1) {
    return null;
  }

  const pageNum = 1 +
    (query.offset > 0 ? query.offset / query.per_page : 0);
  const total_pages = fetch.total_pages;

  const text = `${pageNum} / ${total_pages}`;

  const query_pages = [];

  for (let k = 0; k < total_pages; k++) {
    query_pages.push({ offset: k * query.per_page });
  }

  return (
    <div className='flex flex-row gap-2 items-center'>
      {query_pages.map((query_page, k) => {
        const isCurrent = k === pageNum - 1;

        const renderIcon = isCurrent
          ? <CircleSmall className='h-4 w-4' fill='true' />
          : <CircleSmall className='h-5 w-5' />;

        return (
          <Button
            key={k} //
            disabled={isCurrent}
            variant='link'
            className='flex-none px-0 border w-7 h-7 [&:not(:hover)]:border-none text-base'
            onClick={() => {
              if (setQuery) {
                setQuery({
                  ...query,
                  offset: query_page.offset,
                });
              }
            }}
          >
            {renderIcon}
            <span className='sr-only'>{text}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CoreQueryPaginationNumbers;
