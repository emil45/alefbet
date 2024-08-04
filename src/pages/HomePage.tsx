import React from 'react';
import { Box, Typography } from '@mui/material';
import FunButton from '../components/FunButton';
import { TEXTS } from '../data/texts';
import { RoutesEnum } from '../models/RoutesEnum';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" sx={(theme) => ({ mb: 3, color: 'black' })}>
        {TEXTS.HOME_CHOOSE_GAME_TEXT}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
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
