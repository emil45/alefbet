'use client';

import { useLocale } from 'next-intl';
import { getDirection } from '@/i18n/config';

export function useDirection() {
  const locale = useLocale();
  return getDirection(locale);
}
