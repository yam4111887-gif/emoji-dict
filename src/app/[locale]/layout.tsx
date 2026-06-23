import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh-TW' }, { locale: 'es' }, { locale: 'ja' }];
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar locale={'en'} />
      <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
      <Footer locale={'en'} />
    </>
  );
}
