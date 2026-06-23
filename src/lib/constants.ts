export const SITE_CONFIG = {
  name: 'EmojiDict',
  url: 'https://emojidict.com',
  description: 'Free online emoji dictionary with meanings, definitions, keywords, and usage for over 500 emojis.',
  GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
  CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID || '',
  KOFI_ID: process.env.NEXT_PUBLIC_KOFI_ID || '',
};

export const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/categories', labelKey: 'nav.categories' },
  { href: '/blog', labelKey: 'nav.blog' },
] as const;

export const footerLinks = {
  product: [
    { href: '/', labelKey: 'nav.home' },
    { href: '/categories', labelKey: 'nav.categories' },
    { href: '/blog', labelKey: 'nav.blog' },
  ],
  legal: [
    { href: '/privacy', labelKey: 'nav.privacy' },
    { href: '/terms', labelKey: 'nav.terms' },
    { href: '/disclaimer', labelKey: 'nav.disclaimer' },
    { href: '/cookies', labelKey: 'nav.cookies' },
  ],
};
