import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import colors from '../data/colors';
import BackButton from '../components/BackButton';

const ColorsPage: React.FC = () => {
  return (
    <>
    <BackButton />
    <Grid container spacing={4} justifyContent="center" flexDirection='row-reverse'>
      {colors.map((color, index) => (
        <Grid item key={index}>
          <ItemCard
            name=""
            textColor={color.color}
            backgroundColor={color.color}
            soundFile={color.soundFile}
            itemCaption={color.colorName}
          />
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default ColorsPage;
