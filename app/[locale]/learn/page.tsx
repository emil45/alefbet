import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

type Props = { params: Promise<{ locale: string }> };

export default async function LearnPage({ params }: Props) {
  const { locale } = await params;

  // 301 permanent redirect to /about
  const aboutPath = locale === defaultLocale ? '/about' : `/${locale}/about`;
  redirect(aboutPath);
}
