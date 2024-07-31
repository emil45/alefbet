import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LettersPage from './pages/LettersPage';
import NumbersPage from './pages/NumbersPage';
import ColorsPage from './pages/ColorsPage';
import ShapesPage from './pages/ShapesPage';
import GuessGamePage from './pages/GuessGamePage';
import { Box, Typography } from '@mui/material';
import CursorFollower from './components/CursorFollower';
import { TEXTS } from './data/texts';
import { RoutesEnum } from './models/RoutesEnum';

const App: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touch);
    };

    checkTouchDevice();

    return () => {};
  }, []);

  
  return (
    <Router>
      <Box
        sx={{
          padding: '20px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Routes>
          <Route path={RoutesEnum.HOME} element={<HomePage />} />
          <Route path={RoutesEnum.LETTERS} element={<LettersPage />} />
          <Route path={RoutesEnum.NUMBERS} element={<NumbersPage />} />
          <Route path={RoutesEnum.COLORS} element={<ColorsPage />} />
          <Route path={RoutesEnum.SHAPES} element={<ShapesPage />} />
          <Route path={RoutesEnum.GUESS_GAME} element={<GuessGamePage />} />
        </Routes>
        <Box sx={{ textAlign: 'center', mt: '25px' }}>
          <Typography variant="body2" color="textSecondary">
            {TEXTS.FOOTER_TEXT}
          </Typography>
        </Box>
      </Box>
      {isTouchDevice && <CursorFollower />}
    </Router>
  );
};

export default App;
