// SimonPageGame.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import BackButton from '../components/BackButton';
import { preloadSounds, playSound, AudioSounds, stopAllSounds } from '../utils/audio';
import { TEXTS } from '../data/texts';
import FunButton from '../components/FunButton';
import { Color, COLORS, colorToAudioSound, GameState } from '../models/SimonGameModels';

export const INITIAL_DELAY = 1000;
export const INITIAL_SEQUENCE_DELAY = 500;

const SimonButton = styled(Button)(({ theme }) => ({
  width: '45%',
  height: '45%',
  margin: '2.5%',
  borderRadius: '50%',
  transition: 'transform 0.3s, filter 0.3s',
  border: 'none',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  '&:nth-of-type(1)': {
    backgroundColor: '#8BC34A',
  },
  '&:nth-of-type(2)': {
    backgroundColor: '#FF6F61',
  },
  '&:nth-of-type(3)': {
    backgroundColor: '#FFD700',
  },
  '&:nth-of-type(4)': {
    backgroundColor: '#42A5F5',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const SimonContainer = styled(Box)(({ theme }) => ({
  width: '500px',
  height: '500px',
  borderRadius: '25%',
  backgroundColor: '#FFF3E0',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  boxShadow: '0 0 30px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
    height: '300px',
  },
}));

const SimonPageGame: React.FC = () => {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [userSequence, setUserSequence] = useState<Color[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeColor, setActiveColor] = useState<Color | null>(null);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    preloadSounds();

    return () => {
      clearAllTimeouts();
      stopAllSounds();
    };
  }, []);

  const getSequenceDelay = useCallback(() => {
    return Math.max(INITIAL_SEQUENCE_DELAY - score * 10, 100);
  }, [score]);

  const lightUp = useCallback((color: Color, duration: number) => {
    setActiveColor(color);
    playSound(colorToAudioSound[color]);
    const timeout = setTimeout(() => setActiveColor(null), duration);
    timeoutsRef.current.push(timeout);
  }, []);

  const addToSequence = useCallback(() => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setSequence((prev) => [...prev, newColor]);
  }, []);

  const playSequence = useCallback(() => {
    setGameState(GameState.SEQUENCE);
    const sequenceDelay = getSequenceDelay();
    sequence.forEach((color, index) => {
      const timeout = setTimeout(() => lightUp(color, sequenceDelay), INITIAL_DELAY + index * sequenceDelay * 2);
      timeoutsRef.current.push(timeout);
    });

    const endTimeout = setTimeout(
      () => {
        setGameState(GameState.USER_INPUT);
      },
      INITIAL_DELAY + sequence.length * sequenceDelay * 2
    );
    timeoutsRef.current.push(endTimeout);
  }, [sequence, lightUp, getSequenceDelay]);

  const startGame = useCallback(() => {
    clearAllTimeouts();
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setGameState(GameState.IDLE);
    playSound(AudioSounds.GAME_START);
    addToSequence();
  }, [addToSequence]);

  const handleColorClick = useCallback(
    (color: Color) => {
      if (gameState !== GameState.USER_INPUT) return;

      lightUp(color, getSequenceDelay() / 2);
      setUserSequence((prev) => [...prev, color]);

      const currentStep = userSequence.length;
      if (color !== sequence[currentStep]) {
        setGameState(GameState.GAME_OVER);
        playSound(AudioSounds.GAME_OVER);
        return;
      }

      if (currentStep + 1 === sequence.length) {
        setScore((prev) => prev + 1);
        setHighScore((prev) => Math.max(prev, score + 1));
        setUserSequence([]);
        playSound(AudioSounds.SUCCESS);
        if (score > 0 && score % 5 === 0) {
          playSound(AudioSounds.BONUS);
        }
        setTimeout(() => {
          addToSequence();
          setGameState(GameState.IDLE); // This will trigger the sequence playback
        }, INITIAL_DELAY);
      }
    },
    [gameState, getSequenceDelay, lightUp, sequence, score, userSequence, addToSequence]
  );

  useEffect(() => {
    if (sequence.length && gameState === GameState.IDLE) {
      playSequence();
    }
  }, [sequence, gameState, playSequence]);

  return (
    <>
      <BackButton />
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          {TEXTS.SIMON_GAME_SCORE}: {score} | {TEXTS.SIMON_GAME_HIGH_SCORE}: {highScore}
        </Typography>
        <SimonContainer>
          {COLORS.map((color) => (
            <SimonButton
              key={color}
              style={{
                filter: activeColor === color ? 'brightness(160%)' : 'brightness(100%)',
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                handleColorClick(color);
              }}
              onClick={() => handleColorClick(color)}
              disabled={gameState !== GameState.USER_INPUT}
              aria-label={color}
            />
          ))}
        </SimonContainer>
        <Box mt={4}>
          <FunButton
            text={gameState === GameState.GAME_OVER ? TEXTS.SIMON_GAME_PLAY_AGAIN : TEXTS.SIMON_GAME_START_GAME}
            onClick={startGame}
            // disabled={gameState === GameState.SEQUENCE}
          />
        </Box>
      </Box>
    </>
  );
};

export default SimonPageGame;
