import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EmojiDict — Emoji Meanings & Definitions',
  description: 'Free emoji dictionary with meanings, keywords, and usage for 600+ emojis.',
  metadataBase: new URL('https://emojidict.com'),
  openGraph: {
    title: 'EmojiDict — Emoji Meanings & Definitions',
    description: 'Free emoji dictionary with meanings, keywords, and usage for 600+ emojis.',
    siteName: 'EmojiDict',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EmojiDict' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmojiDict — Emoji Meanings & Definitions',
    description: 'Free emoji dictionary with meanings, keywords, and usage for 600+ emojis.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="min-h-screen bg-white text-slate-900 antialiased">{children}</body></html>;
}
