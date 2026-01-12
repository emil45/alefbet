import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export const proxy = createMiddleware({
  locales,
  defaultLocale,
  // Hebrew (default) has no prefix, other languages get prefix
  localePrefix: 'as-needed',
  // Disable automatic locale detection - only use URL
  localeDetection: false,
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - Static files (images, audio, etc.)
  matcher: ['/((?!api|_next|audio|images|locales|.*\\..*).*)'],
};
