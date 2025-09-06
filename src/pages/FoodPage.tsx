import React from 'react';
import { Grid, Typography } from '@mui/material';
import ItemCard from '../components/ItemCard';
import food from '../data/food';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';

const FoodPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeContext();
  // Food display according to UI language direction
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {food.map((foodItem, index) => (
          <Grid item key={index}>
            <ItemCard
              name={foodItem.imageUrl}
              textColor={foodItem.color}
              soundFile={`/audio/food/he/${foodItem.audioFile}`}
              itemCaption={t(`food.${foodItem.id}.name`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FoodPage;
