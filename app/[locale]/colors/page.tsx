import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import CategoryPage from '@/components/CategoryPage';
import colors from '@/data/colors';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'colors', '/colors');
}

export default async function ColorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CategoryPage
      pageName="colors"
      items={colors}
      translationPrefix="colors"
      audioPath="colors"
      renderMode="color"
    />
  );
}
