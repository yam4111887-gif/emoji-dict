'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { t, type Locale } from '@/lib/i18n';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const pathname = usePathname();
  const loc = locale as Locale;

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) window.location.href = `/${locale}/search?q=${encodeURIComponent(q.trim())}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-600">Emoji</span>
          <span className="text-xl font-bold text-slate-800">Dict</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          <Link href={`/${locale}`} className="text-sm text-slate-600 hover:text-slate-900">{t(loc, 'nav.home')}</Link>
          <Link href={`/${locale}/categories`} className="text-sm text-slate-600 hover:text-slate-900">{t(loc, 'nav.categories')}</Link>
          <Link href={`/${locale}/blog`} className="text-sm text-slate-600 hover:text-slate-900">{t(loc, 'nav.blog')}</Link>
          <Link href={`/${locale}/quiz`} className="text-sm text-slate-600 hover:text-slate-900">🎯 Quiz</Link>
          <Link href={`/${locale}/api-docs`} className="text-sm text-slate-600 hover:text-slate-900">API</Link>
          <Link href={`/${locale}/about`} className="text-sm text-slate-600 hover:text-slate-900">{t(loc, 'nav.about')}</Link>
          <form onSubmit={search} className="relative">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t(loc, 'common.search_placeholder')}
              className="w-48 rounded-lg border border-slate-200 px-3 py-1.5 pl-9 text-sm" aria-label={t(loc, 'common.search')} />
            <Search size={14} className="absolute left-3 top-2 text-slate-400" />
          </form>
          <LanguageSwitcher currentLocale={loc} />
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white px-4 py-3 lg:hidden">
          <form onSubmit={search} className="relative mb-3">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t(loc, 'common.search_placeholder')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 pl-9 text-sm" aria-label={t(loc, 'common.search')} />
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          </form>
          <Link href={`/${locale}`} className="block py-2 text-sm" onClick={() => setOpen(false)}>{t(loc, 'nav.home')}</Link>
          <Link href={`/${locale}/categories`} className="block py-2 text-sm" onClick={() => setOpen(false)}>{t(loc, 'nav.categories')}</Link>
          <Link href={`/${locale}/blog`} className="block py-2 text-sm" onClick={() => setOpen(false)}>{t(loc, 'nav.blog')}</Link>
          <Link href={`/${locale}/quiz`} className="block py-2 text-sm" onClick={() => setOpen(false)}>🎯 Quiz</Link>
          <Link href={`/${locale}/api-docs`} className="block py-2 text-sm" onClick={() => setOpen(false)}>API</Link>
          <Link href={`/${locale}/about`} className="block py-2 text-sm" onClick={() => setOpen(false)}>{t(loc, 'nav.about')}</Link>
          <div className="py-2"><LanguageSwitcher currentLocale={loc} /></div>
        </div>
      )}
    </header>
  );
}
