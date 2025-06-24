'use client';

import { useContext } from 'react';

import { RenderBlock } from '@/components/craft-blocks';
import { QueryContext } from '@/components/utils/client-contexts';
import { FetchContext } from '@/components/utils/client-contexts';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CoreQueryPaginationNext = ({}: RenderBlock) => {
  const { query, setQuery } = useContext(QueryContext) ?? {};
  const { fetch } = useContext(FetchContext) ?? {};

  if (!query || !fetch) {
    return null;
  }

  const offset = query?.offset || 0;
  const offset_limit = fetch?.total - query?.per_page;

  return (
    <Button
      disabled={offset >= offset_limit}
      variant='outline'
      className='flex-none px-0 border w-10 text-base'
      onClick={() => {
        if (setQuery) {
          setQuery({
            ...query,
            offset: offset + query.per_page,
          });
        }
      }}
    >
      <ArrowRight className='h-5 w-5' />
      <span className='sr-only'>Next Page</span>
    </Button>
  );
};

export default CoreQueryPaginationNext;
