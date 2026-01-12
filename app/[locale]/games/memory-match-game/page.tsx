'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Modal,
} from '@mui/material';
import BackButton from '@/components/BackButton';
import letters from '@/data/letters';
import numbers from '@/data/numbers';
import shapes from '@/data/shapes';
import animals from '@/data/animals';
import food from '@/data/food';
import { shuffle } from '@/utils/common';
import MemoryMatchCard from '@/components/MemoryMatchCard';
import { MemoryMatchCardModel } from '@/models/MemoryMatchCardModel';
import Confetti from 'react-confetti';
import FunButton from '@/components/FunButton';
import RoundFunButton from '@/components/RoundFunButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AudioSounds, playSound } from '@/utils/audio';
import { useTranslations, useLocale } from 'next-intl';

const generateCards = (numCards: number, t: any): MemoryMatchCardModel[] => {
  const items: Omit<MemoryMatchCardModel, 'id' | 'matched'>[] = [
    ...letters.slice(0, 22).map((letter) => ({
      type: letter.type,
      name: t(`letters.${letter.id}.name`),
      textColor: letter.color,
    })),
    ...numbers.map((number) => ({
      type: number.type,
      name: t(`numbers.${number.id}.name`),
      textColor: number.color,
    })),
    ...shapes.map((shape) => ({
      type: shape.type,
      name: t(`shapes.${shape.id}.name`),
      textColor: shape.color,
      element: shape.element,
    })),
    ...animals.map((animal) => ({
      type: animal.type,
      name: animal.imageUrl,
      textColor: animal.color,
      imageUrl: animal.imageUrl,
    })),
    ...food.map((foodItem) => ({
      type: foodItem.type,
      name: foodItem.imageUrl,
      textColor: foodItem.color,
      imageUrl: foodItem.imageUrl,
    })),
  ];

  const shuffledItems = shuffle(items);
  const selectedItems = shuffledItems.slice(0, numCards / 2);
  const cards = selectedItems.flatMap((item, index) => [
    { ...item, id: index * 2, matched: false },
    { ...item, id: index * 2 + 1, matched: false },
  ]);

  return shuffle(cards);
};

export default function MemoryMatchGamePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [numCards, setNumCards] = useState<number>(10);
  const [cards, setCards] = useState<MemoryMatchCardModel[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Initialize cards on client side only
  useEffect(() => {
    setCards(generateCards(numCards, t));
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetGame = useCallback(() => {
    setIsResetting(true);
    setIsGameWon(false);

    setCards((prevCards) => prevCards.map((card) => ({ ...card, matched: false })));
    setFlippedCards([]);

    setTimeout(() => {
      setCards(generateCards(numCards, t));
      setIsResetting(false);
    }, 600);
  }, [numCards, t]);

  useEffect(() => {
    if (cards.length > 0) {
      resetGame();
    }
  }, [numCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setIsGameWon(true);
      playSound(AudioSounds.BONUS);
    }
  }, [cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (cards[firstCard].name === cards[secondCard].name) {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstCard || index === secondCard ? { ...card, matched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = useCallback(
    (index: number) => {
      if (flippedCards.length < 2 && !flippedCards.includes(index) && !cards[index].matched) {
        setFlippedCards((prev) => [...prev, index]);
      }
    },
    [flippedCards, cards]
  );

  const handleNumCardsChange = (event: SelectChangeEvent<number>) => {
    setNumCards(event.target.value as number);
  };

  const showModal = () => {
    return (
      <Modal
        open={isGameWon}
        onClose={resetGame}
        aria-labelledby="congratulations-modal"
        aria-describedby="congratulations-description"
      >
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
          <Typography id="congratulations-modal" variant="h5" component="h1" sx={{ mb: 4 }}>
            🥳 {t('games.memoryMatchGame.winMessage')}
          </Typography>
          <FunButton onClick={resetGame} text={t('games.memoryMatchGame.reset')} fontSize={18} />
        </Box>
      </Modal>
    );
  };

  const showConfetti = () => {
    return isGameWon && windowSize.width > 0 ? (
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
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={2000}
          gravity={0.05}
        />
      </Box>
    ) : null;
  };

  const showCards = () => {
    return (
      <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent="center">
        {cards.map((card, index) => (
          <Grid key={card.id}>
            <MemoryMatchCard
              card={card}
              flipped={flippedCards.includes(index) || card.matched}
              onClick={() => !isResetting && handleCardClick(index)}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const showHeaders = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <BackButton />
        <FormControl sx={{ width: 100 }}>
          <InputLabel id="num-cards-label">{t('games.memoryMatchGame.cardsNumber')}</InputLabel>
          <Select
            dir="rtl"
            labelId="num-cards-label"
            id="num-cards-select"
            value={numCards}
            label={t('games.memoryMatchGame.cardsNumber')}
            onChange={handleNumCardsChange}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={70}>70</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <RoundFunButton onClick={resetGame}>
          <RefreshIcon />
        </RoundFunButton>
      </Box>
    );
  };

  return (
    <Box>
      {showConfetti()}
      {showModal()}
      {showHeaders()}
      {showCards()}
    </Box>
  );
}
