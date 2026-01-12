import { LANGUAGE_BY_CODE, defaultLocale } from '@/i18n/config';

/**
 * Get language-specific route with proper prefix
 */
export const getLanguageSpecificRoute = (route: string, locale?: string): string => {
  if (!locale) return route;

  const languageConfig = LANGUAGE_BY_CODE[locale];

  // Return default route if language not supported
  if (!languageConfig) return route;

  // Default language has no prefix
  if (languageConfig.isDefault) return route;

  // Other languages get prefix
  return `/${locale}${route}`;
};

/**
 * Generate alternative language URLs for hreflang
 */
export const getAlternativeLanguageUrls = (currentRoute: string) => {
  const baseUrl = 'https://www.lepdy.com';
  const urls: Record<string, string> = {};

  for (const lang of Object.values(LANGUAGE_BY_CODE)) {
    urls[lang.code] = baseUrl + getLanguageSpecificRoute(currentRoute, lang.code);
  }

  return urls;
};
