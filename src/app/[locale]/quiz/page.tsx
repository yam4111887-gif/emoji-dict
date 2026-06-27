import type { Metadata } from 'next';
import { locales, defaultLocale, t } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import QuizGame from './QuizGame';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locales.includes(locale as any) ? locale : defaultLocale) as typeof defaultLocale;
  const title = `${t(loc, 'quiz.title')} — ${SITE_CONFIG.name}`;
  const description = t(loc, 'quiz.description');
  const canonical = `${SITE_CONFIG.url}/${loc}/quiz/`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(locales.map(l => [l, `${SITE_CONFIG.url}/${l}/quiz/`])),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      type: 'website',
    },
  };
}

export default async function QuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <QuizGame locale={locale} />;
}
