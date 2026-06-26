import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Analytics from '@/components/ui/Analytics';
import CookieConsent from '@/components/ui/CookieConsent';
import { locales, type Locale } from '@/lib/i18n';

import type { Metadata } from 'next';

const SITE_URL = 'https://emojidict.com';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}`;
  }
  languages['x-default'] = `${SITE_URL}/en`;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'EmojiDict — Emoji Meanings, Definitions & Usage',
      template: '%s',
    },
    description: 'Search and discover the meaning of every emoji. Free online emoji dictionary with definitions, keywords, and usage examples.',
    openGraph: {
      title: 'EmojiDict — Emoji Meanings & Definitions',
      description: 'Search 600+ emojis with clear meanings, keywords, Unicode codepoints, and usage examples.',
      url: `${SITE_URL}/${locale}`,
      siteName: 'EmojiDict',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EmojiDict' }],
      locale: locale.replace('-', '_'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EmojiDict — Emoji Meanings & Definitions',
      description: 'Search 600+ emojis with clear meanings, keywords, and usage examples.',
      images: ['/og-image.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';
  return (
    <>
      <Analytics />
      <Navbar locale={validLocale} />
      <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
      <Footer locale={validLocale} />
      <CookieConsent />
    </>
  );
}
