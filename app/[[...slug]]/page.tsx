import { getAllPages, getPageById, getSettings } from '@/lib/wordpress';
import { getBreadcrumbsBySlug } from '@/lib/wordpress';
import { SliceLayout } from '@/components/craft';
import { siteConfig } from '@/site.config';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

// Revalidate pages every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return await Promise.all(pages.map(async (page) => {
    const page_breadcrumbs = await getBreadcrumbsBySlug(page.slug);
    const slug: string[] = page_breadcrumbs.map((_) => _.slug);
    return { slug };
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  let { slug } = await params;

  if (slug === undefined) {
    const settings = await getSettings();
    slug = [(await getPageById(settings.page_on_front)).slug];
  }

  const page_slug = slug.at(-1);
  const page_breadcrumbs = page_slug && await getBreadcrumbsBySlug(page_slug);
  const page = page_breadcrumbs && page_breadcrumbs.at(-1);

  const slug_match = page && Array.isArray(page_breadcrumbs) &&
    page_breadcrumbs.every((breadcrumb, idx) => {
      return breadcrumb.slug === slug[idx];
    });

  if (!page || !slug_match) {
    return {};
  }

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
  params: Promise<{ slug: string[] }>;
}) {
  let { slug } = await params;

  if (slug === undefined) {
    const settings = await getSettings();
    slug = [(await getPageById(settings.page_on_front)).slug];
  }

  const page_slug = slug?.at(-1);
  const page_breadcrumbs = page_slug && await getBreadcrumbsBySlug(page_slug);
  const page = page_breadcrumbs && page_breadcrumbs.at(-1);

  const slug_match = page && Array.isArray(page_breadcrumbs) &&
    page_breadcrumbs.every((breadcrumb, idx) => {
      return breadcrumb.slug === slug[idx];
    });

  if (!page || !slug_match) {
    notFound();
  }

  return <SliceLayout post={page}></SliceLayout>;

  // if (
  //   !page ||
  //   (process.env.NODE_ENV !== 'development' && page.slug.startsWith('_'))
  // ) {
  //   notFound();
  // }

  // return (
  //   <Section>
  //     <Container>
  //       <Prose>
  //         <Block dangerouslySetInnerHTML={{ __html: page.content.raw }}></Block>
  //       </Prose>
  //     </Container>
  //   </Section>
  // );
}
