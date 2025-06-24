'use client';

import React from 'react';
import type { RenderBlock } from '@/components/craft-blocks';

export const ScopeContext = React.createContext<
  | undefined
  | {
    scope: RenderBlock['ctx']['scope'];
    setScope: (value: RenderBlock['ctx']['scope']) => void;
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
