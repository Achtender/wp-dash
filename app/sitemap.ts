import { MetadataRoute } from 'next';
import { getAllPosts, getAllPostTypes } from '@/lib/wordpress';
import { siteConfig } from '@/site.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.site_domain}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteConfig.site_domain}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.site_domain}/pages`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/authors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/categories`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.site_domain}/tags`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const post_types = await getAllPostTypes();
  const postUrls: MetadataRoute.Sitemap = [];

  for (const k in post_types) {
    const post_type = post_types[k];
    const posts = await getAllPosts({ post_type: post_type.rest_base });

    posts.map((post) => {
      postUrls.push({
        url: `${siteConfig.site_domain}/${post_type.slug}/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    });
  }

  return [...staticUrls, ...postUrls];
}
