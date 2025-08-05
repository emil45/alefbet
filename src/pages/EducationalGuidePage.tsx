import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RoutesEnum } from '../models/RoutesEnum';
import { useThemeContext } from '../context/ThemeContext';
import FunButton from '../components/FunButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';

const EducationalGuidePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { direction } = useThemeContext();
  const isRTL = (i18n.language || 'he') === 'he';

  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = t('guide.pageTitle');

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('guide.metaDescription'));
    }
  }, [t, i18n.language]);

  const tips = [
    { icon: <LightbulbIcon />, key: 'tip1' },
    { icon: <FavoriteIcon />, key: 'tip2' },
    { icon: <SchoolIcon />, key: 'tip3' },
    { icon: <CheckCircleIcon />, key: 'tip4' },
  ];

  const benefits = ['benefit1', 'benefit2', 'benefit3', 'benefit4', 'benefit5', 'benefit6'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        direction: direction,
        color: 'white',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            py: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            {t('guide.hero.title')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('guide.hero.subtitle')}
          </Typography>

          <Box sx={{ display: 'inline-block' }}>
            <FunButton to={RoutesEnum.HOME} text={t('guide.hero.cta')} />
          </Box>
        </Box>

        {/* Educational Tips Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
            }}
          >
            {t('guide.tips.title')}
          </Typography>

          <Grid container spacing={4}>
            {tips.map((tip, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    color: 'white',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ mr: 2, color: '#FFD700' }}>{tip.icon}</Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                        {t(`guide.tips.${tip.key}.title`)}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {t(`guide.tips.${tip.key}.content`)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Early Learning Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
            }}
          >
            {t('guide.whyEarly.title')}
          </Typography>

          <Card
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              color: 'white',
              p: 3,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 3,
                textAlign: 'center',
              }}
            >
              {t('guide.whyEarly.content')}
            </Typography>

            <List sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
              {benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ py: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <ListItemIcon
                    sx={{ minWidth: isRTL ? 'auto' : '56px', marginLeft: isRTL ? 2 : 0, marginRight: isRTL ? 0 : 2 }}
                  >
                    <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textAlign: isRTL ? 'right' : 'left' }}
                    primary={
                      <Typography variant="body1" sx={{ color: 'white', textAlign: isRTL ? 'right' : 'left' }}>
                        {t(`guide.whyEarly.${benefit}`)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>

        {/* Age-Specific Guidelines */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
            }}
          >
            {t('guide.ageGuidelines.title')}
          </Typography>

          <Grid container spacing={4}>
            {['ages2_3', 'ages3_4', 'ages4_5', 'ages5_6'].map((ageGroup, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    color: 'white',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#FFD700' }}>
                      {t(`guide.ageGuidelines.${ageGroup}.title`)}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {t(`guide.ageGuidelines.${ageGroup}.content`)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final Call to Action */}
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            {t('guide.finalCta.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            {t('guide.finalCta.subtitle')}
          </Typography>

          <Box sx={{ display: 'inline-block' }}>
            <FunButton to={RoutesEnum.HOME} text={t('guide.finalCta.button')} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EducationalGuidePage;
