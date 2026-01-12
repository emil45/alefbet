'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Grid, Modal } from '@mui/material';
import BackButton from '@/components/BackButton';
import FunButton from '@/components/FunButton';
import RoundFunButton from '@/components/RoundFunButton';
import { useTranslations } from 'next-intl';
import { shuffle } from '@/utils/common';
import { AudioSounds, playSound } from '@/utils/audio';
import Confetti from 'react-confetti';
import ClearIcon from '@mui/icons-material/Clear';
import { getRandomWords, type HebrewWord } from '@/data/hebrewWords';

// Game configuration
const WORDS_PER_GAME = 10;

interface LetterCardProps {
  letter: string;
  isUsed: boolean;
  onClick: () => void;
  isInBuilt?: boolean;
  onRemove?: () => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter, isUsed, onClick, isInBuilt, onRemove }) => {
  return (
    <Box
      onClick={isInBuilt ? onRemove : onClick}
      sx={(theme) => ({
        cursor: isUsed && !isInBuilt ? 'default' : 'pointer',
        opacity: isUsed && !isInBuilt ? 0.4 : 1,
        position: 'relative',
        border: 'none',
        background: 'transparent',
        padding: '0',
        outlineOffset: '4px',
        transition: 'all 250ms ease',
        pointerEvents: isUsed && !isInBuilt ? 'none' : 'auto',
        '& .shadow': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: '#00000030',
          willChange: 'transform',
          transform: 'translateY(2px)',
          transition: 'transform 300ms cubic-bezier(.3, .7, .4, 1)',
        },
        '& .edge': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: isInBuilt
            ? 'linear-gradient(to left, #1565c0 0%, #2196f3 8%, #2196f3 92%, #1565c0 100%)'
            : 'linear-gradient(to left, #388e3c 0%, #66bb6a 8%, #66bb6a 92%, #388e3c 100%)',
        },
        '& .front': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: theme.palette.colors.white,
          fontWeight: 'bold',
          fontSize: { xs: '28px', sm: '36px', md: '44px' },
          width: { xs: '60px', sm: '70px', md: '80px' },
          height: { xs: '60px', sm: '70px', md: '80px' },
          borderRadius: '12px',
          background: isInBuilt ? '#42a5f5' : '#81c784',
          willChange: 'transform',
          transform: 'translateY(-4px)',
          transition: 'transform 300ms cubic-bezier(.3, .7, .4, 1)',
          direction: 'rtl !important',
          unicodeBidi: 'bidi-override !important',
        },
        '&:hover': {
          filter: 'brightness(110%)',
          '& .front': {
            transform: 'translateY(-6px)',
            transition: 'transform 200ms cubic-bezier(.3, .7, .4, 1.5)',
          },
          '& .shadow': {
            transform: 'translateY(4px)',
            transition: 'transform 200ms cubic-bezier(.3, .7, .4, 1.5)',
          },
        },
        '&:active': {
          '& .front': {
            transform: 'translateY(-2px)',
            transition: 'transform 50ms',
          },
          '& .shadow': {
            transform: 'translateY(1px)',
            transition: 'transform 50ms',
          },
        },
      })}
    >
      <Box className="shadow" />
      <Box className="edge" />
      <Box className="front">{letter}</Box>
    </Box>
  );
};

export default function WordBuilderGamePage() {
  const t = useTranslations();
  const [gameWords] = useState<HebrewWord[]>(() => getRandomWords(WORDS_PER_GAME));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [builtWord, setBuiltWord] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [usedLetterIndices, setUsedLetterIndices] = useState<Set<number>>(new Set());

  const currentWord = gameWords[currentWordIndex];

  const initializeGame = useCallback(() => {
    const word = gameWords[currentWordIndex];
    // Add some extra random Hebrew letters to make it more challenging
    const extraLetters = ['א', 'ה', 'ו', 'ר', 'ת', 'נ', 'ל', 'מ', 'ש', 'ק'];
    const availableLetters = [...word.letters];

    // Add 2-3 extra letters that aren't in the word
    const filteredExtra = extraLetters.filter((letter) => !word.letters.includes(letter));
    const randomExtra = filteredExtra.slice(0, Math.min(3, Math.max(1, 8 - word.letters.length)));

    setShuffledLetters(shuffle([...availableLetters, ...randomExtra]));
    setBuiltWord([]);
    setIsCorrect(null);
    setUsedLetterIndices(new Set());

    // Play game start sound on first word, level up sound on subsequent words
    if (currentWordIndex === 0) {
      playSound(AudioSounds.GAME_START);
    } else {
      setTimeout(() => playSound(AudioSounds.TICK), 200);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleLetterClick = (letter: string, index: number) => {
    if (usedLetterIndices.has(index)) return;

    setBuiltWord((prev) => [...prev, letter]);
    setUsedLetterIndices((prev) => new Set([...Array.from(prev), index]));
    setIsCorrect(null);
    playSound(AudioSounds.LETTER_PICK);
  };

  const handleRemoveLetter = (indexToRemove: number) => {
    const letterToRemove = builtWord[indexToRemove];
    const originalIndex = shuffledLetters.findIndex(
      (letter, idx) => letter === letterToRemove && usedLetterIndices.has(idx)
    );

    setBuiltWord((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setUsedLetterIndices((prev) => {
      const newSet = new Set(Array.from(prev));
      if (originalIndex !== -1) {
        newSet.delete(originalIndex);
      }
      return newSet;
    });
    setIsCorrect(null);
    playSound(AudioSounds.LETTER_REMOVE);
  };

  const checkWord = () => {
    const isWordCorrect = builtWord.join('') === currentWord.word;
    setIsCorrect(isWordCorrect);

    if (isWordCorrect) {
      setScore((prev) => prev + 10);
      playSound(AudioSounds.WORD_COMPLETE);

      // Play word audio after a short delay
      setTimeout(() => {
        const audio = new Audio(currentWord.audioFile);
        audio.play().catch(() => {
          console.log('Audio file not found:', currentWord.audioFile);
        });
      }, 500);

      // Level up sound and progression
      setTimeout(() => {
        if (currentWordIndex < gameWords.length - 1) {
          playSound(AudioSounds.LEVEL_UP);
          setCurrentWordIndex((prev) => prev + 1);
        } else {
          playSound(AudioSounds.CELEBRATION);
          setShowConfetti(true);
          setIsGameComplete(true);
        }
      }, 2500);
    } else {
      playSound(AudioSounds.WRONG_ANSWER);
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setIsGameComplete(false);
    setShowConfetti(false);
  };

  const clearBuiltWord = () => {
    setBuiltWord([]);
    setUsedLetterIndices(new Set());
    setIsCorrect(null);
    playSound(AudioSounds.WHOOSH);
  };

  return (
    <>
      <BackButton />

      {showConfetti && <Confetti />}

      <Box
        sx={{
          padding: { xs: 2, sm: 3 },
          maxWidth: '900px',
          margin: '0 auto',
          direction: 'rtl',
          minHeight: '100vh',
        }}
      >
        {/* Header with beautiful styling */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            gutterBottom
            sx={(theme) => ({
              color: theme.palette.primary.light,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3,
            })}
          >
            {t('games.buttons.wordBuilder')}
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            sx={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              p: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {t('wordBuilder.score')}: {score}
            </Typography>

            <Box
              sx={{
                background: 'linear-gradient(45deg, #f74572, #ff6b6b)',
                borderRadius: '20px',
                px: 3,
                py: 1,
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                {currentWordIndex + 1} / {gameWords.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        {!isGameComplete ? (
          <>
            {/* Current Word Challenge - Beautiful Card */}
            <Paper
              elevation={8}
              sx={{
                p: 4,
                mb: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,248,250,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: 'primary.dark',
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' },
                }}
              >
                {t('wordBuilder.buildWord')}: "{currentWord.meaning}"
              </Typography>

              {/* Built Word Display - Beautiful RTL Container */}
              <Box
                sx={{
                  minHeight: '120px',
                  border:
                    isCorrect === true
                      ? '3px solid #4caf50'
                      : isCorrect === false
                        ? '3px solid #f44336'
                        : '3px dashed #ddd',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  p: 3,
                  mb: 4,
                  background:
                    isCorrect === true
                      ? 'rgba(76, 175, 80, 0.1)'
                      : isCorrect === false
                        ? 'rgba(244, 67, 54, 0.1)'
                        : 'rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
                }}
              >
                {builtWord.length === 0 ? (
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      opacity: 0.7,
                    }}
                  >
                    {t('wordBuilder.selectLettersHere')}
                  </Typography>
                ) : (
                  builtWord.map((letter, index) => (
                    <LetterCard
                      key={index}
                      letter={letter}
                      isUsed={false}
                      onClick={() => {}}
                      isInBuilt={true}
                      onRemove={() => handleRemoveLetter(index)}
                    />
                  ))
                )}
              </Box>

              {/* Action Buttons with your FunButton style */}
              <Box display="flex" gap={3} justifyContent="center" mb={3}>
                <FunButton
                  text={t('wordBuilder.check')}
                  onClick={checkWord}
                  fontSize={20}
                  backgroundColor={builtWord.length === 0 ? '#ccc' : '#4caf50'}
                />

                <Box sx={{ position: 'relative' }}>
                  <RoundFunButton onClick={clearBuiltWord}>
                    <ClearIcon />
                  </RoundFunButton>
                </Box>
              </Box>

              {/* Feedback Messages */}
              {isCorrect === true && (
                <Typography
                  variant="h5"
                  sx={{
                    color: 'success.main',
                    fontWeight: 'bold',
                    animation: 'bounce 0.5s ease',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  {t('wordBuilder.correct')} ✨
                </Typography>
              )}
              {isCorrect === false && (
                <Typography
                  variant="h5"
                  sx={{
                    color: 'error.main',
                    fontWeight: 'bold',
                    animation: 'shake 0.5s ease',
                  }}
                >
                  {t('wordBuilder.tryAgain')} 🤔
                </Typography>
              )}
            </Paper>

            {/* Available Letters - Beautiful Grid */}
            <Paper
              elevation={6}
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,242,247,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                textAlign="center"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  mb: 3,
                }}
              >
                {t('wordBuilder.availableLetters')}
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                {shuffledLetters.map((letter, index) => (
                  <Grid key={index}>
                    <LetterCard
                      letter={letter}
                      isUsed={usedLetterIndices.has(index)}
                      onClick={() => handleLetterClick(letter, index)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </>
        ) : (
          /* Game Complete Modal - Beautiful Design */
          <Modal open={isGameComplete} onClose={resetGame}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '500px',
                background: 'linear-gradient(135deg, #f74572 0%, #ff6b6b 100%)',
                borderRadius: '25px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                p: 4,
                textAlign: 'center',
                border: '3px solid rgba(255,255,255,0.2)',
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  mb: 3,
                }}
              >
                🎉 {t('wordBuilder.gameComplete')} 🎉
              </Typography>

              <Box
                sx={{
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '15px',
                  p: 3,
                  mb: 3,
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  {t('wordBuilder.finalScore')}: {score}
                </Typography>

                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  {t('wordBuilder.congratulations')}
                </Typography>
              </Box>

              <FunButton
                text={t('wordBuilder.playAgain')}
                onClick={resetGame}
                fontSize={24}
                backgroundColor="#4caf50"
              />
            </Box>
          </Modal>
        )}
      </Box>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}
      </style>
    </>
  );
}
