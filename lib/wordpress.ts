// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from 'query-string';
import type {
  Author,
  Category,
  FeaturedMedia,
  Page,
  Post,
  Tag,
} from './wordpress.d';
const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error('WORDPRESS_URL environment variable is not defined');
}

export function getUrl(path: string, query?: Record<string, any>) {
  // const params = query ? querystring.stringify(query) : null;
  const params = querystring.stringify({ context: 'edit', ...(query ?? {}) });
  return `${baseUrl}${path}${params ? `?${params}` : ''}`;
}

class WordPressAPIError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = 'WordPressAPIError';
  }
}

async function wordpressFetchResponse(url: string): Promise<Response> {
  const userAgent = 'Next.js WordPress Client';
  const credentials = btoa(
    unescape(encodeURIComponent(process.env.WORDPRESS_API_BASIC_AUTH || '')),
  );

  const response = await fetch(url, {
    cache: 'force-cache',
    headers: {
      'User-Agent': userAgent,
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}\n${response.statusText}`,
      response.status,
      url,
    );
  }

  return response;
}

export async function wordpressFetch<T>(url: string): Promise<T> {
  const json = await (await wordpressFetchResponse(url)).json();
  const text = JSON.stringify(json);

  return JSON.parse(
    text //
      .replaceAll(baseUrl!, '')
      .replaceAll(`/wp-content`, `${baseUrl}/wp-content`),
  );
}

export async function getSettings(): Promise<{ page_on_front: number }> {
  const url = getUrl('/wp-json/wp/v2/settings');
  const response = await wordpressFetch<{ page_on_front: number }>(url);
  return response;
}

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
  post_type?: string;
  per_page?: number;
  order?: 'asc' | 'desc';
  order_by?:
    | 'author'
    | 'date'
    | 'id'
    | 'include'
    | 'modified'
    | 'parent'
    | 'relevance'
    | 'slug'
    | 'include_slugs'
    | 'title';
}): Promise<Post[]> {
  const query_post_type = filterParams?.post_type ?? 'posts';
  const query: Record<string, any> = {
    _embed: true,
    order: filterParams?.order ?? 'desc',
    orderby: filterParams?.order_by ?? 'date',
    per_page: filterParams?.per_page ?? 100,
  };

  if (filterParams?.search) {
    query.search = filterParams.search;

    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  } else {
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  }

  const url = getUrl(`/wp-json/wp/v2/${query_post_type}`, query);
  return wordpressFetch<Post[]>(url);
}

export async function getQueryPosts(filterParams?: {
  offset?: number;
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
  post_type?: string;
  per_page?: number;
  order?: 'asc' | 'desc';
  order_by?:
    | 'author'
    | 'date'
    | 'id'
    | 'include'
    | 'modified'
    | 'parent'
    | 'relevance'
    | 'slug'
    | 'include_slugs'
    | 'title';
}): Promise<{
  total_pages: number;
  total: number;
  posts: Post[];
}> {
  let query_post_type = filterParams?.post_type ?? 'posts';
  const query: Record<string, any> = {
    _embed: true,
    order: filterParams?.order ?? 'desc',
    orderby: filterParams?.order_by ?? 'date',
    per_page: filterParams?.per_page ?? 100,
  };

  if (query_post_type === 'post') {
    // api entry for `post` is `posts`
    query_post_type = 'posts';
  }

  if (filterParams?.offset) {
    query.offset = filterParams.offset;
  }

  if (filterParams?.search) {
    query.search = filterParams.search;

    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  } else {
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  }

  const url = getUrl(`/wp-json/wp/v2/${query_post_type}`, query);
  const res = await wordpressFetchResponse(url);

  return res.json().then((posts: Post[]) => ({
    total_pages: parseInt(res.headers.get('x-wp-totalpages') ?? '0'),
    total: parseInt(res.headers.get('x-wp-total') ?? '0'),
    posts,
  }));
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  return wordpressFetch<Post>(url);
}

export async function getPostBySlug(
  slug: string,
  type?: string,
): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/${type ?? 'posts'}`, { slug });
  const response = await wordpressFetch<Post[]>(url);
  return response[0];
}

export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl('/wp-json/wp/v2/categories');
  return wordpressFetch<Category[]>(url);
}

export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  return wordpressFetch<Category>(url);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl('/wp-json/wp/v2/categories', { slug });
  const response = await wordpressFetch<Category[]>(url);
  return response[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl('/wp-json/wp/v2/posts', { categories: categoryId });
  return wordpressFetch<Post[]>(url);
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl('/wp-json/wp/v2/posts', { tags: tagId });
  return wordpressFetch<Post[]>(url);
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl('/wp-json/wp/v2/tags', { post: postId });
  return wordpressFetch<Tag[]>(url);
}

export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl('/wp-json/wp/v2/tags');
  return wordpressFetch<Tag[]>(url);
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  return wordpressFetch<Tag>(url);
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl('/wp-json/wp/v2/tags', { slug });
  const response = await wordpressFetch<Tag[]>(url);
  return response[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl('/wp-json/wp/v2/pages');
  return wordpressFetch<Page[]>(url);
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  return wordpressFetch<Page>(url);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl('/wp-json/wp/v2/pages', { slug });
  const response = await wordpressFetch<Page[]>(url);
  return response[0];
}

export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl('/wp-json/wp/v2/users');
  return wordpressFetch<Author[]>(url);
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  return wordpressFetch<Author>(url);
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl('/wp-json/wp/v2/users', { slug });
  const response = await wordpressFetch<Author[]>(url);
  return response[0];
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl('/wp-json/wp/v2/posts', { author: authorId });
  return wordpressFetch<Post[]>(url);
}

export async function getPostsByAuthorSlug(
  authorSlug: string,
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl('/wp-json/wp/v2/posts', { author: author.id });
  return wordpressFetch<Post[]>(url);
}

export async function getPostsByCategorySlug(
  categorySlug: string,
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl('/wp-json/wp/v2/posts', { categories: category.id });
  return wordpressFetch<Post[]>(url);
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl('/wp-json/wp/v2/posts', { tags: tag.id });
  return wordpressFetch<Post[]>(url);
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  return wordpressFetch<FeaturedMedia>(url);
}

export async function searchCategories(query: string): Promise<Category[]> {
  const url = getUrl('/wp-json/wp/v2/categories', {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Category[]>(url);
}

export async function searchTags(query: string): Promise<Tag[]> {
  const url = getUrl('/wp-json/wp/v2/tags', {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Tag[]>(url);
}

export async function searchAuthors(query: string): Promise<Author[]> {
  const url = getUrl('/wp-json/wp/v2/users', {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<Author[]>(url);
}

export { WordPressAPIError };
