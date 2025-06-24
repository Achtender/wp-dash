'use client';

import { useContext } from 'react';
import { RenderBlock } from '@/components/craft-blocks';

import CoreImage from '@/components/blocks/core/CoreImage';

import { ScopeContext } from '@/components/utils/client-contexts';

const CorePostFeaturedImage = (self: RenderBlock) => {
  const { scope } = useContext(ScopeContext) ?? {};
  const media = scope?._embedded?.['wp:featuredmedia']?.[0];

  if (!scope || !media) return null;

  const image_wrap = { ...self, ctx: { ...self.ctx, media } };

  return <CoreImage {...image_wrap} blockName='core/image' />;
};

export default CorePostFeaturedImage;
