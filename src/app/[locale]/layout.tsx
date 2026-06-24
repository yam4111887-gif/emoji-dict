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
    alternates: { canonical: `${SITE_URL}/${locale}`, languages },
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
