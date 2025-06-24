'use client';

import { useContext } from 'react';

import { RenderBlock } from '@/components/craft-blocks';
import { QueryContext } from '@/components/utils/client-contexts';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CoreQueryPaginationPrevious = ({}: RenderBlock) => {
  const { query, setQuery } = useContext(QueryContext) ?? {};

  if (!query) {
    return null;
  }

  const offset = query?.offset || 0;

  return (
    <Button
      disabled={!query.offset || query.offset <= 0} //
      variant='outline'
      className='flex-none px-0 border w-10 text-base'
      onClick={() => {
        if (setQuery) {
          setQuery({
            ...query,
            offset: offset - query.per_page,
          });
        }
      }}
    >
      <ArrowLeft className='h-5 w-5' />
      <span className='sr-only'>Previous Page</span>
    </Button>
  );
};

export default CoreQueryPaginationPrevious;
