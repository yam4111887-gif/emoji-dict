import type { MetadataRoute } from 'next';
import { emojis, emojiSlug, categorySlugs } from '@/data/emojis';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://emojidict.com';
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/en/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/en/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ];
  for (const e of emojis) pages.push({ url: `${base}/en/emoji/${emojiSlug(e.name)}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
  for (const slug of Object.values(categorySlugs)) pages.push({ url: `${base}/en/category/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  for (const post of blogPosts) pages.push({ url: `${base}/en/blog/${post.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 });
  return pages;
}
