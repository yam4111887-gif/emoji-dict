import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to /en/
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en/', request.url));
  }

  // Redirect paths without locale to /en/
  const locales = ['en', 'zh-TW', 'es', 'ja', 'de', 'fr', 'pt', 'ko', 'it', 'hi', 'ar', 'ru', 'th', 'vi', 'id', 'tr', 'pl', 'nl', 'sv', 'cs', 'el', 'uk', 'ro', 'hu', 'da', 'no', 'fi', 'he', 'ms', 'pt-BR'];
  const hasLocale = locales.some(l => pathname.startsWith(`/${l}`) || pathname.startsWith(`/${l}/`));
  
  if (!hasLocale && !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.startsWith('/favicon') && !pathname.startsWith('/icon') && !pathname.startsWith('/og-image') && !pathname.startsWith('/apple') && !pathname.startsWith('/manifest') && !pathname.startsWith('/robots') && !pathname.startsWith('/sitemap')) {
    return NextResponse.redirect(new URL(`/en${pathname === '/' ? '/' : pathname + '/'}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|og-image|apple-icon|manifest.json|robots.txt|sitemap.xml).*)'],
};
