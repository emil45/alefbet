'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import RoundFunButton from '@/components/RoundFunButton';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsDrawer from '@/components/SettingsDrawer';
import { useRouter } from 'next/navigation';
import { getLanguageSpecificRoute } from '@/utils/languageRoutes';
import { useFeatureFlagContext } from '@/contexts/FeatureFlagContext';

interface HomeHeaderProps {
  locale: string;
}

export default function HomeHeader({ locale }: HomeHeaderProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { getFlag } = useFeatureFlagContext();
  const isRTL = locale === 'he';
  const showStickersButton = getFlag('showStickersButton');

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
      {showStickersButton && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '10px', sm: '20px' },
            ...(isRTL ? { right: { xs: '10px', sm: '20px' } } : { left: { xs: '10px', sm: '20px' } }),
            zIndex: 10,
          }}
        >
          <RoundFunButton onClick={() => router.push(getLanguageSpecificRoute('/stickers', locale))}>
            <EmojiEventsIcon />
          </RoundFunButton>
        </Box>
      )}
      <SettingsDrawer open={open} toggleDrawer={setOpen} />
    </>
  );
}
