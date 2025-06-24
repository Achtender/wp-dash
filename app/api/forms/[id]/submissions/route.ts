import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const baseUrl = process.env.WORDPRESS_URL;

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id?: string }> },
) {
  const formId = (await context?.params).id;
  const formData = await request.formData();

  const wpRes = await fetch(
    `${baseUrl}/wp-json/gf/v2/forms/${formId}/submissions`,
    {
      method: 'POST',
      body: formData,
      headers: {},
    },
  );

  const data = await wpRes.json();

  return NextResponse.json(data);
}
