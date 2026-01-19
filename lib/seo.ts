import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const BASE_URL = 'https://www.lepdy.com';

export function getLocaleUrl(locale: string, path: string): string {
  return locale === 'he' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`;
}

export function getOgLocale(locale: string): string {
  return locale === 'he' ? 'he_IL' : locale === 'ru' ? 'ru_RU' : 'en_US';
}

export async function generatePageMetadata(
  locale: string,
  pageName: string,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `seo.pages.${pageName}` });
  const currentUrl = getLocaleUrl(locale, path);

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: currentUrl,
      languages: {
        he: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
        ru: `${BASE_URL}/ru${path}`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: currentUrl,
      siteName: 'Lepdy',
      locale: getOgLocale(locale),
      type: 'website',
    },
  };
}
