'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FunButton from '@/components/FunButton';
import { useTranslations, useLocale } from 'next-intl';
import RoundFunButton from '@/components/RoundFunButton';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsDrawer from '@/components/SettingsDrawer';
import { useRouter } from 'next/navigation';
import { getLanguageSpecificRoute } from '@/utils/languageRoutes';

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === 'he';

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const showButtons = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <FunButton to="/letters" text={t('home.buttons.letters')} />
        <FunButton to="/numbers" text={t('home.buttons.numbers')} />
        <FunButton to="/colors" text={t('home.buttons.colors')} />
        <FunButton to="/shapes" text={t('home.buttons.shapes')} />
        <FunButton to="/animals" text={t('home.buttons.animals')} />
        <FunButton to="/food" text={t('home.buttons.food')} />
        <FunButton to="/games" text={t('home.buttons.games')} />
      </Box>
    );
  };

  const showSettingsButton = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' },
          ...(isRTL ? { left: { xs: '10px', sm: '20px' } } : { right: { xs: '10px', sm: '20px' } }),
          zIndex: 10,
        }}
      >
        <RoundFunButton onClick={() => toggleDrawer(true)}>
          <SettingsIcon />
        </RoundFunButton>
      </Box>
    );
  };

  const showLearnMoreButton = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' },
          ...(isRTL ? { right: { xs: '10px', sm: '20px' } } : { left: { xs: '10px', sm: '20px' } }),
          zIndex: 10,
        }}
      >
        <RoundFunButton onClick={() => router.push(getLanguageSpecificRoute('/learn', locale))}>
          <HelpOutlineIcon />
        </RoundFunButton>
      </Box>
    );
  };

  return (
    <Box>
      <Typography
        component="h1"
        sx={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {t('seo.hero.title')}
      </Typography>
      {showSettingsButton()}
      {showLearnMoreButton()}
      <SettingsDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ pt: { xs: 8, sm: 6 } }}
      >
        {showButtons()}
      </Box>
    </Box>
  );
}
