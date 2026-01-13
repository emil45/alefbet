import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import CategoryPage from '@/components/CategoryPage';
import shapes from '@/data/shapes';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'shapes', '/shapes');
}

export default async function ShapesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CategoryPage
      pageName="shapes"
      items={shapes}
      translationPrefix="shapes"
      audioPath="shapes"
      renderMode="element"
    />
  );
}
