import { RoutesEnum } from '../models/RoutesEnum';
import { LANGUAGE_BY_CODE, DEFAULT_LANGUAGE, PREFIXED_LANGUAGES } from '../config/languages';

/**
 * Get language-specific route with proper prefix
 * @param route - Base route from RoutesEnum
 * @param lang - Language code
 * @returns Full route with language prefix if needed
 */
export const getLanguageSpecificRoute = (route: RoutesEnum, lang?: string): string => {
  if (!lang) return route;
  
  const languageConfig = LANGUAGE_BY_CODE[lang];
  
  // Return default route if language not supported
  if (!languageConfig) return route;
  
  // Default language has no prefix
  if (languageConfig.isDefault) return route;
  
  // Other languages get prefix
  return `/${lang}${route}`;
};

/**
 * Extract current language from URL path
 * @returns Language code detected from path
 */
export const getCurrentLanguageFromPath = (): string => {
  const path = window.location.pathname;
  
  // Check each prefixed language
  for (const lang of PREFIXED_LANGUAGES) {
    if (path.startsWith(`/${lang.code}/`) || path === `/${lang.code}`) {
      return lang.code;
    }
  }
  
  // Default to default language
  return DEFAULT_LANGUAGE.code;
};

/**
 * Generate alternative language URLs for hreflang
 * @param currentRoute - Current route without language prefix
 * @returns Object with all language variants
 */
export const getAlternativeLanguageUrls = (currentRoute: RoutesEnum) => {
  const baseUrl = 'https://www.lepdy.com';
  const urls: Record<string, string> = {};
  
  for (const lang of Object.values(LANGUAGE_BY_CODE)) {
    urls[lang.code] = baseUrl + getLanguageSpecificRoute(currentRoute, lang.code);
  }
  
  return urls;
};

/**
 * Remove language prefix from path
 * @param path - Full path with potential language prefix
 * @returns Path without language prefix
 */
export const stripLanguageFromPath = (path: string): string => {
  for (const lang of PREFIXED_LANGUAGES) {
    if (path.startsWith(`/${lang.code}`)) {
      return path.replace(`/${lang.code}`, '') || '/';
    }
  }
  return path;
};