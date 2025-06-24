'use client';

import { RenderBlock } from '@/components/craft-blocks';
import CoreGroup from '@/components/blocks/core/CoreGroup';

const CorePagination = (self: RenderBlock) => {
  const group_wrap = {
    ...self,
    attrs: {
      ...self.attrs,
      layout: {
        ...self.attrs.layout,
        type: 'flex',
        verticalAlign: 'center',
        justifyContent: 'space-between',
      },
    },
    blockName: 'core/group',
  };

  return (
    <CoreGroup {...group_wrap}>
      {self.children}
    </CoreGroup>
  );
};

export default CorePagination;
