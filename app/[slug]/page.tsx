import { getAllPages, getPageBySlug } from '@/lib/wordpress';
import { Block, Container, Prose, Section } from '@/components/craft';
import { siteConfig } from '@/site.config';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

// Revalidate pages every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [page] = await Promise.all([getPageBySlug(slug)]);

  if (!page) return {};

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append('title', page.title.raw);
  // Strip HTML tags for description and limit length
  const description = page.excerpt?.raw
    ? page.excerpt.raw.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    : page.content.raw
      .replace(/\s+/g, ' ')
      .replace(/<[^>]*>/g, '')
      .trim()
      .slice(0, 200) + '...';

  ogUrl.searchParams.append('description', description);

  return {
    title: page.title.raw,
    description: description,
    openGraph: {
      title: page.title.raw,
      description: description,
      type: 'article',
      url: `${siteConfig.site_domain}/${page.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title.raw,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title.raw,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (
    !page ||
    (process.env.NODE_ENV !== 'development' && page.slug.startsWith('_'))
  ) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Prose>
          <Block dangerouslySetInnerHTML={{ __html: page.content.raw }}></Block>
        </Prose>
      </Container>
    </Section>
  );
}
