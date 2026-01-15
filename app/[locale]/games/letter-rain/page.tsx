'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { useTranslations } from 'next-intl';
import RoundFunButton from '@/components/RoundFunButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import FunButton from '@/components/FunButton';
import Confetti from 'react-confetti';
import letters from '@/data/letters';
import { playSound, AudioSounds } from '@/utils/audio';
import { submitScore, getTopScore } from '@/lib/firebase';
import numbers from '@/data/numbers';
import shapes from '@/data/shapes';
import { ModelTypesEnum } from '@/models/ModelsTypesEnum';

type ItemType = (typeof letters)[0] | (typeof numbers)[0] | (typeof shapes)[0];

interface Bubble {
  id: number;
  item: ItemType;
  x: number;
  animationDuration: number;
  colorIndex: number;
}

type GameState = 'menu' | 'playing' | 'finished';
type GameMode = 'freeplay' | 'challenge';
type Difficulty = 'slow' | 'medium' | 'fast' | 'superfast' | 'ultrafast';

const GAME_DURATION = 60;
const SPAWN_INTERVALS: Record<Difficulty, number> = {
  slow: 2500,
  medium: 1800,
  fast: 1200,
  superfast: 700,
  ultrafast: 450,
};
const ANIMATION_DURATIONS: Record<Difficulty, { min: number; max: number }> = {
  slow: { min: 10, max: 14 },
  medium: { min: 7, max: 10 },
  fast: { min: 5, max: 7 },
  superfast: { min: 3, max: 5 },
  ultrafast: { min: 2, max: 3 },
};

// Target spawning: base chance increases with each miss to guarantee appearance
const TARGET_BASE_CHANCE = 0.35;
const TARGET_CHANCE_INCREMENT = 0.2; // Adds 20% per miss
const TARGET_MAX_MISSES = 4; // After 4 misses, 100% chance

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
  const router = useRouter();

  // Game State
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('freeplay');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeShapes, setIncludeShapes] = useState(false);
  const [globalHighScore, setGlobalHighScore] = useState(0);
  const [globalHighScoreDate, setGlobalHighScoreDate] = useState<Date | null>(null);

  // Playing State
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [targetItem, setTargetItem] = useState<ItemType | null>(null);
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
  const targetItemRef = useRef<ItemType | null>(null);
  const hasTargetOnScreenRef = useRef(false);
  const includeNumbersRef = useRef(false);
  const includeShapesRef = useRef(false);
  const spawnsSinceTargetRef = useRef(0); // Track spawns since last target for progressive probability

  // Get random item (letter, number, or shape)
  const getRandomItem = useCallback((): ItemType => {
    let pool: ItemType[] = [...letters];
    if (includeNumbersRef.current) pool = [...pool, ...numbers];
    if (includeShapesRef.current) pool = [...pool, ...shapes];
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  // Clear all bubble timeouts
  const clearBubbleTimeouts = useCallback(() => {
    bubbleTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    bubbleTimeoutsRef.current.clear();
  }, []);

  // Spawn a new bubble
  const spawnBubble = useCallback(
    (forceTargetItem?: ItemType | null) => {
      const durations = ANIMATION_DURATIONS[difficulty];
      const bubbleId = nextBubbleId.current++;

      // In challenge mode, spawn target item with progressive probability
      let itemToUse: ItemType;
      let isTargetItem = false;

      if (forceTargetItem) {
        if (!hasTargetOnScreenRef.current) {
          // No target on screen - we have a chance to spawn one
          const spawnChance = Math.min(
            1,
            TARGET_BASE_CHANCE + spawnsSinceTargetRef.current * TARGET_CHANCE_INCREMENT
          );

          if (Math.random() < spawnChance) {
            itemToUse = forceTargetItem;
            isTargetItem = true;
            hasTargetOnScreenRef.current = true;
            spawnsSinceTargetRef.current = 0; // Reset counter
          } else {
            // Chose not to spawn target - increment miss counter
            do {
              itemToUse = getRandomItem();
            } while (itemToUse.id === forceTargetItem.id && itemToUse.type === forceTargetItem.type);
            spawnsSinceTargetRef.current++;
          }
        } else {
          // Target already on screen - just spawn a random non-target (don't increment counter)
          do {
            itemToUse = getRandomItem();
          } while (itemToUse.id === forceTargetItem.id && itemToUse.type === forceTargetItem.type);
        }
      } else {
        itemToUse = getRandomItem();
      }

      const bubble: Bubble = {
        id: bubbleId,
        item: itemToUse,
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
          // If this was the target item, mark it as no longer on screen
          if (isTargetItem) {
            hasTargetOnScreenRef.current = false;
          }
        },
        bubble.animationDuration * 1000 + 500
      );
      bubbleTimeoutsRef.current.set(bubbleId, timeoutId);
    },
    [difficulty, getRandomItem]
  );

  // Handle bubble click
  const handleBubbleClick = useCallback(
    (bubble: Bubble, event: React.MouseEvent | React.TouchEvent) => {
      event.stopPropagation();

      // Play audio - determine folder based on type
      const audioFolderMap: Record<ModelTypesEnum, string> = {
        [ModelTypesEnum.LETTERS]: 'letters',
        [ModelTypesEnum.NUMBERS]: 'numbers',
        [ModelTypesEnum.SHAPES]: 'shapes',
        [ModelTypesEnum.COLORS]: 'colors',
        [ModelTypesEnum.ANIMALS]: 'animals',
        [ModelTypesEnum.FOOD]: 'food',
        [ModelTypesEnum.MEMORY_MATCH_CARD]: 'common',
      };
      const audioFolder = audioFolderMap[bubble.item.type] || 'letters';
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(`/audio/${audioFolder}/he/${bubble.item.audioFile}`);
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
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore > 0 && newScore % 100 === 0) {
            playSound(AudioSounds.CELEBRATION);
          }
          return newScore;
        });
        playSound(AudioSounds.POP);
      } else {
        setStats((prev) => ({ ...prev, total: prev.total + 1 }));

        if (bubble.item.id === targetItem?.id && bubble.item.type === targetItem?.type) {
          setScore((prev) => {
            const newScore = prev + 10;
            // Play celebration sound when crossing 100-point milestones
            if (Math.floor(newScore / 100) > Math.floor(prev / 100)) {
              playSound(AudioSounds.CELEBRATION);
            }
            return newScore;
          });
          setStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
          playSound(AudioSounds.SUCCESS);
          // Target was clicked, allow new one to spawn
          hasTargetOnScreenRef.current = false;
          const newTarget = getRandomItem();
          setTargetItem(newTarget);
          targetItemRef.current = newTarget;
        } else {
          setScore((prev) => Math.max(0, prev - 20));
          playSound(AudioSounds.WRONG_ANSWER);
        }
      }
    },
    [gameMode, targetItem, getRandomItem]
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

  // Submit score when game finishes (challenge mode only)
  useEffect(() => {
    if (gameState === 'finished' && gameMode === 'challenge' && score > globalHighScore) {
      submitScore('letter-rain', score);
      setGlobalHighScore(score);
      setGlobalHighScoreDate(new Date());
    }
  }, [gameState, gameMode, score, globalHighScore]);

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setStats({ correct: 0, total: 0 });
    setGameTime(0);
    setBubbles([]);
    nextBubbleId.current = 0;
    hasTargetOnScreenRef.current = false;
    includeNumbersRef.current = includeNumbers;
    includeShapesRef.current = includeShapes;
    spawnsSinceTargetRef.current = 0;

    playSound(AudioSounds.GAME_START);

    const initialTarget = gameMode === 'challenge' ? getRandomItem() : null;
    if (initialTarget) {
      setTargetItem(initialTarget);
      targetItemRef.current = initialTarget;
    }

    // Start spawn timer - in challenge mode, pass target item
    spawnTimerRef.current = setInterval(() => {
      spawnBubble(targetItemRef.current);
    }, SPAWN_INTERVALS[difficulty]);

    // Spawn first bubble immediately (with target item in challenge mode)
    spawnBubble(initialTarget);

    // Start game timer
    gameTimerRef.current = setInterval(() => {
      setGameTime((prev) => prev + 1);
    }, 1000);
  }, [gameMode, difficulty, spawnBubble, getRandomItem, includeNumbers, includeShapes]);

  // Watch gameTime and end game when time is up
  useEffect(() => {
    if (gameState === 'playing' && gameTime >= GAME_DURATION) {
      endGame();
    }
  }, [gameTime, gameState, endGame]);

  // Reset to menu
  const resetGame = useCallback(() => {
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
    setGameState('menu');
    setTargetItem(null);
  }, [clearBubbleTimeouts]);

  // Handle back button - go to menu if playing/finished, otherwise go back
  const handleBack = useCallback(() => {
    if (gameState === 'menu') {
      setTimeout(() => router.back(), 500);
    } else {
      resetGame();
    }
  }, [gameState, router, resetGame]);

  // Load global high score
  useEffect(() => {
    getTopScore('letter-rain').then((record) => {
      if (record) {
        setGlobalHighScore(record.score);
        setGlobalHighScoreDate(new Date(record.timestamp));
      }
    });
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
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <FunButton
          text={t('games.letterRain.freePlay')}
          onClick={() => setGameMode('freeplay')}
          backgroundColor={gameMode === 'freeplay' ? '#4CAF50' : '#9E9E9E'}
          fontSize={18}
          paddingX={16}
        />
        <FunButton
          text={t('games.letterRain.challenge')}
          onClick={() => setGameMode('challenge')}
          backgroundColor={gameMode === 'challenge' ? '#FF9800' : '#9E9E9E'}
          fontSize={18}
          paddingX={16}
        />
      </Box>

      {/* Global High Score for Challenge Mode */}
      {gameMode === 'challenge' && (
        <Typography variant="body1" sx={{ opacity: 0.7, textAlign: 'center' }}>
          🏆 {t('games.letterRain.globalHighScore')}:{' '}
          {globalHighScore > 0
            ? `${globalHighScore} (${globalHighScoreDate?.getDate()}/${(globalHighScoreDate?.getMonth() ?? 0) + 1}/${globalHighScoreDate?.getFullYear()})`
            : '---'}
        </Typography>
      )}

      {/* Include Numbers & Shapes */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
            />
          }
          label={
            <Typography sx={{ fontSize: '18px' }}>
              🔢 {t('games.letterRain.includeNumbers')}
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeShapes}
              onChange={(e) => setIncludeShapes(e.target.checked)}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
            />
          }
          label={
            <Typography sx={{ fontSize: '18px' }}>
              🔷 {t('games.letterRain.includeShapes')}
            </Typography>
          }
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
            🐢 {t('games.letterRain.slow')}
          </MenuItem>
          <MenuItem value="medium" sx={{ fontSize: '18px' }}>
            🚶 {t('games.letterRain.medium')}
          </MenuItem>
          <MenuItem value="fast" sx={{ fontSize: '18px' }}>
            🏃 {t('games.letterRain.fast')}
          </MenuItem>
          <MenuItem value="superfast" sx={{ fontSize: '18px' }}>
            🚀 {t('games.letterRain.superfast')}
          </MenuItem>
          <MenuItem value="ultrafast" sx={{ fontSize: '18px' }}>
            ⚡ {t('games.letterRain.ultrafast')}
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
        maxWidth: '600px',
        mx: 'auto',
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
          position: 'relative',
          zIndex: 10,
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
      {gameMode === 'challenge' && targetItem && (
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
            position: 'relative',
            zIndex: 10,
            minHeight: { xs: '80px', sm: '100px' },
          }}
        >
          <Box
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              fontSize: { xs: '20px', sm: '28px' },
              height: { xs: '50px', sm: '70px' },
            }}
          >
            <Typography sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
              {t('games.letterRain.findLetter')}
            </Typography>
            {targetItem.type === ModelTypesEnum.SHAPES && 'element' in targetItem ? (
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{
                  width: { xs: '50px', sm: '70px' },
                  height: { xs: '50px', sm: '70px' },
                  fill: targetItem.color,
                  animation: 'pulse 1s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  },
                }}
              >
                {targetItem.element}
              </Box>
            ) : (
              <Box
                component="span"
                sx={{
                  color: targetItem.color,
                  fontSize: { xs: '40px', sm: '56px' },
                  lineHeight: 1,
                  animation: 'pulse 1s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  },
                }}
              >
                {t(`${targetItem.translationKey}.name`)}
              </Box>
            )}
          </Box>
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
          zIndex: 1,
        }}
      >
        {bubbles.map((bubble) => {
          const bubbleColor = BUBBLE_COLORS[bubble.colorIndex];
          const isTarget = gameMode === 'challenge' && bubble.item.id === targetItem?.id && bubble.item.type === targetItem?.type;

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
                width: { xs: 80, sm: 120 },
                height: { xs: 80, sm: 120 },
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${bubbleColor}ee, ${bubbleColor}aa 60%, ${bubbleColor}88)`,
                boxShadow: isTarget
                  ? `0 0 20px 5px ${targetItem?.color || '#FF9800'}, 0 8px 20px rgba(0,0,0,0.3)`
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
              {bubble.item.type === ModelTypesEnum.SHAPES && 'element' in bubble.item ? (
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{
                    width: { xs: '50px', sm: '70px' },
                    height: { xs: '50px', sm: '70px' },
                    fill: bubble.item.color,
                    filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))',
                  }}
                >
                  {bubble.item.element}
                </Box>
              ) : (
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
                  {t(`${bubble.item.translationKey}.name`)}
                </Typography>
              )}
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
      <Box sx={{ textAlign: 'left' }}>
        <RoundFunButton onClick={handleBack}>
          <ArrowBackIcon />
        </RoundFunButton>
      </Box>
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
