'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import RoundFunButton from './RoundFunButton';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getLanguageSpecificRoute } from '@/utils/languageRoutes';

interface BackButtonProps {
  href?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href = '/' }) => {
  const locale = useLocale();

  return (
    <Box sx={{ textAlign: 'left' }}>
      <RoundFunButton to={getLanguageSpecificRoute(href, locale)}>
        <ArrowBackIcon />
      </RoundFunButton>
    </Box>
  );
};

export default BackButton;
