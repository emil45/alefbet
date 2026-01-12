// Centralized language configuration
export interface LanguageConfig {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'he',
    name: 'עברית',
    direction: 'rtl',
    isDefault: true,
  },
  {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    isDefault: false,
  },
  {
    code: 'ru',
    name: 'Русский',
    direction: 'ltr',
    isDefault: false,
  },
];

export const locales = SUPPORTED_LANGUAGES.map((lang) => lang.code) as ['he', 'en', 'ru'];
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'he';

export const LANGUAGE_BY_CODE = SUPPORTED_LANGUAGES.reduce(
  (acc, lang) => {
    acc[lang.code] = lang;
    return acc;
  },
  {} as Record<string, LanguageConfig>
);

export const getDirection = (locale: string): 'ltr' | 'rtl' => {
  return LANGUAGE_BY_CODE[locale]?.direction || 'rtl';
};
