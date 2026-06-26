import { emojis, twemojiUrl, emojiSlug } from '@/data/emojis';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { locales, type Locale, t } from '@/lib/i18n';
import { AdSlot } from '@/components/ui/AdSlot';

export function generateStaticParams() {
  return emojis.map(e => ({ slug: emojiSlug(e.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const SITE_URL = 'https://emojidict.com';
  const emoji = emojis.find(e => emojiSlug(e.name) === slug);
  if (!emoji) return { title: 'Emoji Not Found' };
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}/emoji/${slug}`;
  }
  languages['x-default'] = `${SITE_URL}/en/emoji/${slug}`;
  return {
    title: `${emoji.name} (${emoji.char}) Meaning & Definition | EmojiDict`,
    description: emoji.description,
    alternates: { canonical: `${SITE_URL}/${loc}/emoji/${slug}`, languages },
    openGraph: {
      title: `${emoji.name} (${emoji.char}) Meaning`,
      description: emoji.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: emoji.name }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${emoji.name} (${emoji.char}) Meaning`,
      description: emoji.description,
    },
  };
}

export default async function EmojiPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const emoji = emojis.find(e => emojiSlug(e.name) === slug);
  if (!emoji) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-slate-500">{t(loc, 'common.no_results')}</p></div>;

  const related = emojis.filter(e => e.category === emoji.category && e.codepoint !== emoji.codepoint).slice(0, 12);

  const codepointHex = emoji.codepoint.split('-').map(c => `U+${c.toUpperCase()}`).join(' ');
  const htmlEntity = `&#x${emoji.codepoint.split('-')[0]};`;

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: emoji.name,
    description: emoji.description,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'EmojiDict' },
    url: `https://emojidict.com/${loc}/emoji/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t(loc, 'nav.home'), item: `https://emojidict.com/${loc}` },
      { '@type': 'ListItem', position: 2, name: emoji.category, item: `https://emojidict.com/${loc}/category/${emoji.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}` },
      { '@type': 'ListItem', position: 3, name: emoji.name, item: `https://emojidict.com/${loc}/emoji/${slug}` },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/${loc}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-amber-600 mb-6"><ArrowLeft size={14} /> {t(loc, 'nav.home')}</Link>

        {/* Hero */}
        <div className="text-center mb-8">
          <img src={twemojiUrl(emoji.codepoint)} alt={emoji.name} width="120" height="120" className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900">{emoji.name}</h1>
          <p className="text-sm text-slate-500 mt-1">{emoji.category}</p>
          <CopyButton char={emoji.char} locale={loc} />
        </div>

        {/* Info card */}
        <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><span className="text-slate-500">{t(loc, 'common.category')}:</span> <Link href={`/${loc}/category/${emoji.category.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`} className="text-amber-600 hover:underline">{emoji.category}</Link></div>
            <div><span className="text-slate-500">{t(loc, 'common.codepoint')}:</span> <span className="font-mono">{codepointHex}</span></div>
            <div><span className="text-slate-500">{t(loc, 'common.html_entity')}:</span> <span className="font-mono">{htmlEntity}</span></div>
            <div><span className="text-slate-500">Emoji:</span> <span className="font-mono text-lg">{emoji.char}</span></div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">{emoji.char} — {t(loc, 'emoji.meaning')}</h2>
          <p className="text-slate-600 leading-relaxed">{emoji.description}</p>
        </div>

        {/* Keywords */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">{t(loc, 'common.keywords')}</h2>
          <div className="flex flex-wrap gap-2">
            {emoji.keywords.map(k => <span key={k} className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full">{k}</span>)}
          </div>
        </div>

        <AdSlot slot="emoji-middle" className="my-6 min-h-[90px]" />

        {/* Related */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">{t(loc, 'common.related')}</h2>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {related.map(r => (
              <Link key={r.codepoint} href={`/${loc}/emoji/${emojiSlug(r.name)}`} className="flex flex-col items-center p-2 rounded-lg hover:bg-amber-50">
                <img src={twemojiUrl(r.codepoint)} alt={r.name} width="32" height="32" loading="lazy" />
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">{t(loc, 'footer.twemoji')}. {t(loc, 'footer.disclaimer')}</p>
      </div>
    </div>
  );
}
