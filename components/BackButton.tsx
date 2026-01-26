'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import RoundFunButton from './RoundFunButton';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { defaultLocale } from '@/i18n/config';

interface BackButtonProps {
  href?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href = '/' }) => {
  const locale = useLocale();
  const localizedHref = locale === defaultLocale ? href : `/${locale}${href}`;

  return (
    <Box sx={{ textAlign: 'left' }}>
      <RoundFunButton to={localizedHref}>
        <ArrowBackIcon />
      </RoundFunButton>
    </Box>
  );
};

export default BackButton;
