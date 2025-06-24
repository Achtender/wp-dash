import { NextRequest } from 'next/server';
import { getQueryPosts } from '@/lib/wordpress';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const filterParams = Object.fromEntries(searchParams.entries());

  const _ = await getQueryPosts(filterParams);
  return new Response(JSON.stringify(_));
}
