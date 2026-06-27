import { locales, type Locale, t } from '@/lib/i18n';
import { Smile } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  const SITE_URL = 'https://emojidict.com';
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}/about`;
  }
  languages['x-default'] = `${SITE_URL}/en/about`;
  return {
    title: `${t(loc, 'about.title')} | EmojiDict`,
    description: t(loc, 'about.description'),
    alternates: { canonical: `${SITE_URL}/${loc}/about`, languages },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';

  const stats = [
    { value: '1,100+', labelKey: 'home.stats_emojis' as const },
    { value: '8', labelKey: 'home.stats_categories' as const },
    { value: '30', labelKey: 'home.stats_locales' as const },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Smile className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t(loc, 'about.title')}</h1>
        <p className="text-slate-600">{t(loc, 'site.description')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {stats.map(s => (
          <div key={s.labelKey} className="text-center bg-amber-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-amber-600">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{t(loc, s.labelKey)}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">{t(loc, 'about.mission')}</h2>
        <p className="text-slate-600 leading-relaxed mb-2">
          EmojiDict was created to be the most accessible and comprehensive emoji dictionary on the web. We believe that emoji — as the fastest-growing visual language in human history — deserve clear, well-organized explanations that anyone can understand.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Every emoji entry includes a plain-language definition, relevant keywords, Unicode codepoint, HTML entity, and related emojis. Our content is available in 30 languages, making emoji meanings accessible to billions of people worldwide.
        </p>
      </section>

      {/* Data Sources */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">{t(loc, 'about.data_title')}</h2>
        <ul className="text-slate-600 leading-relaxed space-y-2">
          <li><strong>Twemoji</strong> — All emoji images are from Twitter/X Twemoji, an open-source emoji set released under the <a href="https://github.com/twitter/twemoji/blob/master/LICENSE" className="text-amber-600 hover:underline" rel="noopener noreferrer">MIT License</a>. This ensures consistent, high-quality emoji rendering across all devices.</li>
          <li><strong>Unicode CLDR</strong> — Emoji names and short descriptions are based on data from the Unicode Common Locale Data Repository, the international standard for locale data.</li>
          <li><strong>Original Content</strong> — All emoji descriptions, keyword tags, and explanations are originally written by the EmojiDict team.</li>
        </ul>
      </section>

      {/* What You Can Do */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">What You Can Do Here</h2>
        <ul className="text-slate-600 leading-relaxed space-y-2">
          <li>🔍 <strong>Search</strong> — Find any emoji by name, keyword, or category</li>
          <li>📖 <strong>Learn</strong> — Read clear definitions and discover related emojis</li>
          <li>📋 <strong>Copy</strong> — One-click copy of any emoji character</li>
          <li>🌐 <strong>Browse in 30 languages</strong> — Switch languages from the menu</li>
          <li>💻 <strong>Developers</strong> — Get Unicode codepoints and HTML entities for every emoji</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">{t(loc, 'about.contact_title')}</h2>
        <p className="text-slate-600 leading-relaxed">
          For questions, feedback, bug reports, or suggestions, please open an issue on our{' '}
          <a href="https://github.com/yam4111887-gif/emoji-dict" className="text-amber-600 hover:underline" rel="noopener noreferrer">GitHub repository</a>.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-slate-800">Is EmojiDict free?</h3>
            <p className="text-slate-600">Yes, completely free. No account required.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Why do emojis look different here than on my phone?</h3>
            <p className="text-slate-600">EmojiDict uses Twemoji for consistency. Each platform (Apple, Google, Samsung, etc.) has its own emoji art style. The meaning stays the same.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">How many emojis are there?</h3>
            <p className="text-slate-600">Unicode has defined over 3,600 emojis. EmojiDict currently covers 1,100+ of the most commonly used ones, with more being added regularly.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Can I use these emoji meanings on my own site?</h3>
            <p className="text-slate-600">Please write your own content rather than copying ours. You are welcome to link to any EmojiDict page. See our <Link href={`/${loc}/terms`} className="text-amber-600 hover:underline">Terms of Service</Link> for details.</p>
          </div>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link href={`/${loc}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition">
          Start Exploring Emojis →
        </Link>
      </div>
    </div>
  );
}
