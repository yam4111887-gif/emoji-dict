import { blogPosts } from '@/data/blog';
import Link from 'next/link';
import { locales, type Locale, t } from '@/lib/i18n';
import { AdSlot } from '@/components/ui/AdSlot';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const SITE_URL = 'https://emojidict.com';
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}/blog`;
  }
  languages['x-default'] = `${SITE_URL}/en/blog`;
  return {
    title: `${t(loc, 'nav.blog')} | EmojiDict`,
    description: t(loc, 'site.description'),
    alternates: { canonical: `${SITE_URL}/${loc}/blog`, languages },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{t(loc, 'nav.blog')}</h1>
      <div className="space-y-6">
        {blogPosts.map(post => (
          <Link key={post.slug} href={`/${loc}/blog/${post.slug}`} className="block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-slate-900 mb-1">{post.title}</h2>
            <p className="text-sm text-slate-500 mb-2">{post.date} · {post.readTime}</p>
            <p className="text-sm text-slate-600">{post.description}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <AdSlot slot="blog-list-bottom" className="min-h-[90px]" />
      </div>
    </div>
  );
}
