'use client';

// import { trimWordPressHref } from '@/components/craft-blocks';
import { RenderBlock } from '@/components/craft-blocks';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

function trimWordPressHref(_: string) {
  return _;
}

const CoreButton = ({ innerContent }: RenderBlock) => {
  const content: {
    href?: string;
    target?: string;
    rel?: string;
    text?: string;
  } = Array.isArray(innerContent) && innerContent.length > 0
    ? (() => {
      const innerHtml = innerContent.join('').trim().replace(/\n/g, ' ');

      const href = innerHtml.match(/\bhref=["']([^"']*)["']/i)?.[1] ??
        undefined;
      const target = innerHtml.match(/\btarget=["']([^"']*)["']/i)?.[1] ??
        undefined;
      const rel = innerHtml.match(/\brel=["']([^"']*)["']/i)?.[1] ?? undefined;
      const text = innerHtml.match(/<a\b[^>]*>(.*?)<\/a>/i)?.[1] ?? undefined;

      return { href, target, rel, text };
    })()
    : {};

  return (
    <Button asChild variant='outline'>
      <Link
        data-role='button' //
        href={content.href ? trimWordPressHref(content.href) : ''} // href can not be undefined
        rel={content.rel}
        target={content.target}
        className='gap-2'
        // passHref
      >
        {content.text}
      </Link>
    </Button>
  );
};

export default CoreButton;
