import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material'; // Import Typography for the footer text
import ItemCard from './components/ItemCard';
import GuessGame from './components/GuessGame';
import letters from './data/letters';
import numbers from './data/numbers';
import colors from './data/colors';
import { GameMode } from './models/GameMode';
import { TEXTS } from './data/texts';
import CursorFollower from './components/CursorFollower';
import FunButton from './components/FunButton';
import shapes from './data/shapes';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.LETTERS);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touch);
    };

    checkTouchDevice();

    return () => {};
  }, []);

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
  };

  return (
    <div>
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
          <Box sx={{ display: 'flex', mb: '35px', justifyContent: 'flex-start', gap: '25px' }}>
            <FunButton
              // selected={gameMode === GameMode.LETTERS}
              onClick={() => handleGameModeChange(GameMode.LETTERS)}
              text={TEXTS.LETTERS_BUTTON}
            />
            <FunButton
              // selected={gameMode === GameMode.NUMBERS}
              onClick={() => handleGameModeChange(GameMode.NUMBERS)}
              text={TEXTS.NUMBERS_BUTTON}
            />
            <FunButton
              // selected={gameMode === GameMode.COLORS}
              onClick={() => handleGameModeChange(GameMode.COLORS)}
              text={TEXTS.COLORS_BUTTON}
            />
            <FunButton
              // selected={gameMode === GameMode.SHAPES}
              onClick={() => handleGameModeChange(GameMode.SHAPES)}
              text={TEXTS.SHAPES_BUTTON}
            />
            <FunButton
              // selected={gameMode === GameMode.GUESS}
              onClick={() => handleGameModeChange(GameMode.GUESS)}
              text={TEXTS.GUESS_GAME_BUTTON}
            />
          </Box>

          {gameMode === GameMode.GUESS && <GuessGame />}
          {gameMode === GameMode.LETTERS && (
            <Grid container spacing={4} justifyContent="center">
              {letters.map((letter, index) => (
                <Grid item key={index}>
                  <ItemCard
                    name={letter.letterName}
                    textColor={letter.color}
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
                    textColor={number.color}
                    soundFile={number.soundFile}
                    itemCaption={number.numberLetter}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {gameMode === GameMode.COLORS && (
            <Grid container spacing={4} justifyContent="center">
              {colors.map((color, index) => (
                <Grid item key={index}>
                  <ItemCard
                    name=""
                    textColor={color.color}
                    backgroundColor={color.color}
                    soundFile={color.soundFile}
                    itemCaption={color.colorName}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {gameMode === GameMode.SHAPES && (
            <Grid container spacing={4} justifyContent="center">
              {shapes.map((shape, index) => (
                <Grid item key={index}>
                  <ItemCard
                    name=""
                    element={shape.element}
                    textColor={shape.color}
                    soundFile={shape.soundFile}
                    itemCaption={shape.shapeHebrewName}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <Box sx={{ textAlign: 'center', direction: 'ltr', mt: '25px' }}>
          <Typography variant="body2" color="textSecondary">
            {TEXTS.FOOTER_TEXT}
          </Typography>
        </Box>
      </Box>
      {!isTouchDevice && <CursorFollower />}
    </div>
  );
};

export default App;
