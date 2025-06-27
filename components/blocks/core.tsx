import { RenderBlock, resolveBlock } from '@/components/craft-blocks';
import { getFeaturedMediaById, getQueryPosts } from '@/lib/wordpress';
import { getBlocksByRef, getTemplatePart } from '@/lib/wordpress';
import * as blockSerialization from '@wordpress/block-serialization-default-parser';

import { map as pattern_map } from '@/components/blocks/pattern';
import { resolve as pattern_resolve } from '@/components/blocks/pattern';

import CoreImage from '@/components/blocks/core/CoreImage';
import CoreGallery from '@/components/blocks/core/CoreGallery';
import CoreHeading from '@/components/blocks/core/CoreHeading';
import CoreParagraph from '@/components/blocks/core/CoreParagraph';
import CoreButton from '@/components/blocks/core/CoreButton';
import CoreButtons from '@/components/blocks/core/CoreButtons';
import CoreSeparator from '@/components/blocks/core/CoreSeparator';
import CoreSpacer from '@/components/blocks/core/CoreSpacer';
import CoreColumn from '@/components/blocks/core/CoreColumn';
import CoreColumns from '@/components/blocks/core/CoreColumns';
import CoreQuery from '@/components/blocks/core/CoreQuery';
import CoreQueryNoResults from '@/components/blocks/core/CoreQueryNoResults';
import CorePostContent from '@/components/blocks/core/CorePostContent';
import CorePostTemplate from '@/components/blocks/core/CorePostTemplate';
import CorePostFeaturedImage from '@/components/blocks/core/CorePostFeaturedImage';
// import CorePostTitle from '@/components/blocks/core/CorePostTitle';
import CoreGroup from '@/components/blocks/core/CoreGroup';
import CoreQueryPagination from '@/components/blocks/core/CoreQueryPagination';
import CoreQueryPaginationPrevious from '@/components/blocks/core/CoreQueryPaginationPrevious';
import CoreQueryPaginationNext from '@/components/blocks/core/CoreQueryPaginationNext';
import CoreQueryPaginationNumbers from '@/components/blocks/core/CoreQueryPaginationNumbers';
import CoreTemplatePart from '@/components/blocks/core/CoreTemplatePart';

export const library = {
  'core/query-pagination': CoreQueryPagination,
  'core/query-pagination-previous': CoreQueryPaginationPrevious,
  'core/query-pagination-next': CoreQueryPaginationNext,
  'core/query-pagination-numbers': CoreQueryPaginationNumbers,
  'core/buttons': CoreButtons,
  'core/button': CoreButton,
  'core/column': CoreColumn,
  'core/columns': CoreColumns,
  'core/query': CoreQuery,
  'core/query-no-results': CoreQueryNoResults,
  'core/post-content': CorePostContent,
  'core/post-template': CorePostTemplate,
  // 'core/post-title': CorePostTitle,
  'core/post-featured-image': CorePostFeaturedImage,
  // 'core/post-excerpt': CorePostExcerpt,
  // 'core/post-date': CorePostDate,
  'core/heading': CoreHeading,
  'core/paragraph': CoreParagraph,
  'core/image': CoreImage,
  'core/gallery': CoreGallery,
  'core/group': CoreGroup,
  'core/separator': CoreSeparator,
  'core/spacer': CoreSpacer,
  'core/block': null, // `null` to allow resolve, but render nothing
  'core/template-part': CoreTemplatePart,
};

export async function resolve(self: RenderBlock): Promise<RenderBlock> {
  switch (self.blockName) {
    case 'core/template-part': {
      const template_part = await getTemplatePart(self.attrs.slug);
      const reactElement = await blockSerialization.parse(
        template_part.content.raw,
      );

      const blockMap = (await Promise.all(
        reactElement
          .filter((_) => _.blockName)
          .map(async (_) => {
            const resolved = await resolveBlock(_);
            return resolved;
          }),
      )).filter((_) => _ !== null);

      self.innerBlocks = blockMap;
      break;
    }
    case 'core/block': {
      const block_fetch = await getBlocksByRef(self.attrs.ref);

      if (block_fetch.slug in pattern_map) {
        // core/block as a pattern slice
        self.ctx = { ...pattern_resolve(self) };
        self.blockName = pattern_map[block_fetch.slug];
      } else {
        // core/block as a sync pattern

        // ---
        // TODO(@all): resolve non pattern core/block as core patterns
        self.ctx = {
          code: 'Caution',
          message:
            `The "${self.blockName}" block could not be matched with block library. You may leave it as-is, convert it to custom HTML, or remove it.`,
        };
        self.blockName = 'dev/warning';
        // ---
      }
      break;
    }
    case 'core/image': {
      const media = await getFeaturedMediaById(self.attrs.id);
      self.ctx = { ...self.ctx, media };
      break;
    }
    case 'core/paragraph': {
      const content =
        Array.isArray(self.innerContent) && self.innerContent.length > 0 //
          ? self.innerContent.join('').trim()
          : '';

      self.ctx = {
        ...self.ctx,
        content,
      };
      break;
    }
    case 'core/heading': {
      const content: string =
        Array.isArray(self.innerContent) && self.innerContent.length > 0
          ? (() => {
            const match = self.innerContent
              .join('')
              .trim()
              .replace(/\n/g, ' ')
              .match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);

            return match ? match[1] : '';
          })()
          : '';

      const level = ((_: number) => {
        return _ <= 1 ? 1 : _ >= 5 ? 5 : _;
      })(self.attrs?.level ?? 2);

      self.ctx = {
        ...self.ctx,
        content,
        level,
      };
      break;
    }
    case 'core/query': {
      if (!self.ctx) {
        self.ctx = {};
      }

      // if (self.attrs.namespace === 'advanced-query-loop') {
      //   console.log({ namespace: self.attrs.namespace });
      // }

      self.ctx.query = {
        author: self.attrs.query.author || undefined,
        post_type: self.attrs.query.postType || undefined,
        search: self.attrs.query.search || undefined,
        per_page: self.attrs.query.perPage,
        order: self.attrs.query.order,
        order_by: self.attrs.query.orderBy,
        offset: 0,
      };

      const query_fetch = await getQueryPosts(self.ctx.query);

      self.ctx.fetch = {
        posts: query_fetch.posts,
        total_pages: query_fetch.total_pages,
        total: query_fetch.total,
      };
      break;
    }
  }

  return self;
}
