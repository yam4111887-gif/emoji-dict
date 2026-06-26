'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { emojis, twemojiUrl, emojiSlug } from '@/data/emojis';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { locales, type Locale, t } from '@/lib/i18n';

function SearchResults() {
  const params = useSearchParams();
  const initialQ = params.get('q') || '';
  const [q, setQ] = useState(initialQ);
  const { locale } = useParams<{ locale: string }>();
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const results = q ? emojis.filter(e => e.name.toLowerCase().includes(q.toLowerCase()) || e.keywords.some(k => k.includes(q.toLowerCase())) || e.category.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">{t(loc, 'common.search')}</h1>
      <div className="relative mb-6">
        <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t(loc, 'common.search_placeholder')} autoFocus aria-label={t(loc, 'common.search')} className="w-full max-w-md rounded-lg border border-slate-200 px-4 py-2 pl-10" />
        <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
      </div>
      <p className="text-sm text-slate-500 mb-4">{results.length} {t(loc, 'common.no_results').includes('No') ? 'results' : '結果'}</p>
      {results.length === 0 && q && (
        <p className="text-slate-500">{t(loc, 'common.no_results')}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {results.map(e => (
          <Link key={e.codepoint} href={`/${locale}/emoji/${emojiSlug(e.name)}`} className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition flex flex-col items-center text-center">
            <img src={twemojiUrl(e.codepoint)} alt={e.name} width="40" height="40" loading="lazy" className="mb-2" />
            <span className="text-xs font-medium text-slate-700 truncate max-w-full">{e.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
