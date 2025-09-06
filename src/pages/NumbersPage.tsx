import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import numbers from '../data/numbers';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';

const NumbersPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeContext();
  // Numbers display according to UI language direction
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {numbers.map((number, index) => (
          <Grid item key={index}>
            <ItemCard
              name={t(`numbers.${number.id}.name`)}
              textColor={number.color}
              soundFile={`/audio/numbers/he/${number.audioFile}`}
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
