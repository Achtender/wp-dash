import { getAllPages, getSettings } from '@/lib/wordpress';
import { Container, Prose, Section } from '@/components/craft';
import { Metadata } from 'next';
import BackButton from '@/components/back';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Pages',
  description: 'Browse all pages of our blog posts',
  alternates: {
    canonical: '/posts/pages',
  },
};

export default async function Page() {
  const [settings, pages] = await Promise.all([
    getSettings(), //
    getAllPages(),
  ]);

  return (
    <Section>
      <Container className='space-y-6'>
        <Prose className='mb-8'>
          <h2>All Pages</h2>
          <ul className='grid'>
            {pages.map((page: any) => (
              <li key={page.id}>
                <Link href={`/${page.slug}`}>{page.title.rendered}</Link>
                {page.id === settings.page_on_front && (
                  <span
                    title='This is the front page'
                    className='inline-flex items-center justify-center w-6 h-6 ml-2 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300'
                  >
                    <svg
                      className='w-3 h-3'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='sr-only'>Icon description</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
