'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Typography, Paper, keyframes } from '@mui/material';
import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';
import letters from '@/data/letters';
import { shuffle } from '@/utils/common';
import Confetti from 'react-confetti';
import FunButton from '@/components/FunButton';
import { AudioSounds, playSound } from '@/utils/audio';
import { useGameAnalytics } from '@/hooks/useGameAnalytics';
import { useCelebration } from '@/hooks/useCelebration';
import Celebration from '@/components/Celebration';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ReplayIcon from '@mui/icons-material/Replay';

interface LetterItem {
  id: string;
  name: string;
  fullName: string;
  audioFile: string;
  color: string;
}

// Visually distinct letters for easy mode (first few rounds)
const EASY_LETTER_IDS = [
  'letter_1',  // א (aleph)
  'letter_2',  // ב (bet)
  'letter_13', // מ (mem)
  'letter_21', // ש (shin)
  'letter_12', // ל (lamed) - distinctive tall letter
  'letter_16', // ע (ayin)
  'letter_19', // ק (kuf)
  'letter_22', // ת (tav)
];

// Confused letter pairs for harder rounds
const CONFUSED_PAIRS = [
  ['letter_4', 'letter_20'],  // ד (dalet) vs ר (resh)
  ['letter_8', 'letter_5'],   // ח (chet) vs ה (heh)
  ['letter_2', 'letter_11'],  // ב (bet) vs כ (kaf)
  ['letter_6', 'letter_7'],   // ו (vav) vs ז (zayin)
  ['letter_15', 'letter_13'], // ס (samech) vs מ (mem - final form similar)
];

const TOTAL_ROUNDS = 10;
const SOUND_PLAY_DELAY = 600;
const ANSWER_REVEAL_DELAY = 1500;

// Pulse animation for sound button
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Bounce animation for correct answer
const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
`;

// Shake animation for wrong answer
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
`;

export default function SoundMatchingContent() {
  const t = useTranslations();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { trackGameStarted, trackGameCompleted } = useGameAnalytics({ gameType: 'sound-matching' });
  const { celebrationState, celebrate, resetCelebration } = useCelebration();

  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentLetter, setCurrentLetter] = useState<LetterItem | null>(null);
  const [options, setOptions] = useState<LetterItem[]>([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [canSelect, setCanSelect] = useState(true);

  // Get all letters with translations
  const getAllLetters = useCallback((): LetterItem[] => {
    return letters.map((letter) => ({
      id: letter.id,
      name: t(`letters.${letter.id}.name`),
      fullName: t(`letters.${letter.id}.fullName`),
      audioFile: letter.audioFile,
      color: letter.color,
    }));
  }, [t]);

  // Stop any playing audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Play letter sound
  const playLetterSound = useCallback((audioFile: string) => {
    if (!audioFile) {
      console.error('[SoundMatching] playLetterSound called with empty audioFile');
      return;
    }
    stopAudio();
    setIsPlaying(true);
    const audioPath = `/audio/letters/he/${audioFile}`;
    audioRef.current = new Audio(audioPath);
    audioRef.current.onended = () => setIsPlaying(false);
    audioRef.current.onerror = () => {
      setIsPlaying(false);
      console.error('[SoundMatching] Audio load error for:', audioPath);
    };
    audioRef.current.play().catch((error) => {
      setIsPlaying(false);
      console.error('[SoundMatching] Audio playback failed:', audioPath, error);
    });
  }, [stopAudio]);

  // Generate a new question
  const generateQuestion = useCallback(() => {
    const allLetters = getAllLetters();
    let correctLetter: LetterItem;
    let wrongLetters: LetterItem[];

    // First 4 rounds: use easy (distinct) letters
    // Later rounds: mix in confused pairs for challenge
    if (round < 4) {
      // Easy mode: pick from visually distinct letters
      const easyLetters = allLetters.filter((l) => EASY_LETTER_IDS.includes(l.id));
      correctLetter = easyLetters[Math.floor(Math.random() * easyLetters.length)];
      wrongLetters = shuffle(easyLetters.filter((l) => l.id !== correctLetter.id)).slice(0, 3);
    } else {
      // Challenge mode: sometimes use confused pairs
      const useConfusedPair = Math.random() > 0.5 && round >= 5;

      if (useConfusedPair) {
        // Pick a confused pair
        const pair = CONFUSED_PAIRS[Math.floor(Math.random() * CONFUSED_PAIRS.length)];
        const pairLetters = allLetters.filter((l) => pair.includes(l.id));
        correctLetter = pairLetters[Math.floor(Math.random() * pairLetters.length)];

        // Include the confusing partner in wrong options
        const confusingPartner = pairLetters.find((l) => l.id !== correctLetter.id);
        const otherWrong = shuffle(allLetters.filter((l) => !pair.includes(l.id))).slice(0, 2);
        wrongLetters = confusingPartner ? [confusingPartner, ...otherWrong] : otherWrong.slice(0, 3);
      } else {
        // Normal mode: random letter from all
        correctLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
        wrongLetters = shuffle(allLetters.filter((l) => l.id !== correctLetter.id)).slice(0, 3);
      }
    }

    const allOptions = shuffle([correctLetter, ...wrongLetters]);

    setCurrentLetter(correctLetter);
    setOptions(allOptions);
    setSelectedId(null);
    setIsCorrect(null);
    setCanSelect(true);

    // Play the sound after a short delay
    setTimeout(() => {
      playLetterSound(correctLetter.audioFile);
    }, SOUND_PLAY_DELAY);
  }, [getAllLetters, round, playLetterSound]);

  // Handle answer selection
  const handleAnswer = useCallback((selectedLetter: LetterItem) => {
    if (!currentLetter || !canSelect) return;

    setCanSelect(false);
    setSelectedId(selectedLetter.id);
    const correct = selectedLetter.id === currentLetter.id;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      playSound(AudioSounds.SUCCESS);
      celebrate('correctAnswer');
    } else {
      playSound(AudioSounds.GAME_OVER);
      // Play the correct sound so they learn
      setTimeout(() => {
        playLetterSound(currentLetter.audioFile);
      }, 800);
    }

    // Move to next round or finish
    setTimeout(() => {
      const nextRound = round + 1;
      if (nextRound >= TOTAL_ROUNDS) {
        // Game complete
        trackGameCompleted(score + (correct ? 1 : 0));
        const finalScore = score + (correct ? 1 : 0);
        if (finalScore >= 7) {
          celebrate('gameComplete');
          setShowCelebration(true);
        }
        setGameState('finished');
      } else {
        setRound(nextRound);
        generateQuestion();
      }
    }, ANSWER_REVEAL_DELAY);
  }, [currentLetter, canSelect, round, score, playLetterSound, celebrate, trackGameCompleted, generateQuestion]);

  // Start the game
  const startGame = useCallback(() => {
    setGameState('playing');
    setRound(0);
    setScore(0);
    setShowCelebration(false);
    trackGameStarted();
    generateQuestion();
  }, [trackGameStarted, generateQuestion]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  // Replay sound button handler
  const handleReplaySound = useCallback(() => {
    if (currentLetter && canSelect) {
      playLetterSound(currentLetter.audioFile);
    }
  }, [currentLetter, canSelect, playLetterSound]);

  // Get button styles based on selection state
  function getOptionStyles(letter: LetterItem) {
    const isSelected = selectedId === letter.id;
    const isCorrectAnswer = currentLetter?.id === letter.id;

    // No selection yet - default interactive style
    if (isCorrect === null) {
      return {
        backgroundColor: '#fff',
        border: '4px solid #e0e0e0',
        color: letter.color,
        animation: 'none',
        cursor: 'pointer',
      };
    }

    // Correct answer should be highlighted (either selected correctly or revealed after wrong selection)
    if (isCorrectAnswer) {
      return {
        backgroundColor: '#e8f5e9',
        border: '4px solid #4caf50',
        color: letter.color,
        animation: isSelected ? `${bounce} 0.4s ease` : 'none',
        cursor: 'default',
      };
    }

    // Wrong selection
    if (isSelected) {
      return {
        backgroundColor: '#ffebee',
        border: '4px solid #f44336',
        color: letter.color,
        animation: `${shake} 0.4s ease`,
        cursor: 'default',
      };
    }

    // Other options after selection - dimmed
    return {
      backgroundColor: '#f5f5f5',
      border: '4px solid #e0e0e0',
      color: '#bdbdbd',
      animation: 'none',
      cursor: 'default',
    };
  }

  // Menu screen
  function renderMenu() {
    return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, p: 2 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#1565c0',
            mb: 2,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
          }}
        >
          {t('soundMatching.title')}
        </Typography>

        <Box sx={{ fontSize: '4rem', mb: 2 }}>
          🔊 🅰️
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: '#424242',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          {t('soundMatching.instructions')}
        </Typography>

        <FunButton
          onClick={startGame}
          text={t('soundMatching.start')}
          fontSize={24}
        />
      </Paper>
    </Box>
    );
  }

  // Game screen
  function renderGame() {
    return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, p: 2 }}>
      {/* Progress bar */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          width: '100%',
          maxWidth: 500,
          background: 'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" fontWeight="bold" color="#424242">
            {t('soundMatching.round')} {round + 1}/{TOTAL_ROUNDS}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="#4caf50">
            {t('soundMatching.score')}: {score}
          </Typography>
        </Box>

        {/* Progress dots */}
        <Box sx={{ display: 'flex', gap: 0.8, justifyContent: 'center' }}>
          {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
            let dotColor = '#e0e0e0'; // future rounds
            if (i < round) dotColor = '#4caf50'; // completed
            else if (i === round) dotColor = '#2196f3'; // current

            return (
              <Box
                key={i}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                  transition: 'all 0.3s ease',
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* Sound play button */}
      <Paper
        elevation={8}
        onClick={handleReplaySound}
        sx={{
          p: 4,
          borderRadius: '50%',
          width: 160,
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isPlaying
            ? 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)'
            : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          cursor: canSelect ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          animation: isPlaying ? `${pulse} 0.8s ease infinite` : 'none',
          '&:hover': canSelect ? {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 24px rgba(33, 150, 243, 0.3)',
          } : {},
          '&:active': canSelect ? {
            transform: 'scale(0.98)',
          } : {},
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          {isPlaying ? (
            <VolumeUpIcon sx={{ fontSize: 64, color: '#1565c0' }} />
          ) : (
            <ReplayIcon sx={{ fontSize: 64, color: '#1976d2' }} />
          )}
          <Typography variant="body2" color="#1565c0" fontWeight="bold" sx={{ mt: 0.5 }}>
            {isPlaying ? t('soundMatching.listening') : t('soundMatching.playAgain')}
          </Typography>
        </Box>
      </Paper>

      {/* Answer feedback message */}
      {isCorrect !== null && (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: isCorrect ? '#4caf50' : '#f44336',
            textAlign: 'center',
          }}
        >
          {isCorrect ? t('soundMatching.correct') : t('soundMatching.tryAgainMessage')}
        </Typography>
      )}

      {/* Letter options */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          maxWidth: 400,
          width: '100%',
        }}
      >
        {options.map((letter) => {
          const styles = getOptionStyles(letter);
          return (
            <Paper
              key={letter.id}
              elevation={selectedId ? 2 : 6}
              onClick={() => canSelect && handleAnswer(letter)}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                transition: 'all 0.2s ease',
                ...styles,
                '&:hover': canSelect ? {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                } : {},
                '&:active': canSelect ? {
                  transform: 'translateY(-2px)',
                } : {},
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '3rem', sm: '4rem' },
                  lineHeight: 1,
                }}
              >
                {letter.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  color: styles.color === '#bdbdbd' ? '#bdbdbd' : '#757575',
                  fontWeight: 500,
                }}
              >
                {letter.fullName}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
    );
  }

  // Results screen
  function renderResults() {
    const accuracy = Math.round((score / TOTAL_ROUNDS) * 100);
    const isGreatScore = score >= 7;
    const gradient = isGreatScore
      ? 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)'
      : 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)';

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, p: 2 }}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            background: gradient,
            borderRadius: 4,
            textAlign: 'center',
            maxWidth: 450,
            width: '100%',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: isGreatScore ? '#2e7d32' : '#e65100',
              mb: 2,
            }}
          >
            {isGreatScore ? t('soundMatching.greatJob') : t('soundMatching.goodTry')}
          </Typography>

          <Box sx={{ fontSize: '4rem', mb: 2 }}>
            {isGreatScore ? '🎉 ⭐ 🎉' : '💪 📚'}
          </Box>

          <Typography variant="h4" sx={{ color: '#424242', mb: 1 }}>
            {t('soundMatching.score')}: {score}/{TOTAL_ROUNDS}
          </Typography>

          <Typography variant="h5" sx={{ color: '#757575', mb: 3 }}>
            {accuracy}% {t('soundMatching.accuracy')}
          </Typography>

          <FunButton
            onClick={startGame}
            text={t('soundMatching.playAgainButton')}
            fontSize={22}
          />
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <BackButton href="/games" />
      {showCelebration && <Confetti recycle={false} numberOfPieces={200} />}
      <Celebration celebrationState={celebrationState} onComplete={resetCelebration} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '85vh',
          pt: 2,
        }}
      >
        {gameState === 'menu' && renderMenu()}
        {gameState === 'playing' && renderGame()}
        {gameState === 'finished' && renderResults()}
      </Box>
    </>
  );
}
