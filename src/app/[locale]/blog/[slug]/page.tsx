import { blogPosts } from '@/data/blog';
import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: `${post.title} | EmojiDict`, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p>Post not found.</p></div>;
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Link href={`/${loc}/blog`} className="text-sm text-slate-500 hover:text-amber-600 mb-4 inline-block">← All Posts</Link>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{post.title}</h1>
      <p className="text-sm text-slate-500 mb-6">{post.date} · {post.readTime}</p>
      {post.content.map((s, i) => (
        <section key={i} className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">{s.heading}</h2>
          {s.body.map((p, j) => <p key={j} className="text-slate-600 leading-relaxed mb-2">{p}</p>)}
        </section>
      ))}
    </article>
  );
}
