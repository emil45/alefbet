import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import MyWordsContent from './MyWordsContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'myWords', '/my-words');
}

export default async function MyWordsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MyWordsContent />;
}
