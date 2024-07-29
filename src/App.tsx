import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material'; // Import Typography for the footer text
import ItemCard from './components/ItemCard';
import GuessGame from './components/GuessGame';
import letters from './data/letters';
import numbers from './data/numbers';
import { GameMode } from './models/GameMode';
import { TEXTS } from './data/texts';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.LETTERS);

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
  };

  return (
    <Box
      sx={{
        padding: '20px',
        direction: 'rtl',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Box sx={{ display: 'flex', marginBottom: '35px', justifyContent: 'flex-start', gap: '10px' }}>
          <Button
            variant="contained"
            color={gameMode === GameMode.LETTERS ? 'secondary' : 'primary'}
            onClick={() => handleGameModeChange(GameMode.LETTERS)}
          >
            {TEXTS.LETTERS_BUTTON}
          </Button>
          <Button
            variant="contained"
            color={gameMode === GameMode.NUMBERS ? 'secondary' : 'primary'}
            onClick={() => handleGameModeChange(GameMode.NUMBERS)}
          >
            {TEXTS.NUMBERS_BUTTON}
          </Button>
          <Button
            variant="contained"
            color={gameMode === GameMode.GUESS ? 'secondary' : 'primary'}
            onClick={() => handleGameModeChange(GameMode.GUESS)}
          >
            {TEXTS.GUESS_GAME_BUTTON}
          </Button>
        </Box>

        {gameMode === GameMode.GUESS && <GuessGame />}
        {gameMode === GameMode.LETTERS && (
          <Grid container spacing={4} justifyContent="center">
            {letters.map((letter, index) => (
              <Grid item key={index}>
                <ItemCard
                  name={letter.letterName}
                  color={letter.color}
                  soundFile={letter.soundFile}
                  itemCaption={letter.letterNumber}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {gameMode === GameMode.NUMBERS && (
          <Grid container spacing={4} justifyContent="center">
            {numbers.map((number, index) => (
              <Grid item key={index}>
                <ItemCard
                  name={number.numberName}
                  color={number.color}
                  soundFile={number.soundFile}
                  itemCaption={number.numberLetter}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <Box sx={{ textAlign: 'center', direction: 'ltr' }}>
        <Typography variant="body2" color="textSecondary">
          {TEXTS.FOOTER_TEXT}
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
