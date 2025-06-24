'use client';

import { useState } from 'react';
import querystring from 'query-string';

import { RenderBlock } from '@/components/craft-blocks';
import CoreGroup from '@/components/blocks/core/CoreGroup';

import { QueryContext } from '@/components/utils/client-contexts';
import { FetchContext } from '@/components/utils/client-contexts';
import { useEffect } from 'react';
const CoreQuery = (self: RenderBlock) => {
  const [query, setQuery] = useState(self.ctx?.query);
  const [entry, setFetch] = useState(self.ctx?.fetch);

  // Prevent effect from running on initial mount
  const [didMount, setDidMount] = useState(false);
  const [cachedFetch, setCachedFetch] = useState<Record<string, any>>({});

  useEffect(() => {
    const params = querystring.stringify(query!);
    const url = new URL(
      `${location.origin}/api/revalidate/query${params ? `?${params}` : ''}`,
    );

    if (!didMount) {
      // cache first entries
      cachedFetch[url.search] = entry;

      setDidMount(true);
      return;
    }

    (async () => {
      // fetch next entry or replace with cache
      if (!cachedFetch[url.search]) {
        cachedFetch[url.search] = await (await fetch(url, { cache: 'reload' }))
          .json();

        setCachedFetch({ ...cachedFetch });
        setFetch(cachedFetch[url.search]);

        return;
      }

      setFetch(cachedFetch[url.search]);
    })();
  }, [query]);

  const query_wrap: RenderBlock = {
    blockName: 'core/group',
    attrs: undefined,
    innerBlocks: [],
    innerHTML: '',
    innerContent: [],
  };

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      <FetchContext.Provider value={{ fetch: entry, setFetch }}>
        <CoreGroup {...query_wrap}>{self.children}</CoreGroup>
      </FetchContext.Provider>
    </QueryContext.Provider>
  );
};

export default CoreQuery;
