import React from 'react';
import { Grid, Typography } from '@mui/material';
import ItemCard from '../components/ItemCard';
import animals from '../data/animals';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';

const AnimalsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {animals.map((animal, index) => (
          <Grid item key={index}>
            <ItemCard
              name={animal.imageUrl}
              textColor={animal.color}
              soundFile={`/audio/animals/${currentLanguage}/${animal.audioFiles[currentLanguage as 'he' | 'en']}`}
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