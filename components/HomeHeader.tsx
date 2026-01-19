'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import RoundFunButton from '@/components/RoundFunButton';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsDrawer from '@/components/SettingsDrawer';
import { useRouter } from 'next/navigation';
import { getLanguageSpecificRoute } from '@/utils/languageRoutes';

interface HomeHeaderProps {
  locale: string;
}

export default function HomeHeader({ locale }: HomeHeaderProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isRTL = locale === 'he';

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' },
          ...(isRTL ? { left: { xs: '10px', sm: '20px' } } : { right: { xs: '10px', sm: '20px' } }),
          zIndex: 10,
        }}
      >
        <RoundFunButton onClick={() => setOpen(true)}>
          <SettingsIcon />
        </RoundFunButton>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' },
          ...(isRTL ? { right: { xs: '10px', sm: '20px' } } : { left: { xs: '10px', sm: '20px' } }),
          zIndex: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <RoundFunButton onClick={() => router.push(getLanguageSpecificRoute('/learn', locale))}>
          <HelpOutlineIcon />
        </RoundFunButton>
        <RoundFunButton onClick={() => router.push(getLanguageSpecificRoute('/stickers', locale))}>
          <EmojiEventsIcon />
        </RoundFunButton>
      </Box>
      <SettingsDrawer open={open} toggleDrawer={setOpen} />
    </>
  );
}
