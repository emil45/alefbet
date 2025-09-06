import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import colors from '../data/colors';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';

const ColorsPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeContext();
  // Colors display according to UI language direction
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {colors.map((color, index) => (
          <Grid item key={index}>
            <ItemCard
              name=""
              textColor={color.color}
              backgroundColor={color.color}
              soundFile={`/audio/colors/he/${color.audioFile}`}
              itemCaption={t(`colors.${color.id}.name`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ColorsPage;
