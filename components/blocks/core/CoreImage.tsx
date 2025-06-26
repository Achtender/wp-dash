'use client';

import Image from 'next/image';
import { RenderBlock } from '@/components/craft-blocks';

const CoreImage = (self: RenderBlock) => {
  const media_json = self.ctx?.media as any | undefined;
  const media = media_json?.media_details;

  if (!media) return null;

  const src = `/assets/${media_json.id}.gen.${
    media_json.source_url.split('.').pop()
  }`;

  // Optionally, you can set width/height for layout
  const width = media.sizes?.large?.width || media.width;
  const height = media.sizes?.large?.height || media.height;

  return (
    <Image
      src={src}
      alt={self.attrs.alt || ''}
      width={width}
      height={height}
      sizes='(min-width: 1024px) 800px, (min-width: 600px) 400px, 100vw'
      className='flex-1 h-auto object-cover'
      style={{ aspectRatio: self.attrs.aspectRatio }}
    />
  );
};

export default CoreImage;
