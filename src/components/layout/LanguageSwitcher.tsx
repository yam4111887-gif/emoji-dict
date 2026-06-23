'use client';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { locales, localeNames, type Locale } from '@/lib/i18n';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    const segments = pathname.split('/');
    if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px] z-50">
          {locales.map(l => (
            <button
              key={l}
              onClick={() => { switchLocale(l); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 ${l === currentLocale ? 'text-amber-600 font-medium' : 'text-slate-600'}`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
