import { RenderBlock } from '@/components/craft-blocks';

import DebugWarning from '@/components/blocks/plugin/dev/DebugWarning';
import GravityFormsForm from '@/components/blocks/plugin/gravityforms/GravityFormsForm';
import { getUrl, wordpressFetch } from '@/lib/wordpress';

export const library = {
  'dev/warning': DebugWarning,
  'gravityforms/form': GravityFormsForm,
};

export async function resolve(self: RenderBlock): Promise<RenderBlock> {
  switch (self.blockName) {
    case 'gravityforms/form': {
      const url = getUrl(`/wp-json/gf/v2/forms/${self.attrs.formId}`);
      const response = wordpressFetch<{ page_on_front: number }>(url);

      self.attrs.form = await response.then((form: unknown) => {
        return form;
      });

      break;
    }

    default:
      break;
  }

  return self;
}
