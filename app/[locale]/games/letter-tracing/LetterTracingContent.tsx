'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackButton from '@/components/BackButton';
import FunButton from '@/components/FunButton';
import { preloadSounds, playSound, AudioSounds, stopAllSounds } from '@/utils/audio';
import { useTranslations } from 'next-intl';
import { useGameAnalytics } from '@/hooks/useGameAnalytics';
import { useCelebration } from '@/hooks/useCelebration';
import Celebration from '@/components/Celebration';
import { useGamesProgressContext } from '@/contexts/GamesProgressContext';
import letters from '@/data/letters';
import { LETTER_PATHS, type Point } from './letterPaths';

type Difficulty = 'easy' | 'medium' | 'hard';
type GameState = 'menu' | 'playing' | 'complete';

interface DifficultyConfig {
  tolerance: number;
  showGuide: boolean;
  guideFade: boolean;
}

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: { tolerance: 30, showGuide: true, guideFade: false },
  medium: { tolerance: 20, showGuide: true, guideFade: true },
  hard: { tolerance: 10, showGuide: false, guideFade: false },
};

// Canvas dimensions
const CANVAS_SIZE = 300;
const LETTER_SCALE = 0.7;
const LETTER_OFFSET = CANVAS_SIZE * (1 - LETTER_SCALE) / 2;

export default function LetterTracingContent() {
  const t = useTranslations();
  const { trackGameStarted, trackGameCompleted } = useGameAnalytics({ gameType: 'letter-tracing' });
  const { celebrationState, celebrate, resetCelebration } = useCelebration();
  const { recordGameCompleted } = useGamesProgressContext();

  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [tracedLetters, setTracedLetters] = useState<Set<string>>(new Set());
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<Point[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [guideOpacity, setGuideOpacity] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastPointRef = useRef<Point | null>(null);

  const currentLetter = letters[currentLetterIndex];
  const letterPath = LETTER_PATHS[currentLetter.id];
  if (!letterPath) {
    console.error(
      `[LetterTracing] Missing path definition for letter: ${currentLetter.id}. ` +
      `Letter will not be traceable. Add path to letterPaths.ts.`
    );
  }
  const safeLetterPath = letterPath || [];
  const config = DIFFICULTY_CONFIG[difficulty];

  // Load traced letters from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lepdy_traced_letters');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTracedLetters(new Set(parsed));
        } else {
          console.error('[LetterTracing] Invalid traced letters format in localStorage');
        }
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error('[LetterTracing] Corrupted traced letters data in localStorage:', error);
      } else if (error instanceof DOMException) {
        console.error(`[LetterTracing] Storage access error (${error.name}):`, error);
      } else {
        console.error('[LetterTracing] Failed to load traced letters:', error);
      }
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Draw the reference letter on the guide canvas
  const drawGuideLetter = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (!config.showGuide && !config.guideFade) return;

    // Draw dotted path guide
    ctx.save();
    ctx.globalAlpha = guideOpacity;
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = config.tolerance * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([10, 10]);

    if (safeLetterPath.length > 0) {
      ctx.beginPath();
      const firstPoint = safeLetterPath[0];
      ctx.moveTo(
        LETTER_OFFSET + firstPoint.x * CANVAS_SIZE * LETTER_SCALE,
        LETTER_OFFSET + firstPoint.y * CANVAS_SIZE * LETTER_SCALE
      );

      for (let i = 1; i < safeLetterPath.length; i++) {
        const point = safeLetterPath[i];
        ctx.lineTo(
          LETTER_OFFSET + point.x * CANVAS_SIZE * LETTER_SCALE,
          LETTER_OFFSET + point.y * CANVAS_SIZE * LETTER_SCALE
        );
      }
      ctx.stroke();
    }

    // Draw letter outline
    ctx.setLineDash([]);
    ctx.strokeStyle = '#BDBDBD';
    ctx.lineWidth = 4;
    ctx.font = `bold ${CANVAS_SIZE * LETTER_SCALE}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const letterName = t(`${currentLetter.translationKey}.name`);
    ctx.strokeText(letterName, CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    ctx.restore();
  }, [config.showGuide, config.guideFade, config.tolerance, guideOpacity, safeLetterPath, currentLetter, t]);

  // Clear the drawing canvas
  const clearDrawingCanvas = useCallback(() => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, []);

  // Draw on the canvas
  const drawLine = useCallback((from: Point, to: Point) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = currentLetter.color;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }, [currentLetter.color]);

  // Calculate progress based on traced path
  const calculateProgress = useCallback((points: Point[]): number => {
    if (safeLetterPath.length === 0) return 0;

    const tolerance = config.tolerance;
    let matchedCount = 0;

    for (const pathPoint of safeLetterPath) {
      const targetX = LETTER_OFFSET + pathPoint.x * CANVAS_SIZE * LETTER_SCALE;
      const targetY = LETTER_OFFSET + pathPoint.y * CANVAS_SIZE * LETTER_SCALE;

      const isMatched = points.some((p) => {
        const distance = Math.sqrt(Math.pow(p.x - targetX, 2) + Math.pow(p.y - targetY, 2));
        return distance <= tolerance;
      });

      if (isMatched) matchedCount++;
    }

    return Math.min(100, Math.round((matchedCount / safeLetterPath.length) * 100));
  }, [safeLetterPath, config.tolerance]);

  // Handle drawing start
  const handleDrawStart = useCallback((clientX: number, clientY: number) => {
    if (gameState !== 'playing' || showSuccess) return;

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setIsDrawing(true);
    lastPointRef.current = { x, y };
    setDrawnPoints((prev) => [...prev, { x, y }]);
    playSound(AudioSounds.POP);
  }, [gameState, showSuccess]);

  // Handle drawing move
  const handleDrawMove = useCallback((clientX: number, clientY: number) => {
    if (!isDrawing || gameState !== 'playing' || showSuccess) return;

    const canvas = drawingCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (lastPointRef.current) {
      drawLine(lastPointRef.current, { x, y });
    }

    lastPointRef.current = { x, y };
    setDrawnPoints((prev) => {
      const newPoints = [...prev, { x, y }];
      const newProgress = calculateProgress(newPoints);
      setProgress(newProgress);

      // Fade guide on medium difficulty
      if (config.guideFade) {
        setGuideOpacity(Math.max(0.2, 1 - newProgress / 100));
      }

      return newPoints;
    });
  }, [isDrawing, gameState, showSuccess, drawLine, calculateProgress, config.guideFade]);

  // Handle drawing end
  const handleDrawEnd = useCallback(() => {
    setIsDrawing(false);
    lastPointRef.current = null;
  }, []);

  // Play letter audio
  const playLetterAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audioPath = `/audio/letters/he/${currentLetter.audioFile}`;
    audioRef.current = new Audio(audioPath);
    audioRef.current.play().catch((error) => {
      console.error(`[LetterTracing] Audio playback failed for "${audioPath}":`, error);
    });
  }, [currentLetter.audioFile]);

  // Check completion and handle success
  const checkCompletion = useCallback(() => {
    if (progress >= 80 && !showSuccess) {
      setShowSuccess(true);
      playSound(AudioSounds.SUCCESS);
      playLetterAudio();
      celebrate('correctAnswer');

      // Save traced letter
      const newTracedLetters = new Set(tracedLetters);
      newTracedLetters.add(currentLetter.id);
      setTracedLetters(newTracedLetters);

      try {
        localStorage.setItem('lepdy_traced_letters', JSON.stringify([...newTracedLetters]));
      } catch (error) {
        if (error instanceof DOMException) {
          if (error.name === 'QuotaExceededError') {
            console.error('[LetterTracing] Storage quota exceeded. Progress may not be saved.');
          } else if (error.name === 'SecurityError') {
            console.error('[LetterTracing] Storage access denied (private browsing?).');
          } else {
            console.error(`[LetterTracing] Storage error (${error.name}):`, error);
          }
        } else {
          console.error('[LetterTracing] Failed to save traced letters:', error);
        }
      }

      // Celebrate milestone every 5 letters
      if (newTracedLetters.size % 5 === 0) {
        setTimeout(() => celebrate('milestone'), 1000);
      }
    }
  }, [progress, showSuccess, playLetterAudio, celebrate, tracedLetters, currentLetter.id]);

  // Effect to check completion when progress changes
  useEffect(() => {
    if (gameState === 'playing') {
      checkCompletion();
    }
  }, [progress, gameState, checkCompletion]);

  // Effect to draw guide when letter changes
  useEffect(() => {
    if (gameState === 'playing') {
      drawGuideLetter();
    }
  }, [gameState, currentLetterIndex, drawGuideLetter]);

  // Reset letter state helper
  const resetLetterState = useCallback(() => {
    setDrawnPoints([]);
    setProgress(0);
    setShowSuccess(false);
    setGuideOpacity(1);
    clearDrawingCanvas();
  }, [clearDrawingCanvas]);

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing');
    setCurrentLetterIndex(0);
    resetLetterState();
    trackGameStarted();
    playSound(AudioSounds.GAME_START);
  }, [resetLetterState, trackGameStarted]);

  // Go to next letter
  const nextLetter = useCallback(() => {
    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex((prev) => prev + 1);
      resetLetterState();
      playSound(AudioSounds.WHOOSH);
    } else {
      // Game complete
      setGameState('complete');
      celebrate('gameComplete');
      trackGameCompleted(tracedLetters.size);
      recordGameCompleted('letter-tracing', tracedLetters.size);
    }
  }, [currentLetterIndex, resetLetterState, celebrate, trackGameCompleted, tracedLetters.size, recordGameCompleted]);

  // Go to previous letter
  const prevLetter = useCallback(() => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex((prev) => prev - 1);
      resetLetterState();
      playSound(AudioSounds.WHOOSH);
    }
  }, [currentLetterIndex, resetLetterState]);

  // Clear current drawing
  const clearDrawing = useCallback(() => {
    resetLetterState();
    drawGuideLetter();
    playSound(AudioSounds.POP);
  }, [resetLetterState, drawGuideLetter]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDrawStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDrawMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDrawEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDrawStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDrawMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDrawEnd();
  };

  // Render menu
  if (gameState === 'menu') {
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
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            {t('games.letterTracing.title')}
          </Typography>

          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 3 }}>
            {t('games.letterTracing.instructions')}
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} width="100%" maxWidth={300}>
            <Typography variant="subtitle1" align="center" fontWeight="bold">
              {t('games.letterTracing.selectDifficulty')}
            </Typography>

            {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
              <Box
                key={diff}
                onClick={() => setDifficulty(diff)}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: 'pointer',
                  border: difficulty === diff ? '3px solid' : '2px solid',
                  borderColor: difficulty === diff ? 'primary.main' : 'grey.300',
                  backgroundColor: difficulty === diff ? 'primary.light' : 'background.paper',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Typography variant="h6" align="center">
                  {t(`games.letterTracing.difficulty.${diff}`)}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  {t(`games.letterTracing.difficultyDesc.${diff}`)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box mt={3}>
            <FunButton text={t('games.letterTracing.start')} onClick={startGame} />
          </Box>

          <Typography variant="body2" color="text.secondary" align="center">
            {t('games.letterTracing.tracedCount', { count: tracedLetters.size, total: letters.length })}
          </Typography>
        </Box>
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
            sx={{
              fontWeight: 'bold',
              color: 'success.main',
              mb: 2,
            }}
          >
            {t('games.letterTracing.complete')}
          </Typography>

          <Typography variant="h5" align="center" color="text.secondary">
            {t('games.letterTracing.tracedCount', { count: tracedLetters.size, total: letters.length })}
          </Typography>

          <Box mt={3}>
            <FunButton text={t('games.letterTracing.playAgain')} onClick={startGame} />
          </Box>
        </Box>
      </>
    );
  }

  // Render playing state
  const letterName = t(`${currentLetter.translationKey}.name`);

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
                width: `${progress}%`,
                borderRadius: 4,
                backgroundColor: progress >= 80 ? 'success.main' : 'primary.main',
                transition: 'width 0.2s, background-color 0.3s',
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
            color: currentLetter.color,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {letterName}
        </Typography>

        {/* Canvas container */}
        <Box
          sx={{
            position: 'relative',
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            touchAction: 'none',
          }}
        >
          {/* Guide canvas (background) */}
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Drawing canvas (foreground) */}
          <canvas
            ref={drawingCanvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              cursor: 'crosshair',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          {/* Success overlay */}
          {showSuccess && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(76, 175, 80, 0.3)',
                borderRadius: 4,
              }}
            >
              <Typography variant="h1" sx={{ fontSize: 80 }}>
                ✓
              </Typography>
            </Box>
          )}
        </Box>

        {/* Controls */}
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <IconButton
            onClick={prevLetter}
            disabled={currentLetterIndex === 0}
            sx={{
              backgroundColor: 'primary.light',
              '&:hover': { backgroundColor: 'primary.main', color: 'white' },
              '&:disabled': { backgroundColor: 'grey.200' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <FunButton
            text={showSuccess ? t('games.letterTracing.next') : t('games.letterTracing.clear')}
            onClick={showSuccess ? nextLetter : clearDrawing}
          />

          <IconButton
            onClick={nextLetter}
            disabled={currentLetterIndex === letters.length - 1 && !showSuccess}
            sx={{
              backgroundColor: 'primary.light',
              '&:hover': { backgroundColor: 'primary.main', color: 'white' },
              '&:disabled': { backgroundColor: 'grey.200' },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        {/* Hint */}
        <Typography variant="body2" color="text.secondary" align="center" mt={1}>
          {showSuccess
            ? t('games.letterTracing.greatJob')
            : t('games.letterTracing.traceHint')}
        </Typography>
      </Box>
    </>
  );
}
