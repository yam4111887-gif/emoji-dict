import { emojis, categories, categorySlugs, twemojiUrl, getCategoryCount } from '@/data/emojis';
import { Smile, Cat, Apple, Trophy, Plane, Lightbulb, Heart, Flag, Search, ArrowRight, Target, Rocket } from 'lucide-react';
import { AdSlot } from '@/components/ui/AdSlot';
import Link from 'next/link';
import { locales, type Locale, t } from '@/lib/i18n';

const catIcons: Record<string, any> = { 'Smileys & People': Smile, 'Animals & Nature': Cat, 'Food & Drink': Apple, 'Activities': Trophy, 'Travel & Places': Plane, 'Objects': Lightbulb, 'Symbols': Heart, 'Flags': Flag };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const SITE_URL = 'https://emojidict.com';
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}`;
  }
  languages['x-default'] = `${SITE_URL}/en`;
  return {
    title: `${t(loc, 'site.title')} — ${t(loc, 'home.hero_title')}`,
    description: t(loc, 'home.hero_subtitle'),
    alternates: { canonical: `${SITE_URL}/${loc}`, languages },
    openGraph: {
      title: `${t(loc, 'site.title')} — ${t(loc, 'home.hero_title')}`,
      description: t(loc, 'home.hero_subtitle'),
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EmojiDict' }],
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const popular = emojis.slice(0, 48);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EmojiDict',
    url: 'https://emojidict.com',
    description: 'Free online emoji dictionary with meanings, definitions, keywords, and usage for over 600 emojis.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `https://emojidict.com/${loc}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-white px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{t(loc, 'home.hero_title')}</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">{t(loc, 'home.hero_subtitle')}</p>
        <form action={`/${loc}/search`} method="get" className="max-w-md mx-auto relative">
          <input type="text" name="q" placeholder={t(loc, 'common.search_placeholder')} className="w-full rounded-xl border border-slate-200 px-5 py-3 pl-12 text-base shadow-sm" aria-label={t(loc, 'common.search')} />
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <button type="submit" className="absolute right-2 top-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">{t(loc, 'common.search')}</button>
        </form>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{t(loc, 'home.browse_categories')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map(cat => {
            const Icon = catIcons[cat] || Smile;
            return (
              <Link key={cat} href={`/${loc}/category/${categorySlugs[cat]}`} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
                <Icon className="w-7 h-7 text-amber-500 mb-2" />
                <div className="font-medium text-slate-800">{cat}</div>
                <div className="text-xs text-slate-500 mt-0.5">{getCategoryCount(cat)} {t(loc, 'home.stats_emojis').toLowerCase()}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot slot="home-middle" className="max-w-6xl mx-auto px-4 my-8 min-h-[90px]" />

      {/* Quiz CTA */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-center text-white">
          <div className="mb-3 flex justify-center"><Target size={48} className="text-white" /></div>
          <h2 className="text-2xl font-bold mb-2">{loc === 'en' ? 'Test Your Emoji Knowledge!' : loc === 'zh-TW' ? '測試你的表情符號知識！' : loc === 'es' ? '¡Pon a prueba tu conocimiento!' : loc === 'ja' ? '絵文字の知識をテスト！' : 'Test Your Emoji Knowledge!'}</h2>
          <p className="text-amber-50 mb-4">{loc === 'en' ? 'Take our fun emoji quiz and see how many you can guess correctly!' : loc === 'zh-TW' ? '參加有趣的測驗，看看你能猜對幾個！' : loc === 'es' ? '¡Haz nuestro divertido quiz y averigua cuántos puedes adivinar!' : loc === 'ja' ? '楽しいクイズで何個正解できるか挑戦！' : 'Take our fun emoji quiz and see how many you can guess correctly!'}</p>
          <Link href={`/${loc}/quiz`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition shadow-lg">
            <Rocket size={18} /> {loc === 'en' ? 'Start Quiz' : loc === 'zh-TW' ? '開始測驗' : loc === 'es' ? 'Comenzar' : loc === 'ja' ? 'クイズ開始' : 'Start Quiz'}
          </Link>
        </div>
      </section>

      {/* Popular emojis */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{t(loc, 'home.popular_emojis')}</h2>
          <Link href={`/${loc}/categories`} className="text-sm text-amber-600 hover:underline flex items-center gap-1">{t(loc, 'common.view_all')} <ArrowRight size={14} /></Link>
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
          <h2 className="text-lg font-bold text-slate-900">{t(loc, 'site.title')}</h2>
          <p>{t(loc, 'site.description')}</p>
        </div>
      </section>
    </div>
  );
}
