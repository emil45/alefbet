import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import letters from '../data/letters';
import ItemCard from './ItemCard';

const GuessGame: React.FC = () => {
  const getRandomItem = () => {
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const [currentItem, setCurrentItem] = useState(getRandomItem());

  const handleNextItem = () => {
    setCurrentItem(getRandomItem());
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <ItemCard
          name={currentItem.letterName}
          textColor={currentItem.color}
          soundFile={currentItem.soundFile}
          itemCaption={currentItem.letterFullName}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleNextItem}>
        אות הבאה
      </Button>
    </Box>
  );
};

export default GuessGame;
