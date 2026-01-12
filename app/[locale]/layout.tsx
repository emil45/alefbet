import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, getDirection, type Locale } from '@/i18n/config';
import Providers from '../providers';
import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'לפדי - אתר חינוכי לילדים ללימוד אותיות עברית',
    en: 'Lepdy - Educational Hebrew Learning App for Kids',
    ru: 'Lepdy - Обучающее приложение для изучения иврита для детей',
  };

  const descriptions: Record<string, string> = {
    he: 'אתר חינוכי אינטראקטיבי לילדים - לימוד אותיות עברית, מספרים וצבעים לגיל הרך',
    en: 'Interactive educational app for children - learn Hebrew letters, numbers and colors',
    ru: 'Интерактивное образовательное приложение для детей - изучение ивритских букв, цифр и цветов',
  };

  const baseUrl = 'https://www.lepdy.com';

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
    alternates: {
      canonical: locale === 'he' ? baseUrl : `${baseUrl}/${locale}`,
      languages: {
        he: baseUrl,
        en: `${baseUrl}/en`,
        ru: `${baseUrl}/ru`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.he,
      description: descriptions[locale] || descriptions.he,
      url: locale === 'he' ? baseUrl : `${baseUrl}/${locale}`,
      siteName: 'Lepdy',
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <body style={{ margin: 0 }}>
        <NextIntlClientProvider messages={messages}>
          <Providers direction={direction}>
            <Box
              sx={{
                padding: '20px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '30px',
                backgroundImage: 'url("/images/background.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                position: 'relative',
                overflowX: 'hidden',
              }}
            >
              {children}
              <Box sx={{ textAlign: 'center', mt: '25px' }}>
                <Typography variant="body2" color="textSecondary">
                  Noa &copy; {new Date().getFullYear()}. All rights reserved
                </Typography>
              </Box>
            </Box>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
