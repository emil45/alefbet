'use client';

import React from 'react';
import { Box, Typography, Paper, Link, Card, CardContent } from '@mui/material';
import { useTranslations } from 'next-intl';
import ParentGate from '@/components/ParentGate';
import BackButton from '@/components/BackButton';
import EmailIcon from '@mui/icons-material/Email';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactContent() {
  const t = useTranslations('contact');

  return (
    <ParentGate>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <BackButton />

        <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#6a1b9a', fontWeight: 'bold' }}>
            {t('pageTitle')}
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
            {t('intro')}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card elevation={2} sx={{ borderLeft: '4px solid #2196f3' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon sx={{ color: '#2196f3', fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {t('emailUs')}
                  </Typography>
                  <Link
                    href={`mailto:${t('emailAddress')}`}
                    sx={{ fontSize: '1.2rem', color: '#1565c0', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    {t('emailAddress')}
                  </Link>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={2} sx={{ borderLeft: '4px solid #4caf50' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <FeedbackIcon sx={{ color: '#4caf50', fontSize: 40, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {t('feedbackWelcome')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {t('feedbackText')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, color: 'text.secondary' }}>
              <AccessTimeIcon />
              <Typography variant="body2">{t('responseTime')}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ParentGate>
  );
}
