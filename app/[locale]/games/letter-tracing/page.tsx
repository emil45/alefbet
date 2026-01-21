import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo';
import LetterTracingContent from './LetterTracingContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'letterTracing', '/games/letter-tracing');
}

export default async function LetterTracingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LetterTracingContent />;
}
