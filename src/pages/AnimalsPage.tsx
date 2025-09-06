import React from 'react';
import { Grid, Typography } from '@mui/material';
import ItemCard from '../components/ItemCard';
import animals from '../data/animals';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';

const AnimalsPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeContext();
  // Animals display according to UI language direction
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {animals.map((animal, index) => (
          <Grid item key={index}>
            <ItemCard
              name={animal.imageUrl}
              textColor={animal.color}
              soundFile={`/audio/animals/he/${animal.audioFile}`}
              itemCaption={t(`animals.${animal.id}.name`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AnimalsPage;
