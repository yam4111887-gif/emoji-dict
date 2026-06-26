import type { MetadataRoute } from 'next';
import { emojis, emojiSlug, categorySlugs } from '@/data/emojis';
import { blogPosts } from '@/data/blog';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://emojidict.com';
  const pages: MetadataRoute.Sitemap = [];

  // Add locale-prefixed pages for all locales
  for (const locale of locales) {
    pages.push({ url: `${base}/${locale}`, lastModified: new Date(), changeFrequency: 'weekly', priority: locale === 'en' ? 1.0 : 0.9 });
    pages.push({ url: `${base}/${locale}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
    pages.push({ url: `${base}/${locale}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 });
    pages.push({ url: `${base}/${locale}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 });

    for (const e of emojis) {
      pages.push({ url: `${base}/${locale}/emoji/${emojiSlug(e.name)}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
    }
    for (const slug of Object.values(categorySlugs)) {
      pages.push({ url: `${base}/${locale}/category/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
    }
    for (const post of blogPosts) {
      pages.push({ url: `${base}/${locale}/blog/${post.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 });
    }
  }

  return pages;
}
