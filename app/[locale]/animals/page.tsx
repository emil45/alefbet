import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import CategoryPage from '@/components/CategoryPage';
import animals from '@/data/animals';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'animals', '/animals');
}

export default async function AnimalsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CategoryPage
      pageName="animals"
      items={animals}
      translationPrefix="animals"
      audioPath="animals"
      renderMode="image"
      category="animals"
    />
  );
}
