'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';
import BackButton from '@/components/BackButton';
import FunButton from '@/components/FunButton';
import Confetti from 'react-confetti';
import letters from '@/data/letters';
import { playSound, AudioSounds } from '@/utils/audio';

interface Bubble {
  id: number;
  letter: (typeof letters)[0];
  x: number;
  animationDuration: number;
  colorIndex: number;
}

type GameState = 'menu' | 'playing' | 'finished';
type GameMode = 'freeplay' | 'challenge';
type Difficulty = 'slow' | 'medium' | 'fast' | 'superfast';

const GAME_DURATION = 60;
const SPAWN_INTERVALS: Record<Difficulty, number> = {
  slow: 2500,
  medium: 1800,
  fast: 1200,
  superfast: 700,
};
const ANIMATION_DURATIONS: Record<Difficulty, { min: number; max: number }> = {
  slow: { min: 10, max: 14 },
  medium: { min: 7, max: 10 },
  fast: { min: 5, max: 7 },
  superfast: { min: 3, max: 5 },
};

// In challenge mode, target letter appears with this probability
const TARGET_LETTER_CHANCE = 0.4;

// Bubble colors for variety
const BUBBLE_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
];

export default function LetterRainPage() {
  const t = useTranslations();

  // Game State
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('freeplay');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  // Playing State
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [targetLetter, setTargetLetter] = useState<(typeof letters)[0] | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [gameTime, setGameTime] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Refs
  const nextBubbleId = useRef(0);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleTimeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetLetterRef = useRef<(typeof letters)[0] | null>(null);
  const hasTargetOnScreenRef = useRef(false);

  // Get random letter
  const getRandomLetter = useCallback(() => {
    return letters[Math.floor(Math.random() * letters.length)];
  }, []);

  // Clear all bubble timeouts
  const clearBubbleTimeouts = useCallback(() => {
    bubbleTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    bubbleTimeoutsRef.current.clear();
  }, []);

  // Spawn a new bubble
  const spawnBubble = useCallback(
    (forceTargetLetter?: (typeof letters)[0] | null) => {
      const durations = ANIMATION_DURATIONS[difficulty];
      const bubbleId = nextBubbleId.current++;

      // In challenge mode, spawn target letter if none on screen
      let letterToUse: (typeof letters)[0];
      let isTargetLetter = false;

      if (forceTargetLetter) {
        // Only spawn target letter if there isn't one already on screen
        if (!hasTargetOnScreenRef.current && Math.random() < TARGET_LETTER_CHANCE) {
          letterToUse = forceTargetLetter;
          isTargetLetter = true;
          hasTargetOnScreenRef.current = true;
        } else {
          // Get a random letter that is NOT the target
          do {
            letterToUse = getRandomLetter();
          } while (letterToUse.id === forceTargetLetter.id);
        }
      } else {
        letterToUse = getRandomLetter();
      }

      const bubble: Bubble = {
        id: bubbleId,
        letter: letterToUse,
        x: 5 + Math.random() * 70,
        animationDuration: durations.min + Math.random() * (durations.max - durations.min),
        colorIndex: bubbleId % BUBBLE_COLORS.length,
      };
      setBubbles((prev) => [...prev, bubble]);

      // Auto-remove after animation completes
      const timeoutId = setTimeout(
        () => {
          setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
          bubbleTimeoutsRef.current.delete(bubbleId);
          // If this was the target letter, mark it as no longer on screen
          if (isTargetLetter) {
            hasTargetOnScreenRef.current = false;
          }
        },
        bubble.animationDuration * 1000 + 500
      );
      bubbleTimeoutsRef.current.set(bubbleId, timeoutId);
    },
    [difficulty, getRandomLetter]
  );

  // Handle bubble click
  const handleBubbleClick = useCallback(
    (bubble: Bubble, event: React.MouseEvent | React.TouchEvent) => {
      event.stopPropagation();

      // Play letter audio - reuse audio element to prevent memory leak
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(`/audio/letters/he/${bubble.letter.audioFile}`);
      audioRef.current.play().catch(console.error);

      // Clear the bubble's removal timeout since we're removing it now
      const timeoutId = bubbleTimeoutsRef.current.get(bubble.id);
      if (timeoutId) {
        clearTimeout(timeoutId);
        bubbleTimeoutsRef.current.delete(bubble.id);
      }

      // Remove bubble immediately
      setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));

      if (gameMode === 'freeplay') {
        setScore((prev) => prev + 1);
        playSound(AudioSounds.POP);
      } else {
        setStats((prev) => ({ ...prev, total: prev.total + 1 }));

        if (bubble.letter.id === targetLetter?.id) {
          setScore((prev) => prev + 10);
          setStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
          playSound(AudioSounds.SUCCESS);
          // Target was clicked, allow new one to spawn
          hasTargetOnScreenRef.current = false;
          const newTarget = getRandomLetter();
          setTargetLetter(newTarget);
          targetLetterRef.current = newTarget;
        } else {
          setScore((prev) => Math.max(0, prev - 2));
          playSound(AudioSounds.WRONG_ANSWER);
        }
      }
    },
    [gameMode, targetLetter, getRandomLetter]
  );

  // End game
  const endGame = useCallback(() => {
    if (spawnTimerRef.current) {
      clearInterval(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }
    clearBubbleTimeouts();
    setBubbles([]);
    setGameState('finished');
    playSound(AudioSounds.CELEBRATION);
  }, [clearBubbleTimeouts]);

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setStats({ correct: 0, total: 0 });
    setGameTime(0);
    setBubbles([]);
    nextBubbleId.current = 0;
    hasTargetOnScreenRef.current = false;

    playSound(AudioSounds.GAME_START);

    const initialTarget = gameMode === 'challenge' ? getRandomLetter() : null;
    if (initialTarget) {
      setTargetLetter(initialTarget);
      targetLetterRef.current = initialTarget;
    }

    // Start spawn timer - in challenge mode, pass target letter
    spawnTimerRef.current = setInterval(() => {
      spawnBubble(targetLetterRef.current);
    }, SPAWN_INTERVALS[difficulty]);

    // Spawn first bubble immediately (with target letter in challenge mode)
    spawnBubble(initialTarget);

    // Start game timer
    gameTimerRef.current = setInterval(() => {
      setGameTime((prev) => prev + 1);
    }, 1000);
  }, [gameMode, difficulty, spawnBubble, getRandomLetter]);

  // Watch gameTime and end game when time is up
  useEffect(() => {
    if (gameState === 'playing' && gameTime >= GAME_DURATION) {
      endGame();
    }
  }, [gameTime, gameState, endGame]);

  // Reset to menu
  const resetGame = useCallback(() => {
    setGameState('menu');
    setTargetLetter(null);
  }, []);

  // Window size for confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      bubbleTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      bubbleTimeoutsRef.current.clear();
    };
  }, []);

  // Render menu
  const renderMenu = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        p: 2,
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#FF6B6B',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          fontSize: { xs: '28px', sm: '36px', md: '48px' },
        }}
      >
        {t('games.letterRain.title')}
      </Typography>

      {/* Mode Selection */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <FunButton
          text={t('games.letterRain.freePlay')}
          onClick={() => setGameMode('freeplay')}
          backgroundColor={gameMode === 'freeplay' ? '#4CAF50' : '#9E9E9E'}
          fontSize={20}
        />
        <FunButton
          text={t('games.letterRain.challenge')}
          onClick={() => setGameMode('challenge')}
          backgroundColor={gameMode === 'challenge' ? '#FF9800' : '#9E9E9E'}
          fontSize={20}
        />
      </Box>

      {/* Difficulty */}
      <FormControl fullWidth sx={{ maxWidth: 300 }}>
        <InputLabel sx={{ fontSize: '18px' }}>{t('games.letterRain.speed')}</InputLabel>
        <Select
          value={difficulty}
          label={t('games.letterRain.speed')}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          sx={{ fontSize: '20px' }}
        >
          <MenuItem value="slow" sx={{ fontSize: '18px' }}>
            {t('games.letterRain.slow')}
          </MenuItem>
          <MenuItem value="medium" sx={{ fontSize: '18px' }}>
            {t('games.letterRain.medium')}
          </MenuItem>
          <MenuItem value="fast" sx={{ fontSize: '18px' }}>
            {t('games.letterRain.fast')}
          </MenuItem>
          <MenuItem value="superfast" sx={{ fontSize: '18px' }}>
            {t('games.letterRain.superfast')}
          </MenuItem>
        </Select>
      </FormControl>

      <FunButton text={t('games.letterRain.start')} onClick={startGame} />
    </Box>
  );

  // Render game
  const renderGame = () => (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: 'calc(100vh - 120px)',
        minHeight: '500px',
        overflow: 'hidden',
        touchAction: 'none',
      }}
    >
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 2,
          mx: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '18px', sm: '24px' } }}>
          {t('games.letterRain.score')}: {score}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '18px', sm: '24px' },
            color: gameTime >= GAME_DURATION - 10 ? '#FF6B6B' : 'inherit',
          }}
        >
          {Math.max(0, GAME_DURATION - gameTime)}s
        </Typography>
      </Paper>

      {/* Challenge Mode Target */}
      {gameMode === 'challenge' && targetLetter && (
        <Paper
          elevation={6}
          sx={{
            p: 2,
            mt: 2,
            mx: 1,
            textAlign: 'center',
            backgroundColor: '#FFF3E0',
            borderRadius: 3,
            border: '3px solid #FF9800',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              fontSize: { xs: '20px', sm: '28px' },
            }}
          >
            {t('games.letterRain.findLetter')}
            <Box
              component="span"
              sx={{
                color: targetLetter.color,
                fontSize: { xs: '40px', sm: '56px' },
                lineHeight: 1,
                animation: 'pulse 1s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                },
              }}
            >
              {t(`letters.${targetLetter.id}.name`)}
            </Box>
          </Typography>
        </Paper>
      )}

      {/* Bubbles Container */}
      <Box
        sx={{
          position: 'absolute',
          top: gameMode === 'challenge' ? 180 : 80,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        {bubbles.map((bubble) => {
          const bubbleColor = BUBBLE_COLORS[bubble.colorIndex];
          const isTarget = gameMode === 'challenge' && bubble.letter.id === targetLetter?.id;

          return (
            <Box
              key={bubble.id}
              onClick={(e) => handleBubbleClick(bubble, e)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleBubbleClick(bubble, e);
              }}
              sx={{
                position: 'absolute',
                left: `${bubble.x}%`,
                top: -120,
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${bubbleColor}ee, ${bubbleColor}aa 60%, ${bubbleColor}88)`,
                boxShadow: isTarget
                  ? `0 0 20px 5px ${targetLetter?.color || '#FF9800'}, 0 8px 20px rgba(0,0,0,0.3)`
                  : '0 8px 20px rgba(0,0,0,0.2), inset 0 -5px 15px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `fall-${bubble.id % 5} ${bubble.animationDuration}s linear forwards`,
                transition: 'transform 0.15s ease-out',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                '&:hover': {
                  transform: 'scale(1.15)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
                '@keyframes fall-0': {
                  '0%': { top: -120, transform: 'rotate(0deg)' },
                  '100%': { top: '100%', transform: 'rotate(20deg)' },
                },
                '@keyframes fall-1': {
                  '0%': { top: -120, transform: 'rotate(0deg)' },
                  '100%': { top: '100%', transform: 'rotate(-15deg)' },
                },
                '@keyframes fall-2': {
                  '0%': { top: -120, transform: 'rotate(0deg)' },
                  '100%': { top: '100%', transform: 'rotate(25deg)' },
                },
                '@keyframes fall-3': {
                  '0%': { top: -120, transform: 'rotate(0deg)' },
                  '100%': { top: '100%', transform: 'rotate(-20deg)' },
                },
                '@keyframes fall-4': {
                  '0%': { top: -120, transform: 'rotate(0deg)' },
                  '100%': { top: '100%', transform: 'rotate(10deg)' },
                },
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '40px', sm: '52px' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                  lineHeight: 1,
                  direction: 'rtl',
                }}
              >
                {t(`letters.${bubble.letter.id}.name`)}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  // Render results
  const renderResults = () => {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 100;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 2,
        }}
      >
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
        />

        <Paper
          elevation={8}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 4,
            maxWidth: 400,
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFECB3 100%)',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              fontSize: { xs: '24px', sm: '32px' },
            }}
          >
            {t('games.letterRain.gameComplete')}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              mb: 2,
              color: '#FF6B6B',
              fontWeight: 'bold',
              fontSize: { xs: '36px', sm: '48px' },
            }}
          >
            {score}
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, color: '#666' }}>
            {t('games.letterRain.totalScore')}
          </Typography>

          {gameMode === 'challenge' && (
            <Typography variant="h5" sx={{ mb: 3 }}>
              {t('games.letterRain.accuracy')}: {accuracy}% ({stats.correct}/{stats.total})
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <FunButton text={t('games.letterRain.playAgain')} onClick={resetGame} />
          </Box>
        </Paper>
      </Box>
    );
  };

  return (
    <>
      <BackButton />
      <Box
        sx={{
          minHeight: 'calc(100vh - 60px)',
          pt: 2,
          pb: 4,
        }}
      >
        {gameState === 'menu' && renderMenu()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'finished' && renderResults()}
      </Box>
    </>
  );
}
