'use client';

import { RenderBlock } from '@/components/craft-blocks';

const CoreTemplatePart = (self: RenderBlock) => {
  return <>{self.children}</>; //
};

export default CoreTemplatePart;
