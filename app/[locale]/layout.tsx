import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, getDirection, type Locale } from '@/i18n/config';
import Providers from '../providers';
import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import Script from 'next/script';
import { BASE_URL, getLocaleUrl, getOgLocale } from '@/lib/seo';
import { Roboto } from 'next/font/google';
import Footer from '@/components/Footer';

// Optimized font loading with next/font
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap', // Prevents FOIT (Flash of Invisible Text)
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// JSON-LD structured data for SEO
function generateJsonLd(locale: string) {
  const names: Record<string, string> = {
    he: 'לפדי - לימוד עברית לילדים',
    en: 'Lepdy - Hebrew Learning for Kids',
    ru: 'Lepdy - Изучение иврита для детей',
  };

  const descriptions: Record<string, string> = {
    he: 'אתר חינוכי אינטראקטיבי לילדים - לימוד אותיות עברית, מספרים, צבעים, צורות ומשחקים חינוכיים. עם הגיית ילדה ישראלית אמיתית.',
    en: 'Interactive educational website for children - learn Hebrew letters, numbers, colors, shapes and educational games. With real Israeli child pronunciation.',
    ru: 'Интерактивный образовательный сайт для детей - изучение ивритских букв, цифр, цветов, форм и развивающие игры. С реальным произношением израильского ребенка.',
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${BASE_URL}/#application`,
        name: names[locale] || names.he,
        description: descriptions[locale] || descriptions.he,
        url: locale === 'he' ? BASE_URL : `${BASE_URL}/${locale}`,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web Browser',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'ILS',
        },
        inLanguage: ['he', 'en', 'ru'],
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
          audienceType: 'Children',
          suggestedMinAge: 2,
          suggestedMaxAge: 7,
        },
        author: {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Lepdy',
        alternateName: 'לפדי',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/icon-512x512.png`,
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Lepdy',
        alternateName: 'לפדי',
        inLanguage: ['he', 'en', 'ru'],
        publisher: {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
        },
      },
    ],
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const currentUrl = locale === 'he' ? BASE_URL : `${BASE_URL}/${locale}`;

  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
    keywords: locale === 'he'
      ? ['לימוד אותיות', 'אלף בית לילדים', 'משחקים חינוכיים', 'עברית לגיל הרך', 'לימוד מספרים', 'משחקי זיכרון לילדים']
      : locale === 'ru'
      ? ['учить иврит', 'алфавит для детей', 'развивающие игры', 'еврейские буквы']
      : ['learn hebrew', 'hebrew alphabet', 'alef bet', 'educational games for kids', 'hebrew for toddlers'],
    alternates: {
      canonical: currentUrl,
      languages: {
        he: BASE_URL,
        en: `${BASE_URL}/en`,
        ru: `${BASE_URL}/ru`,
      },
    },
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      url: currentUrl,
      siteName: 'Lepdy',
      locale: locale === 'he' ? 'he_IL' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t('siteTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
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

  const jsonLd = generateJsonLd(locale);

  return (
    <html lang={locale} dir={direction}>
      <head>
        {/* Preload background image to improve LCP */}
        <link
          rel="preload"
          href="/images/background.jpg"
          as="image"
          type="image/jpeg"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={roboto.className} style={{ margin: 0 }}>
        {/* Google Analytics + Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XMN00ZGJH4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XMN00ZGJH4');
            gtag('config', 'AW-17878894842');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <Providers direction={direction} locale={locale as 'he' | 'en' | 'ru'}>
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
              <Footer />
            </Box>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
