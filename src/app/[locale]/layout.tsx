import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Analytics from '@/components/ui/Analytics';
import CookieConsent from '@/components/ui/CookieConsent';
import { locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
