import React, { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { initAmplitude } from './utils/amplitude';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from './context/ThemeContext';
import SEOHead from './components/SEOHead';
import { generateAllRoutes } from './components/RouteGenerator';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { direction } = useThemeContext();

  useEffect(() => {
    initAmplitude();
  }, []);

  // Update document direction and language when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language || 'he';
  }, [direction, i18n.language]);

  return (
    <>
      <SEOHead />
      <Box
        sx={{
          padding: '20px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '30px',
          backgroundImage: 'url("/images/background.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          overflowX: 'hidden',
        }}
      >
        <Routes>
          {/* All routes generated automatically */}
          {generateAllRoutes()}
        </Routes>
        
        <Box sx={{ textAlign: 'center', mt: '25px' }}>
          <Typography variant="body2" color="textSecondary">
            {t('footer.text')}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default App;