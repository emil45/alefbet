import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import StickersContent from './StickersContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'stickers', '/stickers');
}

export default async function StickersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StickersContent />;
}
