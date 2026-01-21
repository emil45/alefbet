'use client';

import React from 'react';
import BackButton from '@/components/BackButton';
import FunButton from '@/components/FunButton';
import PageIntro from '@/components/PageIntro';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function GamesContent() {
  const t = useTranslations();

  return (
    <>
      <BackButton />
      <PageIntro pageName="games" />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, auto)',
          gap: { xs: '16px', sm: '20px', md: '24px' },
          justifyContent: 'center',
          px: 2,
        }}
      >
        <FunButton variant="square" to="/games/simon-game" text={t('games.buttons.simon')} />
        <FunButton variant="square" to="/games/sound-matching" text={t('games.buttons.soundMatching')} />
        <FunButton variant="square" to="/games/letter-rain" text={t('games.buttons.letterRain')} />
        <FunButton variant="square" to="/games/memory-match-game" text={t('games.buttons.memoryMatchGame')} />
        <FunButton variant="square" to="/games/speed-challenge" text={t('games.buttons.speedChallenge')} />
        <FunButton variant="square" to="/games/word-builder" text={t('games.buttons.wordBuilder')} />
        <FunButton variant="square" to="/games/guess-game" text={t('games.buttons.guessGame')} />
      </Box>
    </>
  );
}
