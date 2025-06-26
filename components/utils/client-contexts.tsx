'use client';

import React from 'react';

import type { RenderBlock } from '@/components/craft-blocks';
import type { Page, Post } from '@/lib/wordpress.d';

export function LayoutContextWrapper(
  { post, inset, children }: {
    post?: Post | Page;
    inset?: React.ReactNode;
    children: React.ReactNode;
  },
) {
  return (
    <ScopeContext.Provider value={{ scope: post }}>
      <InsetContext.Provider value={{ inset: inset }}>
        {children}
      </InsetContext.Provider>
    </ScopeContext.Provider>
  );
}

export const InsetContext = React.createContext<
  | undefined
  | {
    inset: React.ReactNode;
  }
>(undefined);

export const ScopeContext = React.createContext<
  | undefined
  | {
    scope: RenderBlock['ctx']['scope'];
  }
>(undefined);

export const QueryContext = React.createContext<
  | undefined
  | {
    query: RenderBlock['ctx']['query'];
    setQuery: (value: RenderBlock['ctx']['query']) => void;
  }
>(undefined);

export const FetchContext = React.createContext<
  | undefined
  | {
    fetch: RenderBlock['ctx']['fetch'];
    setFetch: (value: RenderBlock['ctx']['fetch']) => void;
  }
>(undefined);

export const MediaContext = React.createContext<
  | undefined
  | {
    media: RenderBlock['ctx']['media'];
    setMedia: (value: RenderBlock['ctx']['media']) => void;
  }
>(undefined);
