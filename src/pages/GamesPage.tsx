import React from 'react';
import BackButton from '../components/BackButton';
import { RoutesEnum } from '../models/RoutesEnum';
import FunButton from '../components/FunButton';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const GamesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <BackButton />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <FunButton to={RoutesEnum.GUESS_GAME} text={t('games.buttons.guessGame')} />
          <FunButton to={RoutesEnum.MEMORY_MATCH_GAME} text={t('games.buttons.memoryMatchGame')} />
          <FunButton to={RoutesEnum.SIMON_GAME} text={t('games.buttons.simon')} />
          <FunButton to={RoutesEnum.SPEED_CHALLENGE} text={t('games.buttons.speedChallenge')} />
          <FunButton to={RoutesEnum.WORD_BUILDER_GAME} text={t('games.buttons.wordBuilder')} />
        </Box>
      </Box>
    </>
  );
};

export default GamesPage;
