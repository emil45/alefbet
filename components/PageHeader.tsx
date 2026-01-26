'use client';

import React from 'react';
import { Box } from '@mui/material';
import RoundFunButton from '@/components/RoundFunButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { defaultLocale } from '@/i18n/config';
import HomeHeader from '@/components/HomeHeader';

interface PageHeaderProps {
  backHref?: string;
}

export default function PageHeader({ backHref = '/' }: PageHeaderProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'he';

  const handleBackClick = () => {
    const path = locale === defaultLocale ? backHref : `/${locale}${backHref}`;
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <>
      {/* Back button - positioned on same side as settings button, next to it */}
      {/* RTL: settings on left, so back button also on left (with gap) */}
      {/* LTR: settings on right, so back button also on right (with gap) */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' },
          // Position next to settings: RTL = left side at ~70px, LTR = right side at ~70px
          ...(isRTL
            ? { left: { xs: '60px', sm: '80px' } }
            : { right: { xs: '60px', sm: '80px' } }),
          zIndex: 10,
        }}
      >
        <RoundFunButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </RoundFunButton>
      </Box>

      {/* Reuse HomeHeader for settings/stickers/my-words buttons */}
      <HomeHeader locale={locale} />
    </>
  );
}
