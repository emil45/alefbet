import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import CategoryPage from '@/components/CategoryPage';
import numbers from '@/data/numbers';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'numbers', '/numbers');
}

export default async function NumbersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CategoryPage
      pageName="numbers"
      items={numbers}
      translationPrefix="numbers"
      audioPath="numbers"
      renderMode="text"
      hasFullName={true}
      category="numbers"
    />
  );
}
