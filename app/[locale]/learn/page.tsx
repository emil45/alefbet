'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTranslations, useLocale } from 'next-intl';
import FunButton from '@/components/FunButton';
import SchoolIcon from '@mui/icons-material/School';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DevicesIcon from '@mui/icons-material/Devices';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import TranslateIcon from '@mui/icons-material/Translate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function LearnPage() {
  const t = useTranslations('seo');
  const locale = useLocale();
  const isRTL = locale === 'he';

  const features = [
    {
      icon: <VolumeUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'features.audio.title',
      descriptionKey: 'features.audio.description',
    },
    {
      icon: <TranslateIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'features.bilingual.title',
      descriptionKey: 'features.bilingual.description',
    },
    {
      icon: <GamepadIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'features.interactive.title',
      descriptionKey: 'features.interactive.description',
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'features.responsive.title',
      descriptionKey: 'features.responsive.description',
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'features.family.title',
      descriptionKey: 'features.family.description',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'features.educational.title',
      descriptionKey: 'features.educational.description',
    },
  ];

  const learningTopics = [
    { emoji: '🅰️', titleKey: 'topics.letters.title', descriptionKey: 'topics.letters.description' },
    { emoji: '🔢', titleKey: 'topics.numbers.title', descriptionKey: 'topics.numbers.description' },
    { emoji: '🎨', titleKey: 'topics.colors.title', descriptionKey: 'topics.colors.description' },
    { emoji: '🔶', titleKey: 'topics.shapes.title', descriptionKey: 'topics.shapes.description' },
    { emoji: '🐶', titleKey: 'topics.animals.title', descriptionKey: 'topics.animals.description' },
    { emoji: '🍎', titleKey: 'topics.food.title', descriptionKey: 'topics.food.description' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              color: 'primary.light',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {t('hero.title')}
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.8rem' },
              color: 'primary.light',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {t('hero.subtitle')}
          </Typography>

          <Box sx={{ display: 'inline-block' }}>
            <FunButton to="/" text={t('hero.cta')} />
          </Box>
        </Box>

        {/* Why Choose Our App Section */}
        <Box mb={6}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: 'primary.light',
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {t('why.title')}
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box mb={2}>{feature.icon}</Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {t(feature.titleKey)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(feature.descriptionKey)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Learning Topics Section */}
        <Box mb={6}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: 'primary.light',
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {t('topics.title')}
          </Typography>

          <Grid container spacing={3}>
            {learningTopics.map((topic, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>{topic.emoji}</Typography>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {t(topic.titleKey)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t(topic.descriptionKey)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Educational Benefits Section */}
        <Box mb={6}>
          <Card
            sx={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              p: 4,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3,
              }}
            >
              {t('benefits.title')}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                textAlign: isRTL ? 'right' : 'left',
                mb: 2,
              }}
            >
              {t('benefits.description1')}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                textAlign: isRTL ? 'right' : 'left',
                mb: 2,
              }}
            >
              {t('benefits.description2')}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t('benefits.description3')}
            </Typography>
          </Card>
        </Box>

        {/* FAQ Section */}
        <Box mb={6}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: 'primary.light',
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {t('faq.title')}
          </Typography>

          <Card
            sx={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6'].map((faq, index) => (
              <Accordion key={index} sx={{ background: 'transparent', boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {t(`faq.${faq}.question`)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    {t(`faq.${faq}.answer`)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Card>
        </Box>

        {/* Methodology Section */}
        <Box mb={6}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: 'primary.light',
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {t('methodology.title')}
          </Typography>

          <Card
            sx={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              p: 4,
            }}
          >
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  {t('methodology.scientific.title')}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
                  {t('methodology.scientific.description')}
                </Typography>
                <List>
                  {['point1', 'point2', 'point3'].map((point, index) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                      </ListItemIcon>
                      <ListItemText primary={t(`methodology.scientific.${point}`)} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  {t('methodology.practical.title')}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
                  {t('methodology.practical.description')}
                </Typography>
                <List>
                  {['step1', 'step2', 'step3'].map((step, index) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <ListItemIcon>
                        <MenuBookIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText primary={t(`methodology.practical.${step}`)} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Card>
        </Box>

        {/* Final CTA */}
        <Box textAlign="center">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 'bold',
              color: 'primary.light',
              mb: 3,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {t('finalCta.title')}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'primary.light',
              mb: 4,
              opacity: 0.9,
            }}
          >
            {t('finalCta.subtitle')}
          </Typography>

          <Box sx={{ display: 'inline-block' }}>
            <FunButton to="/" text={t('finalCta.button')} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
