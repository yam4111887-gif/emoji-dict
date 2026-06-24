import { emojis, twemojiUrl, emojiSlug } from '@/data/emojis';
import Link from 'next/link';
import { Copy, ArrowLeft } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return emojis.map(e => ({ slug: emojiSlug(e.name) }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(p => {
    const emoji = emojis.find(e => emojiSlug(e.name) === p.slug);
    if (!emoji) return { title: 'Emoji Not Found' };
    return {
      title: `${emoji.name} (${emoji.char}) Meaning & Definition | EmojiDict`,
      description: emoji.description,
    };
  });
}

export default async function EmojiPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const emoji = emojis.find(e => emojiSlug(e.name) === slug);
  if (!emoji) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-slate-500">Emoji not found.</p></div>;

  const related = emojis.filter(e => e.category === emoji.category && e.codepoint !== emoji.codepoint).slice(0, 12);

  const codepointHex = emoji.codepoint.split('-').map(c => `U+${c.toUpperCase()}`).join(' ');
  const htmlEntity = `&#x${emoji.codepoint.split('-')[0]};`;

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/${loc}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-amber-600 mb-6"><ArrowLeft size={14} /> Back</Link>

        {/* Hero */}
        <div className="text-center mb-8">
          <img src={twemojiUrl(emoji.codepoint)} alt={emoji.name} width="120" height="120" className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900">{emoji.name}</h1>
          <p className="text-sm text-slate-500 mt-1">{emoji.category}</p>
          <CopyButton char={emoji.char} />
        </div>

        {/* Info card */}
        <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><span className="text-slate-500">Emoji:</span> <span className="font-mono text-lg">{emoji.char}</span></div>
            <div><span className="text-slate-500">Codepoint:</span> <span className="font-mono">{codepointHex}</span></div>
            <div><span className="text-slate-500">HTML Entity:</span> <span className="font-mono">{htmlEntity}</span></div>
            <div><span className="text-slate-500">Category:</span> <Link href={`/${loc}/category/${emoji.category.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`} className="text-amber-600 hover:underline">{emoji.category}</Link></div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">What does {emoji.char} mean?</h2>
          <p className="text-slate-600 leading-relaxed">{emoji.description}</p>
        </div>

        {/* Keywords */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {emoji.keywords.map(k => <span key={k} className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full">{k}</span>)}
          </div>
        </div>

        {/* Related */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Related Emojis</h2>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {related.map(r => (
              <Link key={r.codepoint} href={`/${loc}/emoji/${emojiSlug(r.name)}`} className="flex flex-col items-center p-2 rounded-lg hover:bg-amber-50">
                <img src={twemojiUrl(r.codepoint)} alt={r.name} width="32" height="32" loading="lazy" />
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">Emoji image from Twemoji (MIT License). Meaning is for educational purposes only.</p>
      </div>
    </div>
  );
}
