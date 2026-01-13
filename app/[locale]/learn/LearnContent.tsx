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

const cardStyles = {
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
};

const sectionTitleStyles = {
  fontSize: { xs: '1.8rem', md: '2.5rem' },
  fontWeight: 'bold',
  color: 'primary.light',
  mb: 4,
  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
};

const features = [
  { id: 'audio', icon: <VolumeUpIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { id: 'bilingual', icon: <TranslateIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { id: 'interactive', icon: <GamepadIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { id: 'responsive', icon: <DevicesIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { id: 'family', icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
  { id: 'educational', icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
];

const learningTopics = [
  { id: 'letters', emoji: '🅰️' },
  { id: 'numbers', emoji: '🔢' },
  { id: 'colors', emoji: '🎨' },
  { id: 'shapes', emoji: '🔶' },
  { id: 'animals', emoji: '🐶' },
  { id: 'food', emoji: '🍎' },
];

const faqIds = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6'];
const methodologyPoints = ['point1', 'point2', 'point3'];
const methodologySteps = ['step1', 'step2', 'step3'];

export default function LearnContent() {
  const t = useTranslations('seo');
  const locale = useLocale();
  const isRTL = locale === 'he';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
        <Typography variant="h3" component="h2" textAlign="center" sx={sectionTitleStyles}>
          {t('why.title')}
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.id}>
              <Card sx={cardStyles}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {t(`features.${feature.id}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`features.${feature.id}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Learning Topics Section */}
      <Box mb={6}>
        <Typography variant="h3" component="h2" textAlign="center" sx={sectionTitleStyles}>
          {t('topics.title')}
        </Typography>

        <Grid container spacing={3}>
          {learningTopics.map((topic) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={topic.id}>
              <Card sx={cardStyles}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>{topic.emoji}</Typography>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {t(`topics.${topic.id}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`topics.${topic.id}.description`)}
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

          {['description1', 'description2', 'description3'].map((key, index) => (
            <Typography
              key={key}
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                textAlign: isRTL ? 'right' : 'left',
                mb: index < 2 ? 2 : 0,
              }}
            >
              {t(`benefits.${key}`)}
            </Typography>
          ))}
        </Card>
      </Box>

      {/* FAQ Section */}
      <Box mb={6}>
        <Typography variant="h3" component="h2" textAlign="center" sx={sectionTitleStyles}>
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
          {faqIds.map((faq) => (
            <Accordion key={faq} sx={{ background: 'transparent', boxShadow: 'none' }}>
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
        <Typography variant="h3" component="h2" textAlign="center" sx={sectionTitleStyles}>
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
                {methodologyPoints.map((point) => (
                  <ListItem key={point} sx={{ pl: 0 }}>
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
                {methodologySteps.map((step) => (
                  <ListItem key={step} sx={{ pl: 0 }}>
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
  );
}
