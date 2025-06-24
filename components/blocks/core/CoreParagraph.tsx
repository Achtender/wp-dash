'use client';

import { RenderBlock } from '@/components/craft-blocks';

const CoreParagraph = (self: RenderBlock) => {
  const text = (self.ctx?.content as string ?? '').trim();

  if (text === '') {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
};

export default CoreParagraph;
