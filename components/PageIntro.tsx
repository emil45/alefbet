'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

interface PageIntroProps {
  pageName: string;
}

export default function PageIntro({ pageName }: PageIntroProps) {
  const t = useTranslations();

  return (
    <Box sx={{ textAlign: 'center', px: 2, mb: 3 }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
          fontWeight: 'bold',
          color: '#4a3728',
          mb: 1,
        }}
      >
        {t(`seo.pages.${pageName}.pageTitle`)}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#5a4a3a',
          maxWidth: '800px',
          margin: '0 auto',
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        {t(`seo.pages.${pageName}.pageDescription`)}
      </Typography>
    </Box>
  );
}
