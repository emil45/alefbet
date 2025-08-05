import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import numbers from '../data/numbers';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';

const NumbersPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {numbers.map((number, index) => (
          <Grid item key={index}>
            <ItemCard
              name={t(`numbers.${number.id}.name`)}
              textColor={number.color}
              soundFile={`/audio/numbers/${currentLanguage}/${number.audioFiles[currentLanguage as 'he' | 'en']}`}
              itemCaption={t(`numbers.${number.id}.fullName`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NumbersPage;
