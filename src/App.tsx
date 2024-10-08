import React, { useEffect, useTransition } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LettersPage from './pages/LettersPage';
import NumbersPage from './pages/NumbersPage';
import ColorsPage from './pages/ColorsPage';
import ShapesPage from './pages/ShapesPage';
import GuessGamePage from './pages/GuessGamePage';
import MemoryMatchGamePage from './pages/MemoryMatchGamePage';
import { Box, Typography } from '@mui/material';
import { RoutesEnum } from './models/RoutesEnum';
import { initAmplitude } from './utils/amplitude';
import GamesPage from './pages/GamesPage';
import SimonGamePage from './pages/SimonGamePage';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log(process.env.REACT_APP_ENV as string);
    initAmplitude();
  }, []);

  return (
    <Box
      sx={{
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '30px',
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: { md: 'center center', xs: '-170px center' },
        backgroundAttachment: 'fixed',
        height: '100%',
      }}
    >
      {/* <TransitionWrapper> */}
      <Routes>
        <Route path={RoutesEnum.HOME} element={<HomePage />} />
        <Route path={RoutesEnum.LETTERS} element={<LettersPage />} />
        <Route path={RoutesEnum.NUMBERS} element={<NumbersPage />} />
        <Route path={RoutesEnum.COLORS} element={<ColorsPage />} />
        <Route path={RoutesEnum.SHAPES} element={<ShapesPage />} />
        <Route path={RoutesEnum.GAMES} element={<GamesPage />} />
        <Route path={RoutesEnum.GUESS_GAME} element={<GuessGamePage />} />
        <Route path={RoutesEnum.MEMORY_MATCH_GAME} element={<MemoryMatchGamePage />} />
        <Route path={RoutesEnum.SIMON_GAME} element={<SimonGamePage />} />
      </Routes>
      {/* </TransitionWrapper> */}
      <Box sx={{ textAlign: 'center', mt: '25px' }}>
        <Typography variant="body2" color="textSecondary">
          {t('footer.text')}
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
