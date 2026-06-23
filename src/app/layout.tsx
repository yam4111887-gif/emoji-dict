import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EmojiDict — Emoji Meanings & Definitions',
  description: 'Free emoji dictionary with meanings, keywords, and usage for 600+ emojis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="min-h-screen bg-white text-slate-900 antialiased">{children}</body></html>;
}
