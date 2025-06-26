import { Container, Section } from '@/components/craft';
import BackButton from '@/components/back';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <Section>
      <Container className='space-y-6'>
        <BackButton />
      </Container>
    </Section>
  );
}
