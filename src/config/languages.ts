// Centralized language configuration
export interface LanguageConfig {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
  hasUrlPrefix: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'he',
    name: 'עברית',
    direction: 'rtl',
    isDefault: true,
    hasUrlPrefix: false, // Default language has no prefix
  },
  {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    isDefault: false,
    hasUrlPrefix: true,
  },
  {
    code: 'ru',
    name: 'Русский',
    direction: 'ltr',
    isDefault: false,
    hasUrlPrefix: true,
  },
];

// Derived constants for performance
export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.find(lang => lang.isDefault)!;
export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(lang => lang.code);
export const PREFIXED_LANGUAGES = SUPPORTED_LANGUAGES.filter(lang => lang.hasUrlPrefix);
export const LANGUAGE_BY_CODE = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
  acc[lang.code] = lang;
  return acc;
}, {} as Record<string, LanguageConfig>);