import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing url', { status: 400 });
  }

  const size = 20;
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element,jsx-a11y/alt-text
      <img src={imageUrl} width={size} height={size} />
    ),
    { width: size, height: size },
  );
}
