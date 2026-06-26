import { blogPosts } from '@/data/blog';
import Link from 'next/link';
import { locales, type Locale, t } from '@/lib/i18n';
import { AdSlot } from '@/components/ui/AdSlot';

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  const SITE_URL = 'https://emojidict.com';
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}/blog/${slug}`;
  }
  languages['x-default'] = `${SITE_URL}/en/blog/${slug}`;
  return {
    title: `${post.title} | EmojiDict`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/${loc}/blog/${slug}`, languages },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-slate-500">Post not found.</p></div>;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'EmojiDict' },
    publisher: { '@type': 'Organization', name: 'EmojiDict' },
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Link href={`/${loc}/blog`} className="text-sm text-slate-500 hover:text-amber-600 mb-4 inline-block">← {t(loc, 'nav.blog')}</Link>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{post.title}</h1>
      <p className="text-sm text-slate-500 mb-6">{post.date} · {post.readTime}</p>
      {post.content.map((s, i) => (
        <section key={i} className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">{s.heading}</h2>
          {s.body.map((p, j) => <p key={j} className="text-slate-600 leading-relaxed mb-2">{p}</p>)}
          {i === 1 && <div className="my-6"><AdSlot slot="blog-post-middle" className="min-h-[90px]" /></div>}
        </section>
      ))}
    </article>
  );
}
