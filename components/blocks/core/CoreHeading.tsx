'use client';

import { RenderBlock } from '@/components/craft-blocks';
import { JSX } from 'react';

const CoreHeading = (self: RenderBlock) => {
  const level = self.ctx?.level ?? 2;
  const text = self.ctx?.content ?? '';

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag dangerouslySetInnerHTML={{ __html: text }}></Tag>;
};

export default CoreHeading;
