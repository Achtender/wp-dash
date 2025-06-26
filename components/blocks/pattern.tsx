import { RenderBlock } from '@/components/craft-blocks';
// import { getUrl, wordpressFetch } from '@/lib/wordpress';

export const map: Record<string, string> = {
  'header': `slice/default-header`,
};

export const library = {
  'slice/default-header': (self: RenderBlock) => {
    return (
      <>
        <pre>{JSON.stringify(self, null, 2)}</pre>
      </>
    );
  },
};

export async function resolve(self: RenderBlock): Promise<RenderBlock> {
  return self;
}
