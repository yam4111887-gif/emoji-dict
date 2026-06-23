import { emojis, categorySlugs, slugToCategory, twemojiUrl, emojiSlug } from '@/data/emojis';
import Link from 'next/link';

export function generateStaticParams() {
  return Object.values(categorySlugs).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = slugToCategory[slug] || slug;
  return { title: `${cat} Emojis — Meanings & Definitions | EmojiDict`, description: `Browse all ${cat} emojis with meanings and definitions.` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = slugToCategory[slug] || slug;
  const list = emojis.filter(e => e.category === cat);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/en/categories" className="text-sm text-slate-500 hover:text-amber-600 mb-4 inline-block">← All Categories</Link>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{cat}</h1>
      <p className="text-slate-600 mb-6">{list.length} emojis</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {list.map(e => (
          <Link key={e.codepoint} href={`/en/emoji/${emojiSlug(e.name)}`} className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition flex flex-col items-center text-center">
            <img src={twemojiUrl(e.codepoint)} alt={e.name} width="40" height="40" loading="lazy" className="mb-2" />
            <span className="text-xs font-medium text-slate-700 truncate max-w-full">{e.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
