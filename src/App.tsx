import React, { useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import LetterCard from './components/LetterCard';
import GuessGame from './components/GuessGame';
import letters from './data/letters';
import { GameMode } from './models/GameMode';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.NORMAL);

  const toggleGameMode = () => {
    setGameMode(
      gameMode === GameMode.NORMAL ? GameMode.GUESS : GameMode.NORMAL
    );
  };

  return (
    <Box sx={{ padding: '20px', direction: 'rtl' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleGameMode}
        sx={{ marginBottom: '20px' }}
      >
        {gameMode === GameMode.NORMAL ? 'משחק הניחושים' : 'כל אותיות האלף בית'}
      </Button>
      {gameMode === GameMode.GUESS ? (
        <GuessGame />
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {letters.map((letter, index) => (
            <Grid item key={index}>
              <LetterCard letter={letter} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default App;
