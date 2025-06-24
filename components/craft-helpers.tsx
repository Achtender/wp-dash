import { wpConfig } from '@/site.config';

const wp_pathname = wpConfig.site_pathname;

export function dangerouslySetInnerWordPressRaw(raw?: string) {
  let normalized_raw = raw ?? '';

  if (wp_pathname && wp_pathname.split('/').filter(Boolean).length > 1) {
    const pathSegments = wp_pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];

    normalized_raw = normalized_raw.replace(
      new RegExp(
        `(href|src)=["']https?://[^/]+/${pathSegments.join('/')}`,
        'g',
      ),
      `$1="/${firstSegment}`,
    );
  } else {
    normalized_raw = normalized_raw.replace(
      /(href|src)=["']https?:\/\/[^\/]+/g,
      '$1=""',
    );
  }

  // Remove HTML comments
  normalized_raw = normalized_raw.replace(/<!--[\s\S]*?-->/g, '');

  return {
    dangerouslySetInnerHTML: { __html: normalized_raw },
  };
}

// export function trimWordPressHref(raw?: string) {
//   let normalized_raw = raw ?? '';

//   // Remove absolute URLs and replace with relative paths
//   normalized_raw = normalized_raw.replace(baseUrl!, ``);

//   return normalized_raw;
// }
