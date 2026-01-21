'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import letters from '@/data/letters';
import ItemCard from './ItemCard';
import shapes from '@/data/shapes';
import numbers from '@/data/numbers';
import animals from '@/data/animals';
import food from '@/data/food';
import { ModelTypesEnum } from '@/models/ModelsTypesEnum';
import colors from '@/data/colors';
import FunButton from './FunButton';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';
import { useGamesProgressContext } from '@/contexts/GamesProgressContext';
import { useGameAnalytics } from '@/hooks/useGameAnalytics';

// All items combined at module level (static data)
const ALL_ITEMS = [...letters, ...shapes, ...colors, ...numbers, ...animals, ...food];

// Configuration for each item type
const ITEM_CONFIG = {
  [ModelTypesEnum.LETTERS]: { key: 'letters', folder: 'letters', useFullName: true, forceRTL: true },
  [ModelTypesEnum.NUMBERS]: { key: 'numbers', folder: 'numbers', useFullName: true },
  [ModelTypesEnum.SHAPES]: { key: 'shapes', folder: 'shapes', hasElement: true },
  [ModelTypesEnum.COLORS]: { key: 'colors', folder: 'colors', showBackground: true },
  [ModelTypesEnum.ANIMALS]: { key: 'animals', folder: 'animals', hasImage: true },
  [ModelTypesEnum.FOOD]: { key: 'food', folder: 'food', hasImage: true },
} as const;

const GuessGame: React.FC = () => {
  const t = useTranslations();
  const direction = useDirection();
  const isRTL = direction === 'rtl';
  const { recordGameCompleted } = useGamesProgressContext();
  const { trackGameStarted, trackGameCompleted } = useGameAnalytics({ gameType: 'guess-game' });
  const hasTrackedSessionRef = useRef(false);
  const itemsViewedRef = useRef(0);

  const getRandomItem = () => ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
  const [currentItem, setCurrentItem] = useState(getRandomItem);

  // Track game start on first mount
  useEffect(() => {
    if (!hasTrackedSessionRef.current) {
      trackGameStarted();
      hasTrackedSessionRef.current = true;
    }
  }, [trackGameStarted]);

  const handleNextItem = () => {
    setCurrentItem(getRandomItem());
    itemsViewedRef.current += 1;

    // Track as completed after viewing 5 items (a reasonable "session")
    if (itemsViewedRef.current === 5) {
      trackGameCompleted(5);
      recordGameCompleted('guess-game', 5);
    }
  };

  const config = ITEM_CONFIG[currentItem.type as keyof typeof ITEM_CONFIG];
  const hasImage = 'hasImage' in config;
  const hasElement = 'hasElement' in config;
  const showBackground = 'showBackground' in config;
  const itemProps = {
    name: hasImage ? (currentItem as any).imageUrl : (hasElement || showBackground) ? '' : t(`${config.key}.${currentItem.id}.name`),
    textColor: currentItem.color,
    soundFile: `/audio/${config.folder}/he/${currentItem.audioFile}`,
    itemCaption: t(`${config.key}.${currentItem.id}.${'useFullName' in config ? 'fullName' : 'name'}`),
    cardSize: 2 as const,
    isRTL: ('forceRTL' in config && config.forceRTL) || isRTL,
    ...(hasElement && { element: (currentItem as any).element }),
    ...(showBackground && { backgroundColor: currentItem.color }),
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <ItemCard {...itemProps} />
      </Box>
      <FunButton onClick={handleNextItem} text={t('games.guessGame.next')} />
    </Box>
  );
};

export default GuessGame;
