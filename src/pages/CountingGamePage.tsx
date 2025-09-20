import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Modal, Grid, Paper } from '@mui/material';
import BackButton from '../components/BackButton';
import numbers from '../data/numbers';
import shapes from '../data/shapes';
import animals from '../data/animals';
import food from '../data/food';
import { shuffle } from '../utils/common';
import Confetti from 'react-confetti';
import FunButton from '../components/FunButton';
import RoundFunButton from '../components/RoundFunButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AudioSounds, playSound } from '../utils/audio';
import { useTranslation } from 'react-i18next';

// Types for counting items
interface CountingItem {
  id: string;
  imageUrl?: string;
  element?: React.ReactElement;
  color: string;
  type: string;
}

// Number button component using same pattern as WordBuilder LetterCard
interface NumberButtonProps {
  number: number;
  isSelected: boolean;
  isCorrect: boolean;
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NumberButton: React.FC<NumberButtonProps> = ({
  number,
  isSelected,
  isCorrect,
  isDisabled,
  onClick,
  children
}) => {
  const getBackgroundColor = () => {
    if (isSelected && isCorrect) return '#4caf50';
    if (isSelected && !isCorrect) return '#f44336';
    if (!isSelected && isCorrect && isDisabled) return '#4caf50';
    return '#42a5f5';
  };

  const getEdgeColor = () => {
    if (isSelected && isCorrect) return 'linear-gradient(to left, #388e3c 0%, #4caf50 8%, #4caf50 92%, #388e3c 100%)';
    if (isSelected && !isCorrect) return 'linear-gradient(to left, #d32f2f 0%, #f44336 8%, #f44336 92%, #d32f2f 100%)';
    if (!isSelected && isCorrect && isDisabled) return 'linear-gradient(to left, #388e3c 0%, #4caf50 8%, #4caf50 92%, #388e3c 100%)';
    return 'linear-gradient(to left, #1976d2 0%, #2196f3 8%, #2196f3 92%, #1976d2 100%)';
  };

  return (
    <Box
      onClick={isDisabled ? undefined : onClick}
      sx={{
        cursor: isDisabled ? 'default' : 'pointer',
        opacity: isDisabled ? 0.8 : 1,
        position: 'relative',
        border: 'none',
        background: 'transparent',
        padding: '0',
        transition: 'all 250ms ease',
        pointerEvents: isDisabled ? 'none' : 'auto',
        '& .shadow': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: '#00000030',
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
          background: getEdgeColor(),
        },
        '& .front': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: 'white',
          fontWeight: 'bold',
          fontSize: { xs: '1.3rem', sm: '1.8rem' },
          width: { xs: '90px', sm: '110px' },
          height: { xs: '50px', sm: '70px' },
          borderRadius: '12px',
          background: getBackgroundColor(),
          transform: 'translateY(-4px)',
          transition: 'transform 300ms cubic-bezier(.3, .7, .4, 1)',
        },
        '&:hover': !isDisabled && {
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
        '&:active': !isDisabled && {
          '& .front': {
            transform: 'translateY(-2px)',
            transition: 'transform 50ms',
          },
          '& .shadow': {
            transform: 'translateY(1px)',
            transition: 'transform 50ms',
          },
        },
      }}
    >
      <Box className="shadow" />
      <Box className="edge" />
      <Box className="front">{children}</Box>
    </Box>
  );
};

const CountingGamePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';

  // Game state
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [objectsToCount, setObjectsToCount] = useState<CountingItem[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Available items for counting (excluding letters and colors)
  const countingItems: CountingItem[] = [
    ...shapes.map((shape) => ({
      id: shape.id,
      element: shape.element,
      color: shape.color,
      type: 'shape',
    })),
    ...animals.map((animal) => ({
      id: animal.id,
      imageUrl: (animal as any).imageUrl,
      color: animal.color,
      type: 'animal',
    })),
    ...food.map((foodItem) => ({
      id: foodItem.id,
      imageUrl: (foodItem as any).imageUrl,
      color: foodItem.color,
      type: 'food',
    })),
  ];

  const generateLevel = useCallback(() => {
    // Generate random count between 1 and min(10, currentLevel + 2)
    const maxCount = Math.min(10, currentLevel + 2);
    const count = Math.floor(Math.random() * maxCount) + 1;

    // Select random item type
    const randomItem = countingItems[Math.floor(Math.random() * countingItems.length)];

    // Create array of objects to count
    const objects = Array(count)
      .fill(null)
      .map((_, index) => ({
        ...randomItem,
        id: `${randomItem.id}_${index}`,
      }));

    setObjectsToCount(objects);
    setCorrectAnswer(count);

    // Generate answer options (correct answer + 3 random wrong answers)
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrongAnswer = Math.floor(Math.random() * 10) + 1;
      if (wrongAnswer !== count && !wrongAnswers.includes(wrongAnswer)) {
        wrongAnswers.push(wrongAnswer);
      }
    }

    const allOptions = shuffle([count, ...wrongAnswers]);
    setAnswerOptions(allOptions);
    setSelectedAnswer(null);
    setFeedback(null);
  }, [currentLevel]);

  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answer);

    if (answer === correctAnswer) {
      setFeedback('correct');
      setScore(score + 10);
      playSound(AudioSounds.DING); // Pleasant ding sound for correct answer

      setTimeout(() => {
        if (currentLevel >= 10) {
          setIsGameWon(true);
          playSound(AudioSounds.CELEBRATION); // Only celebrate when game is completely won
        } else {
          // Automatically move to next level after small timeout
          setCurrentLevel(currentLevel + 1);
          generateLevel();
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      playSound(AudioSounds.WRONG_ANSWER); // Better feedback for wrong answers

      // Show correct answer briefly, then reset
      setTimeout(() => {
        generateLevel();
      }, 2000);
    }
  };


  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setIsGameWon(false);
    generateLevel();
  };

  useEffect(() => {
    generateLevel();
  }, [generateLevel]);

  const renderObjects = () => {
    return (
      <Paper
        elevation={4}
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2 },
          minHeight: { xs: '120px', sm: '150px' },
        }}
      >
        {objectsToCount.map((obj, index) => (
          <Box
            key={obj.id}
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: obj.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '50px', sm: '70px' },
              height: { xs: '50px', sm: '70px' },
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.8)',
              border: `2px solid ${obj.color}`,
              transition: 'all 0.3s ease',
              animation: `fadeInScale 0.5s ease ${index * 0.1}s both`,
              fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", "EmojiSymbols", sans-serif',
              textRendering: 'optimizeQuality',
              '@keyframes fadeInScale': {
                '0%': {
                  opacity: 0,
                  transform: 'scale(0.5)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
              },
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: `0 4px 12px ${obj.color}40`,
              },
            }}
          >
            {obj.imageUrl ? (
              obj.imageUrl
            ) : obj.element ? (
              <svg
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                fill={obj.color}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              >
                {obj.element}
              </svg>
            ) : (
              '?'
            )}
          </Box>
        ))}
      </Paper>
    );
  };

  const renderAnswerOptions = () => {
    return (
      <Grid container spacing={{ xs: 1.5, sm: 2 }} justifyContent="center" sx={{ mb: { xs: 1, sm: 2 } }}>
        {answerOptions.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer;
          const showFeedback = feedback !== null;
          const isDisabled = selectedAnswer !== null;

          return (
            <Grid item key={option}>
              <NumberButton
                number={option}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isDisabled={isDisabled}
                onClick={() => handleAnswerSelect(option)}
              >
                {t(`numbers.number_${option}.name`)}
              </NumberButton>
            </Grid>
          );
        })}
      </Grid>
    );
  };


  const renderGameWonModal = () => {
    return (
      <Modal open={isGameWon} onClose={resetGame} aria-labelledby="game-won-modal">
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: theme.palette.colors.beigePastel,
            boxShadow: 24,
            borderRadius: '16px',
            p: 4,
            textAlign: 'center',
          })}
        >
          <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
            🏆 {t('games.countingGame.gameComplete')}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('games.countingGame.finalScore')}: {score}
          </Typography>
          <FunButton onClick={resetGame} text={t('games.countingGame.playAgain')} fontSize={18} />
        </Box>
      </Modal>
    );
  };

  const renderConfetti = () => {
    return isGameWon ? (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1400,
          pointerEvents: 'none',
        }}
      >
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.05}
        />
      </Box>
    ) : null;
  };

  return (
    <>
      <BackButton />
      {renderConfetti()}
      {renderGameWonModal()}

      <Box
        sx={{
          padding: { xs: 1, sm: 2 },
          maxWidth: '900px',
          margin: '0 auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with title and stats */}
        <Box textAlign="center" mb={{ xs: 1, sm: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={(theme) => ({
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: { xs: 0.5, sm: 1 },
            })}
          >
            {t('games.buttons.countingGame')}
          </Typography>

          {/* Stats in Paper container */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 1, sm: 1.5 },
              mb: { xs: 1, sm: 2 },
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              color: 'primary.main',
              border: '1px solid #dee2e6',
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={4}>
                <Typography variant={{ xs: 'body1', sm: 'h6' }} align="center" sx={{ fontWeight: 'bold' }}>
                  {t('games.countingGame.level')} {currentLevel}/10
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant={{ xs: 'body1', sm: 'h6' }} align="center" sx={{ fontWeight: 'bold' }}>
                  {t('games.countingGame.score')}: {score}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <RoundFunButton onClick={resetGame} sx={{ width: { xs: '40px', sm: '48px' }, height: { xs: '40px', sm: '48px' } }}>
                  <RefreshIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </RoundFunButton>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Game instruction */}
        <Typography
          variant={{ xs: 'h6', sm: 'h5' }}
          textAlign="center"
          sx={{
            mb: { xs: 1, sm: 2 },
            color: 'primary.main',
            fontWeight: 'bold',
            fontSize: { xs: '1.1rem', sm: '1.5rem' },
          }}
        >
          {t('games.countingGame.instruction')}
        </Typography>

        {/* Objects to count */}
        {renderObjects()}

        {/* Feedback */}
        {feedback === 'correct' && (
          <Box textAlign="center" sx={{ mb: { xs: 1, sm: 1.5 } }}>
            <Typography
              variant={{ xs: 'h6', sm: 'h5' }}
              sx={{
                color: '#4CAF50',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                animation: 'bounce 1s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-10px)' },
                  '60%': { transform: 'translateY(-5px)' },
                },
              }}
            >
              🎉 {t('games.countingGame.correct')}
            </Typography>
          </Box>
        )}

        {feedback === 'incorrect' && (
          <Box textAlign="center" sx={{ mb: { xs: 1, sm: 1.5 } }}>
            <Typography variant={{ xs: 'body1', sm: 'h6' }} sx={{ color: '#f44336', fontWeight: 'bold' }}>
              ❌ {t('games.countingGame.incorrect')}
            </Typography>
            <Typography variant={{ xs: 'body1', sm: 'h6' }} sx={{ color: '#4CAF50', mt: 0.5 }}>
              {t(`numbers.number_${correctAnswer}.name`)}
            </Typography>
          </Box>
        )}

        {/* Answer options */}
        {renderAnswerOptions()}
      </Box>
    </>
  );
};

export default CountingGamePage;
