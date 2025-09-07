import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  LinearProgress,
  Modal,
  Card,
  CardContent,
} from '@mui/material';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';
import { shuffle } from '../utils/common';
import { AudioSounds, playSound } from '../utils/audio';
import Confetti from 'react-confetti';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface HebrewWord {
  word: string;
  letters: string[];
  meaning: string;
  audioFile: string;
}

const HEBREW_WORDS: HebrewWord[] = [
  { word: 'אבא', letters: ['א', 'ב', 'א'], meaning: 'אבא', audioFile: '/audio/words/he/abba.mp3' },
  { word: 'אמא', letters: ['א', 'מ', 'א'], meaning: 'אמא', audioFile: '/audio/words/he/ima.mp3' },
  { word: 'בית', letters: ['ב', 'י', 'ת'], meaning: 'בית', audioFile: '/audio/words/he/bayit.mp3' },
  { word: 'ים', letters: ['י', 'ם'], meaning: 'ים', audioFile: '/audio/words/he/yam.mp3' },
  { word: 'שמש', letters: ['ש', 'מ', 'ש'], meaning: 'שמש', audioFile: '/audio/words/he/shemesh.mp3' },
  { word: 'ילד', letters: ['י', 'ל', 'ד'], meaning: 'ילד', audioFile: '/audio/words/he/yeled.mp3' },
  { word: 'כלב', letters: ['כ', 'ל', 'ב'], meaning: 'כלב', audioFile: '/audio/words/he/kelev.mp3' },
  { word: 'חתול', letters: ['ח', 'ת', 'ו', 'ל'], meaning: 'חתול', audioFile: '/audio/words/he/chatul.mp3' },
  { word: 'פרח', letters: ['פ', 'ר', 'ח'], meaning: 'פרח', audioFile: '/audio/words/he/perach.mp3' },
  { word: 'דג', letters: ['ד', 'ג'], meaning: 'דג', audioFile: '/audio/words/he/dag.mp3' },
];

const WordBuilderGamePage: React.FC = () => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [builtWord, setBuiltWord] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [usedLetterIndices, setUsedLetterIndices] = useState<Set<number>>(new Set());

  const currentWord = HEBREW_WORDS[currentWordIndex];

  const initializeGame = useCallback(() => {
    const word = HEBREW_WORDS[currentWordIndex];
    // Add some extra random Hebrew letters to make it more challenging
    const extraLetters = ['א', 'ה', 'ו', 'ר', 'ת', 'נ', 'ל'];
    const availableLetters = [...word.letters];
    
    // Add 2-3 extra letters that aren't in the word
    const filteredExtra = extraLetters.filter(letter => !word.letters.includes(letter));
    const randomExtra = filteredExtra.slice(0, Math.min(2, Math.max(1, 6 - word.letters.length)));
    
    setShuffledLetters(shuffle([...availableLetters, ...randomExtra]));
    setBuiltWord([]);
    setIsCorrect(null);
    setUsedLetterIndices(new Set());
  }, [currentWordIndex]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleLetterClick = (letter: string, index: number) => {
    if (usedLetterIndices.has(index)) return;
    
    setBuiltWord(prev => [...prev, letter]);
    setUsedLetterIndices(prev => new Set([...Array.from(prev), index]));
    setIsCorrect(null);
  };

  const handleRemoveLetter = (indexToRemove: number) => {
    const letterToRemove = builtWord[indexToRemove];
    const originalIndex = shuffledLetters.findIndex((letter, idx) => 
      letter === letterToRemove && usedLetterIndices.has(idx)
    );
    
    setBuiltWord(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setUsedLetterIndices(prev => {
      const newSet = new Set(Array.from(prev));
      if (originalIndex !== -1) {
        newSet.delete(originalIndex);
      }
      return newSet;
    });
    setIsCorrect(null);
  };

  const checkWord = () => {
    const isWordCorrect = builtWord.join('') === currentWord.word;
    setIsCorrect(isWordCorrect);
    
    if (isWordCorrect) {
      setScore(prev => prev + 10);
      playSound(AudioSounds.SUCCESS);
      setShowConfetti(true);
      
      // Play word audio
      const audio = new Audio(currentWord.audioFile);
      audio.play().catch(() => {
        // Fallback if audio file doesn't exist
        console.log('Audio file not found:', currentWord.audioFile);
      });

      setTimeout(() => {
        setShowConfetti(false);
        if (currentWordIndex < HEBREW_WORDS.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
        } else {
          setIsGameComplete(true);
        }
      }, 2000);
    } else {
      playSound(AudioSounds.GAME_OVER);
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
  };

  return (
    <>
      <BackButton />
      
      {showConfetti && <Confetti />}
      
      <Box
        sx={{
          padding: 3,
          maxWidth: '800px',
          margin: '0 auto',
          direction: 'rtl',
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {t('games.buttons.wordBuilder')}
          </Typography>
          
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              {t('wordBuilder.score')}: {score}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(currentWordIndex / HEBREW_WORDS.length) * 100} 
              sx={{ width: '200px', height: '8px', borderRadius: '4px' }}
            />
            <Typography variant="h6">
              {currentWordIndex + 1} / {HEBREW_WORDS.length}
            </Typography>
          </Box>
        </Box>

        {!isGameComplete ? (
          <>
            {/* Current Word Challenge */}
            <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.dark' }}>
                {t('wordBuilder.buildWord')}: "{currentWord.meaning}"
              </Typography>
              
              {/* Built Word Display */}
              <Box 
                sx={{ 
                  minHeight: '80px', 
                  border: '2px dashed #ccc', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 1,
                  p: 2,
                  mb: 2,
                  backgroundColor: isCorrect === true ? '#e8f5e8' : isCorrect === false ? '#ffeaea' : '#f9f9f9'
                }}
              >
                {builtWord.length === 0 ? (
                  <Typography variant="h6" color="textSecondary">
                    {t('wordBuilder.dragLettersHere')}
                  </Typography>
                ) : (
                  builtWord.map((letter, index) => (
                    <Chip
                      key={index}
                      label={letter}
                      onClick={() => handleRemoveLetter(index)}
                      sx={{
                        fontSize: '1.5rem',
                        height: '50px',
                        cursor: 'pointer',
                        backgroundColor: 'primary.light',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                        }
                      }}
                    />
                  ))
                )}
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={2} justifyContent="center">
                <Button
                  variant="contained"
                  onClick={checkWord}
                  disabled={builtWord.length === 0}
                  startIcon={<CheckCircleIcon />}
                  sx={{ fontSize: '1.1rem' }}
                >
                  {t('wordBuilder.check')}
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={clearBuiltWord}
                  startIcon={<RefreshIcon />}
                >
                  {t('wordBuilder.clear')}
                </Button>
              </Box>

              {/* Feedback */}
              {isCorrect === true && (
                <Typography variant="h6" sx={{ color: 'success.main', mt: 2 }}>
                  {t('wordBuilder.correct')} ✨
                </Typography>
              )}
              {isCorrect === false && (
                <Typography variant="h6" sx={{ color: 'error.main', mt: 2 }}>
                  {t('wordBuilder.tryAgain')} 🤔
                </Typography>
              )}
            </Paper>

            {/* Available Letters */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom textAlign="center">
                {t('wordBuilder.availableLetters')}
              </Typography>
              
              <Grid container spacing={2} justifyContent="center">
                {shuffledLetters.map((letter, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={letter}
                      onClick={() => handleLetterClick(letter, index)}
                      disabled={usedLetterIndices.has(index)}
                      sx={{
                        fontSize: '1.8rem',
                        height: '60px',
                        width: '60px',
                        cursor: usedLetterIndices.has(index) ? 'default' : 'pointer',
                        backgroundColor: usedLetterIndices.has(index) ? '#e0e0e0' : 'secondary.light',
                        color: usedLetterIndices.has(index) ? '#999' : 'white',
                        '&:hover': {
                          backgroundColor: usedLetterIndices.has(index) ? '#e0e0e0' : 'secondary.main',
                        },
                        opacity: usedLetterIndices.has(index) ? 0.5 : 1,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </>
        ) : (
          /* Game Complete Modal */
          <Modal open={isGameComplete} onClose={resetGame}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '400px',
                bgcolor: 'background.paper',
                borderRadius: '15px',
                boxShadow: 24,
                p: 4,
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
                🎉 {t('wordBuilder.gameComplete')} 🎉
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                {t('wordBuilder.finalScore')}: {score}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {t('wordBuilder.congratulations')}
              </Typography>
              
              <Button
                variant="contained"
                onClick={resetGame}
                size="large"
                sx={{ fontSize: '1.2rem' }}
              >
                {t('wordBuilder.playAgain')}
              </Button>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default WordBuilderGamePage;