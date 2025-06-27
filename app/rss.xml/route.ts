export const revalidate = 3600;

export async function GET() {
  const rss_url = `${process.env.WORDPRESS_URL}/feed`;
  const rssResponse = await fetch(rss_url);

  if (!rssResponse.ok) {
    return new Response('Internal Server Error', { status: 500 });
  }

  const rssText = await rssResponse.text();
  return new Response(rssText, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
