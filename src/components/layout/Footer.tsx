import Link from 'next/link';

export function Footer({ locale }: { locale: string }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">EmojiDict</h3>
            <p className="text-xs text-slate-500">Free emoji dictionary with meanings, definitions, and usage for 600+ emojis.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Browse</h3>
            <ul className="space-y-1.5">
              <li><Link href={`/${locale}`} className="text-xs text-slate-500 hover:text-amber-600">Home</Link></li>
              <li><Link href={`/${locale}/categories`} className="text-xs text-slate-500 hover:text-amber-600">Categories</Link></li>
              <li><Link href={`/${locale}/blog`} className="text-xs text-slate-500 hover:text-amber-600">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Legal</h3>
            <ul className="space-y-1.5">
              <li><Link href={`/${locale}/privacy`} className="text-xs text-slate-500 hover:text-amber-600">Privacy</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-xs text-slate-500 hover:text-amber-600">Terms</Link></li>
              <li><Link href={`/${locale}/disclaimer`} className="text-xs text-slate-500 hover:text-amber-600">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Credits</h3>
            <p className="text-xs text-slate-500">Emoji images: <a href="https://github.com/twitter/twemoji" className="hover:text-amber-600" rel="noopener noreferrer">Twemoji</a> (MIT License)</p>
          </div>
        </div>
        <div className="mt-6 border-t border-slate-200 pt-4 text-center">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} EmojiDict. All emoji images from Twemoji (MIT License).</p>
        </div>
      </div>
    </footer>
  );
}
