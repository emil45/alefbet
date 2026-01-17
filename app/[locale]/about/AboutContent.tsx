'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTranslations } from 'next-intl';
import ParentGate from '@/components/ParentGate';
import BackButton from '@/components/BackButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AboutContent() {
  const t = useTranslations('about');

  return (
    <ParentGate>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <BackButton />

        <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#6a1b9a', fontWeight: 'bold' }}>
            {t('pageTitle')}
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {t('intro')}
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, color: '#1565c0', fontWeight: 'bold' }}>
            {t('whatWeOffer')}
          </Typography>

          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {['letters', 'numbers', 'vocabulary', 'games'].map((feature) => (
              <Box
                component="li"
                key={feature}
                sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1 }}
              >
                <CheckCircleOutlineIcon sx={{ color: '#4caf50', mt: 0.3 }} />
                <Typography>{t(`features.${feature}`)}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, color: '#1565c0', fontWeight: 'bold' }}>
            {t('ourApproach')}
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {t('approachText')}
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, color: '#e91e63', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <FavoriteIcon /> {t('madeWithLove')}
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {t('madeWithLoveText')}
          </Typography>
        </Paper>
      </Box>
    </ParentGate>
  );
}
