import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import letters from '../data/letters';
import BackButton from '../components/BackButton';

const LettersPage: React.FC = () => {
  return (
    <>
    <BackButton />
    <Grid container spacing={4} justifyContent="center" flexDirection='row-reverse'>
      {letters.map((letter, index) => (
        <Grid item key={index}>
          <ItemCard
            name={letter.letterName}
            textColor={letter.color}
            soundFile={letter.soundFile}
            itemCaption={letter.letterFullName}
          />
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default LettersPage;
