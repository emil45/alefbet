import { Box, Button, ButtonGroup, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

interface SettingsDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, toggleDrawer }) => {
  const { t, i18n } = useTranslation();
  const { direction } = useThemeContext(); // Access direction from ThemeContext

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleClose = () => {
    toggleDrawer(false); // Directly call toggleDrawer
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose} // Pass function reference
      anchor={direction === 'rtl' ? 'left' : 'right'}
      PaperProps={{
        sx: {
          width: 300,
          borderTopRightRadius: direction === 'rtl' ? 13 : undefined,
          borderEndEndRadius: direction === 'rtl' ? 13 : undefined,
          borderTopLeftRadius: direction === 'ltr' ? 13 : undefined,
          borderEndStartRadius: direction === 'ltr' ? 13 : undefined,
          backgroundColor: 'beigePastel', // Ensure 'beigePastel' is defined in your theme
        },
      }}
      SlideProps={{ direction: direction === 'rtl' ? 'right' : 'left' }}
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
            flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
          }}
        >
          <Typography color="primary.light" variant="h6" sx={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
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
          }}
        >
          <Typography fontWeight="bold" variant="button" color="secondary.main">
            {t('home.settings.language')}
          </Typography>
          <ButtonGroup
            size="large"
            variant="outlined"
            sx={{ mt: 1, direction: direction === 'rtl' ? 'row-reverse' : 'row' }}
          >
            <Button
              disabled
              variant={i18n.language === 'en' ? 'contained' : 'outlined'}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </Button>
            <Button
              variant={i18n.language === 'he' ? 'contained' : 'outlined'}
              onClick={() => handleLanguageChange('he')}
            >
              עברית
            </Button>
          </ButtonGroup>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: direction === 'rtl' ? 'flex-end' : 'flex-start',
          }}
        >
          <Typography color="secondary.main">{t('home.settings.voices')}</Typography>
          <Typography color="secondary.main">{t('home.settings.code')}</Typography>
          <Typography color="secondary.main">{t('home.settings.contact')}</Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
