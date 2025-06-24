'use client';

import { RenderBlock } from '@/components/craft-blocks';
// import { nextBlock } from '@/components/craft-blocks';

// export const CorePostTitle = ({ blockName, attrs, ctx }: RenderBlock) => {
export const CorePostTitle = ({}: RenderBlock) => {
  return null;

  // if (!ctx.post) {
  //   return nextBlock(
  //     {
  //       blockName: 'dev/warning',
  //       ctx: {
  //         code: 'Caution',
  //         message:
  //           `The "${blockName}" block is restricted to usage within a query context. Ensure that it is nested within a "core/queryLoop" or a "core/group" that has an set post context.`,
  //       },
  //     },
  //     undefined,
  //     null,
  //   );
  // }

  // const content = attrs.isLink
  //   ? /* html */ `
  //     <h2>
  //       <a
  //         href="${ctx.post.link}"
  //         target="${attrs.linkTarget ?? ''}"
  //       >${ctx.post.title.raw}</a>
  //     </h2>`
  //   : /* html */ `<h2>${ctx.post.title.raw}</h2>`;

  // return nextBlock(
  //   {
  //     blockName: 'core/heading',
  //     attrs: { level: attrs.level },
  //     innerContent: [content],
  //   },
  //   undefined,
  //   null,
  // );
};

export default CorePostTitle;
