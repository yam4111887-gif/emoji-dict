'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const pathname = usePathname();

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
          <Link href={`/${locale}`} className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
          <Link href={`/${locale}/categories`} className="text-sm text-slate-600 hover:text-slate-900">Categories</Link>
          <Link href={`/${locale}/blog`} className="text-sm text-slate-600 hover:text-slate-900">Blog</Link>
          <form onSubmit={search} className="relative">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search emoji..."
              className="w-48 rounded-lg border border-slate-200 px-3 py-1.5 pl-9 text-sm" aria-label="Search emoji" />
            <Search size={14} className="absolute left-3 top-2 text-slate-400" />
          </form>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white px-4 py-3 lg:hidden">
          <form onSubmit={search} className="relative mb-3">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search emoji..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 pl-9 text-sm" />
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          </form>
          <Link href={`/${locale}`} className="block py-2 text-sm" onClick={() => setOpen(false)}>Home</Link>
          <Link href={`/${locale}/categories`} className="block py-2 text-sm" onClick={() => setOpen(false)}>Categories</Link>
          <Link href={`/${locale}/blog`} className="block py-2 text-sm" onClick={() => setOpen(false)}>Blog</Link>
        </div>
      )}
    </header>
  );
}
