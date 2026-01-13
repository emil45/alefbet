import { setRequestLocale, getTranslations } from 'next-intl/server';
import { generatePageMetadata, BASE_URL } from '@/lib/seo';
import LearnContent from './LearnContent';
import Script from 'next/script';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'learn', '/learn');
}

// Generate FAQ Schema for rich snippets
async function generateFAQSchema(locale: string) {
  const t = await getTranslations({ locale, namespace: 'seo' });

  const faqIds = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6'];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqIds.map((faq) => ({
      '@type': 'Question',
      name: t(`faq.${faq}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.${faq}.answer`),
      },
    })),
  };
}

export default async function LearnPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqSchema = await generateFAQSchema(locale);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LearnContent />
    </>
  );
}
