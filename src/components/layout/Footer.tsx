import Link from 'next/link';
import { t, type Locale } from '@/lib/i18n';

export function Footer({ locale }: { locale: string }) {
  const loc = locale as Locale;
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">EmojiDict</h3>
            <p className="text-xs text-slate-500">{t(loc, 'site.description')}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">{t(loc, 'nav.categories')}</h3>
            <ul className="space-y-1.5">
              <li><Link href={`/${locale}`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.home')}</Link></li>
              <li><Link href={`/${locale}/categories`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.categories')}</Link></li>
              <li><Link href={`/${locale}/blog`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.blog')}</Link></li>
              <li><Link href={`/${locale}/about`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.about')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">{t(loc, 'footer.legal' as any) || 'Legal'}</h3>
            <ul className="space-y-1.5">
              <li><Link href={`/${locale}/privacy`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.privacy')}</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.terms')}</Link></li>
              <li><Link href={`/${locale}/disclaimer`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.disclaimer')}</Link></li>
              <li><Link href={`/${locale}/cookies`} className="text-xs text-slate-500 hover:text-amber-600">{t(loc, 'nav.cookies')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">{t(loc, 'footer.credits' as any) || 'Credits'}</h3>
            <p className="text-xs text-slate-500">{t(loc, 'footer.twemoji')}</p>
            <p className="text-xs text-slate-500 mt-1">{t(loc, 'footer.disclaimer')}</p>
            <p className="text-xs text-slate-500 mt-1">
              <a href="https://github.com/yam4111887-gif/emoji-dict" className="hover:text-amber-600" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
        </div>
        <div className="mt-6 border-t border-slate-200 pt-4 text-center">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} EmojiDict. {t(loc, 'footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
