'use client';

import { Button } from '@/components/ui/button';

import { mainMenu } from '@/menu.config';
import { siteConfig } from '@/site.config';

import Logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

// import { Search } from 'lucide-react';
import { MobileNav } from '@/components/nav/mobile-nav';
import { SearchNav } from '@/components/nav/search-nav';

export const Nav = ({ id }: NavProps) => {
  return (
    <nav id={id} className='sticky z-50 top-0 md:top-0 border-b bg-background'>
      {/* <div className='max-w-6xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center'> */}
      <div className='relative max-w-6xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center'>
        {/* Left actions */}
        <Link
          className='hover:opacity-75 transition-all flex gap-4 items-center'
          href='/'
        >
          <Image
            src={Logo}
            alt='Logo'
            loading='eager'
            className='dark:invert'
            width={42}
            height={26.44}
          >
          </Image>
          <span className='text-sm'>{siteConfig.site_name}</span>
        </Link>

        {/* Center navigation */}
        <nav className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          {
            /* <ul className='flex gap-6'>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
          </ul> */
          }

          <ul className='mx-2 hidden md:flex'>
            {Object.entries(mainMenu).map(([key, href]) => (
              <li key={href}>
                <Button asChild variant='ghost' size='sm'>
                  <Link href={href}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right actions */}
        <div className='flex items-center gap-2'>
          <SearchNav />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};
