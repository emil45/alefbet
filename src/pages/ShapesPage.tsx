import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import shapes from '../data/shapes';
import BackButton from '../components/BackButton';

const ShapesPage: React.FC = () => {
  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center" flexDirection="row-reverse">
        {shapes.map((shape, index) => (
          <Grid item key={index}>
            <ItemCard
              name=""
              element={shape.element}
              textColor={shape.color}
              soundFile={shape.soundFile}
              itemCaption={shape.shapeHebrewName}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShapesPage;
