import React, { useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RoutesEnum } from '../models/RoutesEnum';
import { useThemeContext } from '../context/ThemeContext';
import FunButton from '../components/FunButton';
import SchoolIcon from '@mui/icons-material/School';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DevicesIcon from '@mui/icons-material/Devices';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import TranslateIcon from '@mui/icons-material/Translate';

const SEOPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { direction } = useThemeContext();
  const isRTL = (i18n.language || 'he') === 'he';

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = t('seo.pageTitle');

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('seo.metaDescription'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('seo.metaDescription');
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Update HTML lang attribute
    document.documentElement.lang = i18n.language || 'he';
    document.documentElement.dir = direction;
  }, [t, i18n.language, direction]);

  // No need for handleStartLearning function since FunButton handles navigation

  const features = [
    {
      icon: <VolumeUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'seo.features.audio.title',
      descriptionKey: 'seo.features.audio.description',
    },
    {
      icon: <TranslateIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'seo.features.bilingual.title',
      descriptionKey: 'seo.features.bilingual.description',
    },
    {
      icon: <GamepadIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'seo.features.interactive.title',
      descriptionKey: 'seo.features.interactive.description',
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'seo.features.responsive.title',
      descriptionKey: 'seo.features.responsive.description',
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'seo.features.family.title',
      descriptionKey: 'seo.features.family.description',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      titleKey: 'seo.features.educational.title',
      descriptionKey: 'seo.features.educational.description',
    },
  ];

  const learningTopics = [
    { emoji: '🅰️', titleKey: 'seo.topics.letters.title', descriptionKey: 'seo.topics.letters.description' },
    { emoji: '🔢', titleKey: 'seo.topics.numbers.title', descriptionKey: 'seo.topics.numbers.description' },
    { emoji: '🎨', titleKey: 'seo.topics.colors.title', descriptionKey: 'seo.topics.colors.description' },
    { emoji: '🔶', titleKey: 'seo.topics.shapes.title', descriptionKey: 'seo.topics.shapes.description' },
    { emoji: '🐶', titleKey: 'seo.topics.animals.title', descriptionKey: 'seo.topics.animals.description' },
    { emoji: '🍎', titleKey: 'seo.topics.food.title', descriptionKey: 'seo.topics.food.description' },
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
            {t('seo.hero.title')}
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
            {t('seo.hero.subtitle')}
          </Typography>

          <Box sx={{ display: 'inline-block' }}>
            <FunButton to={RoutesEnum.HOME} text={t('seo.hero.cta')} />
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
            {t('seo.why.title')}
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
            {t('seo.topics.title')}
          </Typography>

          <Grid container spacing={3}>
            {learningTopics.map((topic, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                    <Typography
                      sx={{
                        fontSize: '3rem',
                        mb: 2,
                      }}
                    >
                      {topic.emoji}
                    </Typography>
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
              {t('seo.benefits.title')}
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
              {t('seo.benefits.description1')}
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
              {t('seo.benefits.description2')}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t('seo.benefits.description3')}
            </Typography>
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
            {t('seo.finalCta.title')}
          </Typography>

          <Box sx={{ display: 'inline-block' }}>
            <FunButton to={RoutesEnum.HOME} text={t('seo.finalCta.button')} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SEOPage;
