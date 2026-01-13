import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import CategoryPage from '@/components/CategoryPage';
import letters from '@/data/letters';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'letters', '/letters');
}

export default async function LettersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CategoryPage
      pageName="letters"
      items={letters}
      translationPrefix="letters"
      audioPath="letters"
      renderMode="text"
      forceRTL={true}
      hasFullName={true}
    />
  );
}
