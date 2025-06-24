'use client';

import { RenderBlock } from '@/components/craft-blocks';
// import { nextBlock } from '@/components/craft-blocks';

const CoreColumn = (self: RenderBlock) => {
  const styles: string[] = [];
  const inlineStyles: Record<string, string> = {};

  if (self.attrs.verticalAlignment === 'bottom') {
    styles.push('justify-end');
  }

  if (self.attrs.verticalAlignment === 'center') {
    styles.push('justify-center');
  }

  if (self.attrs.width) {
    inlineStyles['--aspect-ratio'] = self.attrs.width;
  }

  return (
    <div
      className={['flex flex-col flex-1 gap-4', ...styles].join(' ')}
      style={inlineStyles}
    >
      {self.children}
    </div>
  );
};

export default CoreColumn;
