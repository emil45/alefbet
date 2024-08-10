import React from 'react';
import BackButton from '../components/BackButton';
import { TEXTS } from '../data/texts';
import { RoutesEnum } from '../models/RoutesEnum';
import FunButton from '../components/FunButton';
import { Box } from '@mui/material';

const GamesPage: React.FC = () => {
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
          <FunButton to={RoutesEnum.GUESS_GAME} text={TEXTS.GUESS_GAME_BUTTON} />
          <FunButton to={RoutesEnum.MEMORY_MATCH_GAME} text={TEXTS.MEMORY_MATCH_GAME_BUTTON} />
        </Box>
      </Box>
    </>
  );
};

export default GamesPage;
