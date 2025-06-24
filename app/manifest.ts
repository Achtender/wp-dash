import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WP-Headless',
    short_name: 'Headless',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/app-icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
  };
}
