import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import GuessGameContent from './GuessGameContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'guessGame', '/games/guess-game');
}

export default async function GuessGamePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GuessGameContent />;
}
