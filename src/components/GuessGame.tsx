import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import letters from '../data/letters';
import LetterCard from './LetterCard';

const GuessGame: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState(
    letters[Math.floor(Math.random() * letters.length)]
  );

  const getRandomLetter = () => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setCurrentLetter(randomLetter);
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <LetterCard letter={currentLetter} />
      </Box>
      <Button variant="contained" color="primary" onClick={getRandomLetter}>
        אות הבאה
      </Button>
    </Box>
  );
};

export default GuessGame;
