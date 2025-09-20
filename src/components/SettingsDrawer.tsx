import { Box, Button, ButtonGroup, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLanguageSpecificRoute, stripLanguageFromPath } from '../utils/languageRoutes';
import { RoutesEnum } from '../models/RoutesEnum';

interface SettingsDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, toggleDrawer }) => {
  const { t, i18n } = useTranslation();
  const { direction } = useThemeContext(); // Access direction from ThemeContext
  const navigate = useNavigate();
  const location = useLocation();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [drawerDirection, setDrawerDirection] = useState(direction); // Stable drawer direction

  // Update drawer direction when drawer opens (but not during language changes)
  useEffect(() => {
    if (open && !isChangingLanguage) {
      setDrawerDirection(direction);
    }
  }, [open, direction, isChangingLanguage]);

  const handleLanguageChange = (lang: string) => {
    // Skip if already on the selected language
    if (i18n.language === lang) {
      toggleDrawer(false);
      return;
    }

    // Show loading state
    setIsChangingLanguage(true);

    // Get current route without language prefix
    const currentRoute = stripLanguageFromPath(location.pathname) as RoutesEnum;
    // Get the new language-specific route
    const newRoute = getLanguageSpecificRoute(currentRoute, lang);

    // Close drawer first for smoother UX
    toggleDrawer(false);

    // Navigate after a short delay to allow drawer to close
    setTimeout(() => {
      navigate(newRoute);
      // Reset loading state and update drawer direction after navigation
      setTimeout(() => {
        setIsChangingLanguage(false);
        // Update drawer direction only when drawer is closed to prevent flash
        setDrawerDirection(lang === 'he' ? 'rtl' : 'ltr');
      }, 100);
    }, 150); // Small delay for smooth transition
  };

  const handleClose = () => {
    toggleDrawer(false); // Directly call toggleDrawer
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose} // Pass function reference
      anchor={drawerDirection === 'rtl' ? 'left' : 'right'}
      PaperProps={{
        sx: {
          width: 300,
          borderTopRightRadius: drawerDirection === 'rtl' ? 13 : undefined,
          borderEndEndRadius: drawerDirection === 'rtl' ? 13 : undefined,
          borderTopLeftRadius: drawerDirection === 'ltr' ? 13 : undefined,
          borderEndStartRadius: drawerDirection === 'ltr' ? 13 : undefined,
          backgroundColor: 'beigePastel', // Ensure 'beigePastel' is defined in your theme
        },
      }}
      SlideProps={{ direction: drawerDirection === 'rtl' ? 'right' : 'left' }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            color="primary.light"
            variant="h6"
            sx={{
              textAlign: direction === 'rtl' ? 'right' : 'left',
              width: '100%',
            }}
          >
            {t('home.settings.title')}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: direction === 'rtl' ? 'flex-end' : 'flex-start',
            gap: 1,
            mb: 'auto',
            width: '100%',
          }}
        >
          <Typography
            fontWeight="bold"
            variant="button"
            color="secondary.main"
            sx={{
              textAlign: direction === 'rtl' ? 'right' : 'left',
              width: '100%',
              alignSelf: direction === 'rtl' ? 'flex-end' : 'flex-start',
            }}
          >
            {t('home.settings.language')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              alignItems: direction === 'rtl' ? 'flex-end' : 'flex-start',
              width: '100%',
              direction: direction,
              '& > *': {
                alignSelf: direction === 'rtl' ? 'flex-end' : 'flex-start',
              },
            }}
          >
            <Button
              size="medium"
              variant={i18n.language === 'en' ? 'contained' : 'outlined'}
              onClick={() => handleLanguageChange('en')}
              disabled={isChangingLanguage}
              sx={{
                minWidth: '120px',
                textAlign: 'center',
                alignSelf: direction === 'rtl' ? 'flex-end' : 'flex-start',
                marginLeft: direction === 'rtl' ? 'auto' : 0,
                marginRight: direction === 'rtl' ? 0 : 'auto',
              }}
            >
              English
            </Button>
            <Button
              size="medium"
              variant={i18n.language === 'he' ? 'contained' : 'outlined'}
              onClick={() => handleLanguageChange('he')}
              disabled={isChangingLanguage}
              sx={{
                minWidth: '120px',
                textAlign: 'center',
                alignSelf: direction === 'rtl' ? 'flex-end' : 'flex-start',
                marginLeft: direction === 'rtl' ? 'auto' : 0,
                marginRight: direction === 'rtl' ? 0 : 'auto',
              }}
            >
              עברית
            </Button>
            <Button
              size="medium"
              variant={i18n.language === 'ru' ? 'contained' : 'outlined'}
              onClick={() => handleLanguageChange('ru')}
              disabled={isChangingLanguage}
              sx={{
                minWidth: '120px',
                textAlign: 'center',
                alignSelf: direction === 'rtl' ? 'flex-end' : 'flex-start',
                marginLeft: direction === 'rtl' ? 'auto' : 0,
                marginRight: direction === 'rtl' ? 0 : 'auto',
              }}
            >
              Русский
            </Button>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: direction === 'rtl' ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          <Typography
            color="secondary.main"
            sx={{
              textAlign: direction === 'rtl' ? 'right' : 'left',
              width: '100%',
            }}
          >
            {t('home.settings.voices')}
          </Typography>
          <Typography
            color="secondary.main"
            sx={{
              textAlign: direction === 'rtl' ? 'right' : 'left',
              width: '100%',
            }}
          >
            {t('home.settings.code')}
          </Typography>
          <Typography
            color="secondary.main"
            sx={{
              textAlign: direction === 'rtl' ? 'right' : 'left',
              width: '100%',
            }}
          >
            {t('home.settings.contact')}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
