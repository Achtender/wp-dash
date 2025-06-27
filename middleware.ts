import { NextRequest, NextResponse } from 'next/server';
import { getAllPostTypes } from './lib/wordpress';

let pathMappings: Record<string,string> = {};
let isInitialized = false;

async function initializePathMappings() {
  if (!isInitialized) {
    const postTypes = await getAllPostTypes();
    for (const k in postTypes) {
      pathMappings[postTypes[k].slug] = 'posts';
    }
    isInitialized = true;
  }
}

export function getLocalizedVariants(internalPath: string): string[] {
  const variants: string[] = [];
  
  for (const [localizedPath, mappedPath] of Object.entries(pathMappings)) {
    if (mappedPath === internalPath) {
      variants.push(localizedPath);
    }
  }
  
  return variants;
}

export async function middleware(request: NextRequest) {
  // Initialize path mappings if not already done
  await initializePathMappings();
  
  const { pathname } = request.nextUrl;
  
  // Extract the first segment of the path
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // Check if the first segment matches any of our localized paths
  if (firstSegment && firstSegment in pathMappings) {
    // Rewrite to the internal route structure
    const internalPath = pathMappings[firstSegment as keyof typeof pathMappings];
    const remainingPath = segments.slice(1).join('/');
    
    // Construct the new URL
    const newUrl = new URL(request.url);
    newUrl.pathname = remainingPath ? `/${internalPath}/${remainingPath}` : `/${internalPath}`;
    
    // Create response with rewrite
    const response = NextResponse.rewrite(newUrl);
    
    // Add cache headers to optimize caching behavior
    response.headers.set('x-internal-path', newUrl.pathname);
    response.headers.set('x-localized-segment', firstSegment);
    
    // Set cache control headers
    response.headers.set(
      'Cache-Control', 
      'public, max-age=3600, stale-while-revalidate=86400'
    );
    
    return response;
  }
  
  // Continue with the original request if no mapping found
  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - Any file with an extension (e.g., .css, .js, .png, etc.)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
//   ],
// };
