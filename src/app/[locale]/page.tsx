import { emojis, categories, categorySlugs, twemojiUrl, getCategoryCount } from '@/data/emojis';
import { Smile, Cat, Apple, Trophy, Plane, Lightbulb, Heart, Flag, Search, ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/ui/AdSlot';
import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n';

const catIcons: Record<string, any> = { 'Smileys & People': Smile, 'Animals & Nature': Cat, 'Food & Drink': Apple, 'Activities': Trophy, 'Travel & Places': Plane, 'Objects': Lightbulb, 'Symbols': Heart, 'Flags': Flag };

export const metadata = {
  title: 'EmojiDict — Emoji Meanings, Definitions & Usage',
  description: 'Search 600+ emojis with clear meanings, keywords, Unicode codepoints, and usage examples. Free emoji dictionary.',
  alternates: { canonical: '/en' },
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const popular = emojis.slice(0, 48);
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-white px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Emoji Meanings Dictionary</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Search and explore 600+ emoji meanings, definitions, keywords, and Unicode codepoints. Free and fast.</p>
        <form action={`/${loc}/search`} method="get" className="max-w-md mx-auto relative">
          <input type="text" name="q" placeholder="Search for an emoji meaning..." className="w-full rounded-xl border border-slate-200 px-5 py-3 pl-12 text-base shadow-sm" aria-label="Search emoji" />
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <button type="submit" className="absolute right-2 top-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">Search</button>
        </form>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map(cat => {
            const Icon = catIcons[cat] || Smile;
            return (
              <Link key={cat} href={`/${loc}/category/${categorySlugs[cat]}`} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
                <Icon className="w-7 h-7 text-amber-500 mb-2" />
                <div className="font-medium text-slate-800">{cat}</div>
                <div className="text-xs text-slate-500 mt-0.5">{getCategoryCount(cat)} emojis</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular emojis */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Popular Emojis</h2>
          <Link href={`/${loc}/categories`} className="text-sm text-amber-600 hover:underline flex items-center gap-1">View all <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
          {popular.map(e => (
            <Link key={e.codepoint} href={`/${loc}/emoji/${e.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} className="group flex flex-col items-center rounded-lg p-2 hover:bg-amber-50 transition">
              <img src={twemojiUrl(e.codepoint)} alt={e.name} width="36" height="36" className="group-hover:scale-110 transition" loading="lazy" />
              <span className="text-[10px] text-slate-500 mt-1 truncate max-w-[60px]">{e.name.split(' ').slice(0,2).join(' ')}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-slate-50 px-4 py-12">
        <div className="max-w-3xl mx-auto text-sm text-slate-600 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">About EmojiDict</h2>
          <p>EmojiDict is a free online dictionary for emoji meanings. Every emoji has a clear definition, keyword tags, Unicode codepoint, and category. Whether you want to know what a specific emoji means, find the right emoji for a message, or learn emoji history — EmojiDict has you covered.</p>
          <p>Our database covers 600+ emojis across 8 categories: Smileys & People, Animals & Nature, Food & Drink, Activities, Travel & Places, Objects, Symbols, and Flags. All emoji images use Twemoji (MIT License).</p>
        </div>
      </section>
    </div>
  );
}
