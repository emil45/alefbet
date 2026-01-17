'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import RoundFunButton from './RoundFunButton';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { defaultLocale } from '@/i18n/config';

interface BackButtonProps {
  href?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href = '/' }) => {
  const router = useRouter();
  const locale = useLocale();

  const getLocalizedHref = (path: string): string => {
    if (locale === defaultLocale) {
      return path;
    }
    return `/${locale}${path}`;
  };

  const handleClick = () => {
    setTimeout(() => {
      router.push(getLocalizedHref(href));
    }, 500);
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      <RoundFunButton onClick={handleClick}>
        <ArrowBackIcon />
      </RoundFunButton>
    </Box>
  );
};

export default BackButton;
