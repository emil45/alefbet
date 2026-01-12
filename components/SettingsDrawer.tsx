'use client';

import { Box, Button, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import { useDirection } from '@/hooks/useDirection';
import { getDirection } from '@/i18n/config';

interface SettingsDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ open, toggleDrawer }) => {
  const t = useTranslations();
  const locale = useLocale();
  const direction = useDirection();
  const router = useRouter();
  const pathname = usePathname();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [drawerDirection, setDrawerDirection] = useState(direction);

  // Update drawer direction when drawer opens (but not during language changes)
  useEffect(() => {
    if (open && !isChangingLanguage) {
      setDrawerDirection(direction);
    }
  }, [open, direction, isChangingLanguage]);

  const handleLanguageChange = (lang: string) => {
    // Skip if already on the selected language
    if (locale === lang) {
      toggleDrawer(false);
      return;
    }

    // Show loading state
    setIsChangingLanguage(true);

    // Get current route without language prefix
    let currentRoute = pathname;
    // Remove existing language prefix if present
    if (pathname.startsWith('/en')) {
      currentRoute = pathname.replace('/en', '') || '/';
    } else if (pathname.startsWith('/ru')) {
      currentRoute = pathname.replace('/ru', '') || '/';
    }

    // Build new route with new language
    const newRoute = lang === 'he' ? currentRoute : `/${lang}${currentRoute}`;

    // Close drawer first for smoother UX
    toggleDrawer(false);

    // Navigate after a short delay to allow drawer to close
    setTimeout(() => {
      router.push(newRoute);
      // Reset loading state and update drawer direction after navigation
      setTimeout(() => {
        setIsChangingLanguage(false);
        setDrawerDirection(getDirection(lang));
      }, 100);
    }, 150);
  };

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={drawerDirection === 'rtl' ? 'left' : 'right'}
      PaperProps={{
        sx: {
          width: 300,
          borderTopRightRadius: drawerDirection === 'rtl' ? 13 : undefined,
          borderEndEndRadius: drawerDirection === 'rtl' ? 13 : undefined,
          borderTopLeftRadius: drawerDirection === 'ltr' ? 13 : undefined,
          borderEndStartRadius: drawerDirection === 'ltr' ? 13 : undefined,
          backgroundColor: 'beigePastel',
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
              variant={locale === 'en' ? 'contained' : 'outlined'}
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
              variant={locale === 'he' ? 'contained' : 'outlined'}
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
              variant={locale === 'ru' ? 'contained' : 'outlined'}
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
