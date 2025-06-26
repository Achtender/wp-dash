'use client';

import { useContext } from 'react';
import { RenderBlock } from '@/components/craft-blocks';

import CoreGroup from '@/components/blocks/core/CoreGroup';

import { QueryContext } from '@/components/utils/client-contexts';
import { FetchContext } from '@/components/utils/client-contexts';
import { ScopeContext } from '@/components/utils/client-contexts';

const CorePostTemplate = (self: RenderBlock) => {
  const { fetch } = useContext(FetchContext) ?? {};
  const { query } = useContext(QueryContext) ?? {};

  if (!fetch || !query) return null;
  // const [scope, setScope] = useState(post);

  const post_loop = fetch.posts.map((post: any, k: number) => {
    const post_wrap: RenderBlock = {
      blockName: 'core/group',
      children: self.children,
      innerBlocks: [],
      attrs: undefined,
      ctx: {},
      innerHTML: '',
      innerContent: [],
    };

    return (
      <ScopeContext.Provider
        key={k}
        value={{ scope: post }}
      >
        <CoreGroup {...post_wrap} />
      </ScopeContext.Provider>
    );
  });

  return <CoreGroup {...self} blockName='core/group'>{post_loop}</CoreGroup>;
};

export default CorePostTemplate;
