import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import SoundMatchingContent from './SoundMatchingContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'soundMatching', '/games/sound-matching');
}

export default async function SoundMatchingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SoundMatchingContent />;
}
