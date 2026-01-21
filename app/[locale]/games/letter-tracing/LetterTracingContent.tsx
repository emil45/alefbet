'use client';

/**
 * LetterTracingContent
 *
 * Main component for the letter tracing game.
 * Uses pixel-based coverage detection for validation.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackButton from '@/components/BackButton';
import FunButton from '@/components/FunButton';
import { preloadSounds, playSound, AudioSounds, stopAllSounds } from '@/utils/audio';
import { useTranslations } from 'next-intl';
// Analytics/progress disabled - game is disabled and 'letter-tracing' removed from GameType
// import { useGameAnalytics } from '@/hooks/useGameAnalytics';
// import { useGamesProgressContext } from '@/contexts/GamesProgressContext';
import { useCelebration } from '@/hooks/useCelebration';
import Celebration from '@/components/Celebration';
import letters from '@/data/letters';

import type { Difficulty, GameState } from './types';
import { TracingCanvas } from './components/TracingCanvas';
import { DifficultyMenu } from './components/DifficultyMenu';

// Constants
const CANVAS_SIZE = 280;

// Difficulty settings
const DIFFICULTY_SETTINGS: Record<Difficulty, { strokeWidth: number; requiredCoverage: number }> = {
  easy: { strokeWidth: 22, requiredCoverage: 50 },
  medium: { strokeWidth: 16, requiredCoverage: 60 },
};

export default function LetterTracingContent() {
  const t = useTranslations();
  // Analytics/progress disabled - game is disabled and 'letter-tracing' removed from GameType
  // const { trackGameStarted, trackGameCompleted } = useGameAnalytics({ gameType: 'letter-tracing' });
  // const { recordGameCompleted } = useGamesProgressContext();
  const { celebrationState, celebrate, resetCelebration } = useCelebration();

  // Game state
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [tracedLetters, setTracedLetters] = useState<Set<string>>(new Set());
  const [coverage, setCoverage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0); // For forcing canvas reset

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Current letter and settings
  const currentLetter = letters[currentLetterIndex];
  const settings = DIFFICULTY_SETTINGS[difficulty];

  // Load traced letters from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lepdy_traced_letters');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTracedLetters(new Set(parsed));
        }
      }
    } catch (error) {
      console.error('[LetterTracing] Failed to load traced letters:', error);
    }
  }, []);

  // Preload sounds
  useEffect(() => {
    preloadSounds();
    return () => {
      stopAllSounds();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Play letter audio
  const playLetterAudio = useCallback(() => {
    if (!currentLetter) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audioPath = `/audio/letters/he/${currentLetter.audioFile}`;
    audioRef.current = new Audio(audioPath);
    audioRef.current.play().catch((error) => {
      console.error(`[LetterTracing] Audio playback failed:`, error);
    });
  }, [currentLetter]);

  // Handle coverage change
  const handleCoverageChange = useCallback((newCoverage: number) => {
    setCoverage(newCoverage);
  }, []);

  // Handle letter completion
  const handleComplete = useCallback(() => {
    setIsComplete(true);
    playSound(AudioSounds.SUCCESS);
    playLetterAudio();
    celebrate('correctAnswer');

    // Save traced letter
    if (currentLetter) {
      const newTracedLetters = new Set(tracedLetters);
      newTracedLetters.add(currentLetter.id);
      setTracedLetters(newTracedLetters);

      try {
        localStorage.setItem('lepdy_traced_letters', JSON.stringify([...newTracedLetters]));
      } catch (error) {
        console.error('[LetterTracing] Failed to save traced letters:', error);
      }

      // Celebrate milestone every 5 letters
      if (newTracedLetters.size % 5 === 0) {
        setTimeout(() => celebrate('milestone'), 1000);
      }
    }
  }, [currentLetter, tracedLetters, playLetterAudio, celebrate]);

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing');
    setCurrentLetterIndex(0);
    setCoverage(0);
    setIsComplete(false);
    setCanvasKey((k) => k + 1);
    // trackGameStarted(); // Analytics disabled - game is disabled
    playSound(AudioSounds.GAME_START);
  }, []);

  // Go to next letter
  const nextLetter = useCallback(() => {
    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex((prev) => prev + 1);
      setCoverage(0);
      setIsComplete(false);
      setCanvasKey((k) => k + 1);
      playSound(AudioSounds.WHOOSH);
    } else {
      // Game complete
      setGameState('complete');
      celebrate('gameComplete');
      // Analytics/progress disabled - game is disabled and 'letter-tracing' removed from GameType
      // trackGameCompleted(tracedLetters.size);
      // recordGameCompleted('letter-tracing', tracedLetters.size);
    }
  }, [currentLetterIndex, celebrate, tracedLetters.size]);

  // Go to previous letter
  const prevLetter = useCallback(() => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex((prev) => prev - 1);
      setCoverage(0);
      setIsComplete(false);
      setCanvasKey((k) => k + 1);
      playSound(AudioSounds.WHOOSH);
    }
  }, [currentLetterIndex]);

  // Clear current drawing
  const clearDrawing = useCallback(() => {
    setCoverage(0);
    setIsComplete(false);
    setCanvasKey((k) => k + 1);
    playSound(AudioSounds.POP);
  }, []);

  // Get translated letter name
  const letterName = currentLetter ? t(`${currentLetter.translationKey}.name`) : '';

  // Difficulty options for menu
  const difficultyOptions = [
    {
      key: 'easy' as Difficulty,
      label: t('games.letterTracing.difficulty.easy'),
      description: t('games.letterTracing.difficultyDesc.easy'),
    },
    {
      key: 'medium' as Difficulty,
      label: t('games.letterTracing.difficulty.medium'),
      description: t('games.letterTracing.difficultyDesc.medium'),
    },
  ];

  // Render menu
  if (gameState === 'menu') {
    return (
      <>
        <Celebration celebrationState={celebrationState} onComplete={resetCelebration} />
        <BackButton href="/games" />
        <DifficultyMenu
          title={t('games.letterTracing.title')}
          instructions={t('games.letterTracing.instructions')}
          selectDifficultyLabel={t('games.letterTracing.selectDifficulty')}
          startLabel={t('games.letterTracing.start')}
          tracedCountLabel={t('games.letterTracing.tracedCount', {
            count: tracedLetters.size,
            total: letters.length,
          })}
          difficulties={difficultyOptions}
          selectedDifficulty={difficulty}
          onDifficultySelect={setDifficulty}
          onStart={startGame}
        />
      </>
    );
  }

  // Render game complete
  if (gameState === 'complete') {
    return (
      <>
        <Celebration celebrationState={celebrationState} onComplete={resetCelebration} />
        <BackButton href="/games" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="70vh"
          gap={3}
          px={2}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ fontWeight: 'bold', color: 'success.main', mb: 2 }}
          >
            {t('games.letterTracing.complete')}
          </Typography>

          <Typography variant="h5" align="center" color="text.secondary">
            {t('games.letterTracing.tracedCount', {
              count: tracedLetters.size,
              total: letters.length,
            })}
          </Typography>

          <Box mt={3}>
            <FunButton text={t('games.letterTracing.playAgain')} onClick={startGame} />
          </Box>
        </Box>
      </>
    );
  }

  // Render playing state
  return (
    <>
      <Celebration celebrationState={celebrationState} onComplete={resetCelebration} />
      <BackButton href="/games" />

      <Box display="flex" flexDirection="column" alignItems="center" gap={2} px={2} pb={4}>
        {/* Progress bar */}
        <Box width="100%" maxWidth={CANVAS_SIZE} mb={1}>
          <Box
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${coverage}%`,
                borderRadius: 4,
                backgroundColor: isComplete ? 'success.main' : 'primary.main',
                transition: 'width 0.1s, background-color 0.3s',
              }}
            />
          </Box>
          <Typography variant="body2" align="center" color="text.secondary" mt={0.5}>
            {currentLetterIndex + 1} / {letters.length}
          </Typography>
        </Box>

        {/* Letter display */}
        <Typography
          variant="h2"
          sx={{
            color: currentLetter?.color || '#333',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {letterName}
        </Typography>

        {/* Tracing canvas */}
        <TracingCanvas
          key={canvasKey}
          size={CANVAS_SIZE}
          letterName={letterName}
          letterColor={currentLetter?.color || '#333'}
          requiredCoverage={settings.requiredCoverage}
          strokeWidth={settings.strokeWidth}
          isComplete={isComplete}
          onCoverageChange={handleCoverageChange}
          onComplete={handleComplete}
        />

        {/* Controls - RTL: next is on the left, prev on the right */}
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <IconButton
            onClick={nextLetter}
            disabled={currentLetterIndex === letters.length - 1 && !isComplete}
            sx={{
              backgroundColor: '#5e1c32',
              color: 'white',
              '&:hover': { backgroundColor: '#f74572' },
              '&:disabled': { backgroundColor: 'grey.300', color: 'grey.500' },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>

          <FunButton
            text={isComplete ? t('games.letterTracing.next') : t('games.letterTracing.clear')}
            onClick={isComplete ? nextLetter : clearDrawing}
          />

          <IconButton
            onClick={prevLetter}
            disabled={currentLetterIndex === 0}
            sx={{
              backgroundColor: '#5e1c32',
              color: 'white',
              '&:hover': { backgroundColor: '#f74572' },
              '&:disabled': { backgroundColor: 'grey.300', color: 'grey.500' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Hint */}
        <Typography variant="body2" color="text.secondary" align="center" mt={1}>
          {isComplete ? t('games.letterTracing.greatJob') : t('games.letterTracing.traceHint')}
        </Typography>
      </Box>
    </>
  );
}
