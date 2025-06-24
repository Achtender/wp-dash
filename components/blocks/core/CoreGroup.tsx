'use client';

import { RenderBlock } from '@/components/craft-blocks';
// import { nextBlock } from '@/components/craft-blocks';

const CoreGroup = (self: RenderBlock) => {
  const styles: string[] = [];
  const inlineStyles: Record<string, string> = {};

  if (self.attrs?.layout?.type === 'flex') {
    // Use flex layout with specified orientation
    if (self.attrs?.layout?.orientation === 'vertical') {
      styles.push('flex flex-col');
    } else {
      styles.push('flex flex-row');
    }
  } else if (
    self.attrs?.layout?.type === 'grid' &&
    self.attrs?.layout?.minimumColumnWidth === null
  ) {
    // Use grid layout with specified column count
    if (self.attrs?.layout?.columnCount) {
      styles.push(`grid grid-cols-${self.attrs?.layout?.columnCount}`);
    } else {
      styles.push('grid grid-cols-1');
    }
  } else if (self.attrs?.layout?.type === 'grid') {
    // Use auto-fill with minimum column width
    styles.push('grid');
    styles.push(
      '[grid-template-columns:repeat(auto-fill,minmax(var(--min-col-width),1fr))]',
    );
    inlineStyles['--min-col-width'] =
      `min(100%, ${self.attrs?.layout?.minimumColumnWidth})`;
  } else {
    // Default to block layout
    styles.push('flex flex-col');
  }

  // justify content
  if (self.attrs?.layout?.flexWrap == 'wrap') {
    styles.push('flex-wrap');
  } else {
    styles.push('flex-nowrap');
  }
  if (self.attrs?.layout?.justifyContent == 'space-between') {
    styles.push('justify-between');
  }
  if (self.attrs?.layout?.justifyContent == 'right') {
    styles.push('justify-end');
  }
  if (self.attrs?.layout?.justifyContent == 'center') {
    styles.push('justify-center');
  }

  // align items
  if (self.attrs?.layout?.verticalAlignment == 'bottom') {
    styles.push('items-end');
  }
  if (self.attrs?.layout?.verticalAlignment == 'center') {
    styles.push('items-center');
  }

  // self
  if (self.attrs?.style?.layout?.selfStretch == 'fill') {
    styles.push('flex-1');
  }

  if (self.attrs?.tagName === 'form') {
    const tagAttrs = self.attrs?.tagAttrs ?? {};

    return (
      <form
        {...tagAttrs}
        className={['gap-4', ...styles].join(' ')}
        style={inlineStyles}
      >
        {self.children}
      </form>
    );
  }

  return (
    <div className={['gap-4', ...styles].join(' ')} style={inlineStyles}>
      {self.children}
    </div>
  );
};

export default CoreGroup;
