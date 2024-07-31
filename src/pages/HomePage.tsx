import React from 'react';
import { Box, Typography } from '@mui/material';
import FunButton from '../components/FunButton';
import { TEXTS } from '../data/texts';
import { RoutesEnum } from '../models/RoutesEnum';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" sx={{ mb: 3 }}>
        {TEXTS.HOME_CHOOSE_GAME_TEXT}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <FunButton to={RoutesEnum.LETTERS} text={TEXTS.LETTERS_BUTTON} />
        <FunButton to={RoutesEnum.NUMBERS} text={TEXTS.NUMBERS_BUTTON} />
        <FunButton to={RoutesEnum.COLORS} text={TEXTS.COLORS_BUTTON} />
        <FunButton to={RoutesEnum.SHAPES} text={TEXTS.SHAPES_BUTTON} />
        <FunButton to={RoutesEnum.GUESS_GAME} text={TEXTS.GUESS_GAME_BUTTON} />
      </Box>
    </Box>
  );
};

export default HomePage;
