import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import numbers from '../data/numbers';
import BackButton from '../components/BackButton';

const NumbersPage: React.FC = () => {
  return (
    <>
    <BackButton />
    <Grid container spacing={4} justifyContent="center">
      {numbers.map((number, index) => (
        <Grid item key={index}>
          <ItemCard
            name={number.numberName}
            textColor={number.color}
            soundFile={number.soundFile}
            itemCaption={number.numberLetter}
          />
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default NumbersPage;
