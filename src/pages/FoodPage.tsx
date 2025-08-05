import React from 'react';
import { Grid, Typography } from '@mui/material';
import ItemCard from '../components/ItemCard';
import food from '../data/food';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';

const FoodPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {food.map((foodItem, index) => (
          <Grid item key={index}>
            <ItemCard
              name={foodItem.imageUrl}
              textColor={foodItem.color}
              soundFile={`/audio/food/${currentLanguage}/${foodItem.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || foodItem.audioFiles.en}`}
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
