import { categories, categorySlugs, getCategoryCount, twemojiUrl, emojis } from '@/data/emojis';
import Link from 'next/link';
import { Smile, Cat, Apple, Trophy, Plane, Lightbulb, Heart, Flag } from 'lucide-react';
import { locales, type Locale, t } from '@/lib/i18n';
import { AdSlot } from '@/components/ui/AdSlot';

const icons: Record<string, any> = { 'Smileys & People': Smile, 'Animals & Nature': Cat, 'Food & Drink': Apple, 'Activities': Trophy, 'Travel & Places': Plane, 'Objects': Lightbulb, 'Symbols': Heart, 'Flags': Flag };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const SITE_URL = 'https://emojidict.com';
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}/categories`;
  }
  languages['x-default'] = `${SITE_URL}/en/categories`;
  return {
    title: `${t(loc, 'nav.categories')} | EmojiDict`,
    description: t(loc, 'site.description'),
    alternates: { canonical: `${SITE_URL}/${loc}/categories`, languages },
  };
}

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{t(loc, 'nav.categories')}</h1>
      <p className="text-slate-600 mb-8">{t(loc, 'home.browse_categories')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(cat => {
          const Icon = icons[cat] || Smile;
          const sample = emojis.filter(e => e.category === cat).slice(0, 6);
          return (
            <Link key={cat} href={`/${loc}/category/${categorySlugs[cat]}`} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><Icon className="w-6 h-6 text-amber-500" /><span className="font-bold text-slate-800">{cat}</span></div>
                <span className="text-xs text-slate-500">{getCategoryCount(cat)}</span>
              </div>
              <div className="flex gap-1">{sample.map(e => <img key={e.codepoint} src={twemojiUrl(e.codepoint)} alt={e.name} width="28" height="28" loading="lazy" />)}</div>
            </Link>
          );
        })}
      </div>
      <div className="mt-8">
        <AdSlot slot="categories-bottom" className="min-h-[90px]" />
      </div>
    </div>
  );
}
