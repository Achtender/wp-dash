'use client';

import Image from 'next/image';
import { RenderBlock } from '@/components/craft-blocks';

const CoreImage = (self: RenderBlock) => {
  // const media_placeholder = self.ctx?.media_placeholder;
  const media = (self.ctx?.media as any | undefined)?.media_details;

  if (!media) return null;

  // Pick the best available size as fallback
  const src = media.sizes?.large?.source_url ||
    // media.sizes?.medium_large?.source_url ||
    media.sizes?.medium?.source_url ||
    media.sizes?.full?.source_url;

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
      // {...(media_placeholder
      //   ? {
      //     placeholder: 'blur',
      //     blurDataURL: media_placeholder?.blurDataURL,
      //   }
      //   : {})}
    />
  );
};

export default CoreImage;
