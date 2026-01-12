'use client';

import React, { useState, useMemo } from 'react';
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

// Define union type for all possible item types
type GameItem =
  | (typeof letters)[0]
  | (typeof shapes)[0]
  | (typeof colors)[0]
  | (typeof numbers)[0]
  | (typeof animals)[0]
  | (typeof food)[0];

const GuessGame: React.FC = () => {
  const t = useTranslations();
  const direction = useDirection();
  // Content display according to UI language direction (except Hebrew letters which are always RTL)
  const isRTL = direction === 'rtl';

  // All items are available since Hebrew content is always present
  const availableItems = useMemo(() => {
    return [...letters, ...shapes, ...colors, ...numbers, ...animals, ...food];
  }, []);

  const getRandomItem = () => {
    return availableItems[Math.floor(Math.random() * availableItems.length)];
  };

  const [currentItem, setCurrentItem] = useState(getRandomItem());

  const handleNextItem = () => {
    setCurrentItem(getRandomItem());
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        {currentItem.type === ModelTypesEnum.LETTERS && (
          <ItemCard
            name={t(`letters.${currentItem.id}.name`)}
            textColor={currentItem.color}
            soundFile={`/audio/letters/he/${currentItem.audioFile}`}
            itemCaption={t(`letters.${currentItem.id}.fullName`)}
            cardSize={2}
            isRTL={true}
          />
        )}
        {currentItem.type === ModelTypesEnum.SHAPES && (
          <ItemCard
            name=""
            element={(currentItem as any).element}
            textColor={currentItem.color}
            soundFile={`/audio/shapes/he/${currentItem.audioFile}`}
            itemCaption={t(`shapes.${currentItem.id}.name`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.COLORS && (
          <ItemCard
            name=""
            textColor={currentItem.color}
            backgroundColor={currentItem.color}
            soundFile={`/audio/colors/he/${currentItem.audioFile}`}
            itemCaption={t(`colors.${currentItem.id}.name`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.NUMBERS && (
          <ItemCard
            name={t(`numbers.${currentItem.id}.name`)}
            textColor={currentItem.color}
            soundFile={`/audio/numbers/he/${currentItem.audioFile}`}
            itemCaption={t(`numbers.${currentItem.id}.fullName`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.ANIMALS && (
          <ItemCard
            name={(currentItem as any).imageUrl}
            textColor={currentItem.color}
            soundFile={`/audio/animals/he/${currentItem.audioFile}`}
            itemCaption={t(`animals.${currentItem.id}.name`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.FOOD && (
          <ItemCard
            name={(currentItem as any).imageUrl}
            textColor={currentItem.color}
            soundFile={`/audio/food/he/${currentItem.audioFile}`}
            itemCaption={t(`food.${currentItem.id}.name`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
      </Box>
      <FunButton onClick={handleNextItem} text={t('games.guessGame.next')} />
    </Box>
  );
};

export default GuessGame;
