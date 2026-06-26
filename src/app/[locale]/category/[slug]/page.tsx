import { emojis, categorySlugs, slugToCategory, twemojiUrl, emojiSlug } from '@/data/emojis';
import Link from 'next/link';
import { locales, type Locale, t } from '@/lib/i18n';
import { AdSlot } from '@/components/ui/AdSlot';

export function generateStaticParams() {
  return Object.values(categorySlugs).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const cat = slugToCategory[slug] || slug;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const SITE_URL = 'https://emojidict.com';
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}/category/${slug}`;
  }
  languages['x-default'] = `${SITE_URL}/en/category/${slug}`;
  return {
    title: `${cat} Emojis — Meanings & Definitions | EmojiDict`,
    description: `Browse all ${cat} emojis with meanings and definitions.`,
    alternates: { canonical: `${SITE_URL}/${loc}/category/${slug}`, languages },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const cat = slugToCategory[slug] || slug;
  const list = emojis.filter(e => e.category === cat);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href={`/${loc}/categories`} className="text-sm text-slate-500 hover:text-amber-600 mb-4 inline-block">← {t(loc, 'common.view_all')}</Link>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{cat}</h1>
      <p className="text-slate-600 mb-6">{list.length} {t(loc, 'home.stats_emojis').toLowerCase()}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {list.map(e => (
          <Link key={e.codepoint} href={`/${loc}/emoji/${emojiSlug(e.name)}`} className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition flex flex-col items-center text-center">
            <img src={twemojiUrl(e.codepoint)} alt={e.name} width="40" height="40" loading="lazy" className="mb-2" />
            <span className="text-xs font-medium text-slate-700 truncate max-w-full">{e.name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <AdSlot slot="category-bottom" className="min-h-[90px]" />
      </div>
    </div>
  );
}
