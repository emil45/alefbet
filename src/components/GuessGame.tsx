import React, { useState, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import letters from '../data/letters';
import ItemCard from './ItemCard';
import shapes from '../data/shapes';
import numbers from '../data/numbers';
import animals from '../data/animals';
import food from '../data/food';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';
import colors from '../data/colors';

// Define union type for all possible item types
type GameItem =
  | (typeof letters)[0]
  | (typeof shapes)[0]
  | (typeof colors)[0]
  | (typeof numbers)[0]
  | (typeof animals)[0]
  | (typeof food)[0];
import FunButton from './FunButton';
import { useTranslation } from 'react-i18next';

const GuessGame: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';

  // Function to check if an item has translation for current language
  const hasTranslation = (item: GameItem): boolean => {
    try {
      // Try to get the translation - if it returns the key itself, translation is missing
      let translationKey = '';
      switch (item.type) {
        case ModelTypesEnum.LETTERS:
          translationKey = `letters.${item.id}.name`;
          break;
        case ModelTypesEnum.SHAPES:
          translationKey = `shapes.${item.id}.name`;
          break;
        case ModelTypesEnum.COLORS:
          translationKey = `colors.${item.id}.name`;
          break;
        case ModelTypesEnum.NUMBERS:
          translationKey = `numbers.${item.id}.name`;
          break;
        case ModelTypesEnum.ANIMALS:
          translationKey = `animals.${item.id}.name`;
          break;
        case ModelTypesEnum.FOOD:
          translationKey = `food.${item.id}.name`;
          break;
        default:
          return false;
      }

      const translation = t(translationKey);
      // If translation equals the key, it means translation is missing
      return translation !== translationKey;
    } catch (error) {
      return false;
    }
  };

  // Filter items based on available translations for current language
  const availableItems = useMemo(() => {
    const allItems = [...letters, ...shapes, ...colors, ...numbers, ...animals, ...food];
    return allItems.filter(hasTranslation);
  }, [currentLanguage, t]);

  const getRandomItem = () => {
    if (availableItems.length === 0) {
      // Fallback to all items if no translations found (shouldn't happen)
      const allItems = [...letters, ...shapes, ...colors, ...numbers, ...animals, ...food];
      return allItems[Math.floor(Math.random() * allItems.length)];
    }
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
            soundFile={`/audio/letters/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || currentItem.audioFiles.en}`}
            itemCaption={t(`letters.${currentItem.id}.fullName`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.SHAPES && (
          <ItemCard
            name=""
            element={(currentItem as any).element}
            textColor={currentItem.color}
            soundFile={`/audio/shapes/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || currentItem.audioFiles.en}`}
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
            soundFile={`/audio/colors/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || currentItem.audioFiles.en}`}
            itemCaption={t(`colors.${currentItem.id}.name`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.NUMBERS && (
          <ItemCard
            name={t(`numbers.${currentItem.id}.name`)}
            textColor={currentItem.color}
            soundFile={`/audio/numbers/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || currentItem.audioFiles.en}`}
            itemCaption={t(`numbers.${currentItem.id}.fullName`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.ANIMALS && (
          <ItemCard
            name={(currentItem as any).imageUrl}
            textColor={currentItem.color}
            soundFile={`/audio/animals/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || currentItem.audioFiles.en}`}
            itemCaption={t(`animals.${currentItem.id}.name`)}
            cardSize={2}
            isRTL={isRTL}
          />
        )}
        {currentItem.type === ModelTypesEnum.FOOD && (
          <ItemCard
            name={(currentItem as any).imageUrl}
            textColor={currentItem.color}
            soundFile={`/audio/food/${currentLanguage}/${currentItem.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || currentItem.audioFiles.en}`}
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
