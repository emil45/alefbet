import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import letters from '../data/letters';
import ItemCard from './ItemCard';
import shapes from '../data/shapes';
import numbers from '../data/numbers';
import animals from '../data/animals';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';
import colors from '../data/colors';
import FunButton from './FunButton';
import { useTranslation } from 'react-i18next';

const GuessGame: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';
  const allItems = [...letters, ...shapes, ...colors, ...numbers, ...animals];

  const getRandomItem = () => {
    return allItems[Math.floor(Math.random() * allItems.length)];
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
            soundFile={`/audio/letters/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en']}`}
            itemCaption={t(`letters.${currentItem.id}.fullName`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.SHAPES && (
          <ItemCard
            name=""
            element={currentItem.element}
            textColor={currentItem.color}
            soundFile={`/audio/shapes/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en']}`}
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
            soundFile={`/audio/colors/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en']}`}
            itemCaption={t(`colors.${currentItem.id}.name`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.NUMBERS && (
          <ItemCard
            name={t(`numbers.${currentItem.id}.name`)}
            textColor={currentItem.color}
            soundFile={`/audio/numbers/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en']}`}
            itemCaption={t(`numbers.${currentItem.id}.fullName`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.ANIMALS && (
          <ItemCard
            name={currentItem.imageUrl}
            textColor={currentItem.color}
            soundFile={`/audio/animals/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en']}`}
            itemCaption={t(`animals.${currentItem.id}.name`)}
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
