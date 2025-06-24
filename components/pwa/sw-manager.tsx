'use client';

import { useEffect } from 'react';

export function ServiceWorkerManager() {
  useEffect(() => {
    if ('serviceWorker' in globalThis.navigator) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
    }
  }, []);

  return null;
}
