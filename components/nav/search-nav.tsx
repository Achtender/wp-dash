'use client';

// import React, { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchNav(
  // { onSearch }: { onSearch?: (query: string) => void },
) {
  // const [open, setOpen] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);
  // const overlayRef = useRef<HTMLDivElement>(null);
  // const triggerRef = useRef<HTMLButtonElement>(null);

  // // Trap focus inside modal
  // useEffect(() => {
  //   if (!open) return;
  //   const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
  //     'input, button, [tabindex]:not([tabindex="-1"])',
  //   );
  //   const first = focusable?.[0];
  //   const last = focusable?.[focusable.length - 1];

  //   function handleKeyDown(e: KeyboardEvent) {
  //     if (e.key === 'Escape') {
  //       setOpen(false);
  //     }
  //     if (e.key === 'Tab' && focusable && focusable.length > 0) {
  //       if (e.shiftKey && document.activeElement === first) {
  //         e.preventDefault();
  //         last?.focus();
  //       } else if (!e.shiftKey && document.activeElement === last) {
  //         e.preventDefault();
  //         first?.focus();
  //       }
  //     }
  //   }

  //   globalThis.addEventListener('keydown', handleKeyDown);
  //   first?.focus();

  //   return () => globalThis.removeEventListener('keydown', handleKeyDown);
  // }, [open]);

  // // Restore focus to trigger
  // useEffect(() => {
  //   if (!open) {
  //     triggerRef.current?.focus();
  //   }
  // }, [open]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const value = inputRef.current?.value || '';
  //   if (onSearch) onSearch(value);
  //   setOpen(false);
  // };

  return (
    <>
      <Button
        // ref={triggerRef}
        variant='ghost'
        className='px-0  w-10 text-base focus-visible:bg-transparent focus-visible:ring-offset-0'
        onClick={() => {
          globalThis.location.href = '/explore';
        }}
        aria-label='Open search'
        type='button'
      >
        <Search className='h-5 w-5' />
        <span className='sr-only'>Search Pages</span>
      </Button>
      {
        /* {open && (
        <div
          ref={overlayRef}
          className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'
          role='dialog'
          aria-modal='true'
          aria-label='Search'
        >
          <div className='bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 w-full max-w-md relative'>

            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type='text'
                placeholder='Search…'
                className='w-full p-3 border rounded focus:outline-none focus:ring'
                autoFocus
                aria-label='Search query'
              />
            </form>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white'
              onClick={() => setOpen(false)}
              aria-label='Close search'
              type='button'
            >
              ×
            </button>
          </div>
        </div>
      )} */
      }
    </>
  );
}
