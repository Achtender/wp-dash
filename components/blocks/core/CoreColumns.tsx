'use client';

import { RenderBlock } from '@/components/craft-blocks';
// import { nextBlock } from '@/components/craft-blocks';

const CoreColumns = (self: RenderBlock) => {
  const styles: string[] = [];

  if (self.attrs.isStackedOnMobile === false) {
    styles.push('flex-row');
  } else {
    styles.push('flex-col md:flex-row [&>*]:md:max-w-[var(--aspect-ratio)]');
  }

  return (
    <div className={['flex gap-4', ...styles].join(' ')}>
      {self.children}
      {/* {innerBlocks.map((block, i) => nextBlock(block, i, ctx))} */}
    </div>
  );
};

export default CoreColumns;
