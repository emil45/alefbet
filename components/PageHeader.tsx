'use client';

import React from 'react';
import { Box } from '@mui/material';
import RoundFunButton from '@/components/RoundFunButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { defaultLocale } from '@/i18n/config';
import { getLanguageSpecificRoute } from '@/utils/languageRoutes';
import { useFeatureFlagContext } from '@/contexts/FeatureFlagContext';

interface PageHeaderProps {
  backHref?: string;
}

export default function PageHeader({ backHref = '/' }: PageHeaderProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'he';
  const { getFlag } = useFeatureFlagContext();
  const showStickersButton = getFlag('showStickersButton');

  const handleBackClick = () => {
    const path = locale === defaultLocale ? backHref : `/${locale}${backHref}`;
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <>
      {/* Back button - same position as settings on homepage (RTL: left, LTR: right) */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' },
          ...(isRTL ? { left: { xs: '10px', sm: '20px' } } : { right: { xs: '10px', sm: '20px' } }),
          zIndex: 10,
        }}
      >
        <RoundFunButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </RoundFunButton>
      </Box>

      {/* Stickers and My Words buttons - same position as homepage (RTL: right, LTR: left) */}
      {showStickersButton && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '10px', sm: '20px' },
            ...(isRTL ? { right: { xs: '10px', sm: '20px' } } : { left: { xs: '10px', sm: '20px' } }),
            zIndex: 10,
            display: 'flex',
            gap: { xs: '8px', sm: '12px' },
          }}
        >
          <RoundFunButton onClick={() => router.push(getLanguageSpecificRoute('/stickers', locale))}>
            <EmojiEventsIcon />
          </RoundFunButton>
          <RoundFunButton onClick={() => router.push(getLanguageSpecificRoute('/my-words', locale))}>
            <MenuBookIcon />
          </RoundFunButton>
        </Box>
      )}
    </>
  );
}
