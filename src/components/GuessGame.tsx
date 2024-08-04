import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import letters from '../data/letters';
import ItemCard from './ItemCard';
import { TEXTS } from '../data/texts';
import shapes from '../data/shapes';
import numbers from '../data/numbers';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';
import colors from '../data/colors';
import { LetterModel } from '../models/LetterModel';
import { ShapeModel } from '../models/ShapeModel';
import { ColorModel } from '../models/ColorModel';
import { NumberModel } from '../models/NumberModel';
import FunButton from './FunButton';

const GuessGame: React.FC = () => {
  const allItems = [...letters, ...shapes, ...colors, ...numbers];

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
            name={(currentItem as LetterModel).letterName}
            textColor={currentItem.color}
            soundFile={currentItem.soundFile}
            itemCaption={(currentItem as LetterModel).letterFullName}
            cardSize={2}
          />
        )}
        {currentItem.type === ModelTypesEnum.SHAPES && (
          <ItemCard
            name=""
            element={(currentItem as ShapeModel).element}
            textColor={currentItem.color}
            soundFile={currentItem.soundFile}
            itemCaption={(currentItem as ShapeModel).shapeHebrewName}
            cardSize={2}
          />
        )}
        {currentItem.type === ModelTypesEnum.COLORS && (
          <ItemCard
            name=""
            textColor={currentItem.color}
            backgroundColor={currentItem.color}
            soundFile={currentItem.soundFile}
            itemCaption={(currentItem as ColorModel).colorName}
            cardSize={2}
          />
        )}
        {currentItem.type === ModelTypesEnum.NUMBERS && (
          <ItemCard
            name={(currentItem as NumberModel).numberName}
            textColor={currentItem.color}
            soundFile={currentItem.soundFile}
            itemCaption={(currentItem as NumberModel).numberLetter}
            cardSize={2}
          />
        )}
      </Box>
      <FunButton onClick={handleNextItem} text={TEXTS.GUESS_GAME_NEXT_TEXT} />
    </Box>
  );
};

export default GuessGame;
