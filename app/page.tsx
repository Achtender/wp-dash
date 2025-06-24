import { Block, Container, Prose, Section } from '@/components/craft';
import { getPageById, getSettings } from '@/lib/wordpress';

// Revalidate pages every hour
export const revalidate = 3600;

import { generateMetadata as generatePageMetadata } from '@/app/[slug]/page';

export function generateMetadata() {
  return generatePageMetadata({
    params: (async () => {
      const settings = await getSettings();
      const page = await getPageById(settings.page_on_front);

      return {
        slug: page.slug,
      };
    })(),
  });
}

export default async function Page() {
  const settings = await getSettings();
  const page = await getPageById(settings.page_on_front);

  return (
    <Section>
      <Container>
        <Prose>
          <Block dangerouslySetInnerHTML={{ __html: page.content.raw }}></Block>
        </Prose>
      </Container>
    </Section>
  );
}
