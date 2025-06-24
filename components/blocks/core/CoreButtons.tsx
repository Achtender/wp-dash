'use client';

import { RenderBlock } from '@/components/craft-blocks';
import CoreGroup from '@/components/blocks/core/CoreGroup';

const CoreButtons = (self: RenderBlock) => {
  return <CoreGroup {...self} blockName='core/group' />;
};

export default CoreButtons;
