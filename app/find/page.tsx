// Craft Imports
import { Container, Prose, Section } from '@/components/craft';
import Balancer from 'react-wrap-balancer';

import { SearchInput } from '@/components/posts/search-input';
import { PostCard } from '@/components/posts/post-card';
import { getQueryPosts } from '@/lib/wordpress';

// Next.js Imports
import Link from 'next/link';

// Icons
import { Diamond, File, Tag, User } from 'lucide-react';
// import { Diamond, File, Pen, Tag, User } from 'lucide-react';
// import { WordPressIcon } from "@/components/icons/wordpress";
// import { NextJsIcon } from "@/components/icons/neFxtjs";

// This page is using the craft.tsx component and design system
export default async function Find({ searchParams }: {
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  // const { author, tag, category, page: pageParam, search } = params;
  const { search } = params;

  const [query] = await Promise.all([
    getQueryPosts({ search }),
  ]);

  const paginatedPosts = query?.posts ?? [];

  return (
    <Section>
      <Container>
        <Prose className='mb-5'>
          <h1>
            <Balancer>Finder</Balancer>
          </h1>
          {/* <p></p> */}
        </Prose>

        <div className='space-y-4'>
          <SearchInput defaultValue={search} />

          {search && (
            <>
              {paginatedPosts.length > 0
                ? (
                  <div className='grid md:grid-cols-3 gap-4'>
                    {paginatedPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )
                : (
                  <div className='h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center'>
                    <p>No posts found</p>
                  </div>
                )}
            </>
          )}
        </div>

        {!search && (
          <div className='grid md:grid-cols-3 gap-4 mt-6'>
            {
              /* <a
          className='border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all'
          href='https://github.com/9d8dev/next-wp/blob/main/README.md'
        >
          <Folder size={32} />
          <span>
            Documentation{' '}
            <span className='block text-sm text-muted-foreground'>
              How to use `next-wp`
            </span>
          </span>
        </a> */
            }
            {
              /* <Link
              className='border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all'
              href='/'
            >
              <House size={32} />
              <span>
                Home{' '}
                <span className='block text-sm text-muted-foreground'>
                  Homepage from your WordPress
                </span>
              </span>
            </Link> */
            }
            {
              /* <Link
              className='border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all'
              href='/posts'
            >
              <Pen size={32} />
              <span>
                Posts{' '}
                <span className='block text-sm text-muted-foreground'>
                  All posts from your WordPress
                </span>
              </span>
            </Link> */
            }
            <Link
              className='border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all'
              href='/pages'
            >
              <File size={32} />
              <span>
                Pages{' '}
                <span className='block text-sm text-muted-foreground'>
                  Custom pages from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className='border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all'
              href='/posts/authors'
            >
              <User size={32} />
              <span>
                Authors{' '}
                <span className='block text-sm text-muted-foreground'>
                  List of the authors from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className='border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all'
              href='/posts/tags'
            >
              <Tag size={32} />
              <span>
                Tags{' '}
                <span className='block text-sm text-muted-foreground'>
                  Content by tags from your WordPress
                </span>
              </span>
            </Link>
            <Link
              className='border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all'
              href='/posts/categories'
            >
              <Diamond size={32} />
              <span>
                Categories{' '}
                <span className='block text-sm text-muted-foreground'>
                  Categories from your WordPress
                </span>
              </span>
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
