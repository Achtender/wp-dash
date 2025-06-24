'use client';

import { useContext } from 'react';

import { RenderBlock } from '@/components/craft-blocks';
import CoreGroup from '@/components/blocks/core/CoreGroup';

import { QueryContext } from '@/components/utils/client-contexts';
import { FetchContext } from '@/components/utils/client-contexts';

const CoreQueryNoResults = (self: RenderBlock) => {
  const { fetch } = useContext(FetchContext) ?? {};
  const { query } = useContext(QueryContext) ?? {};

  if (!fetch || !query) return null;
  if (fetch.posts.length) return null;

  const no_post_wrap: RenderBlock = {
    blockName: 'core/group',
    children: self.children,
    innerBlocks: [],
    attrs: undefined,
    ctx: {},
    innerHTML: '',
    innerContent: [],
  };

  return <CoreGroup {...no_post_wrap} />;
};

export default CoreQueryNoResults;
