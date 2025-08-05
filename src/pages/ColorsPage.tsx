import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import colors from '../data/colors';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';

const ColorsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';

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
              soundFile={`/audio/colors/${currentLanguage}/${color.audioFiles[currentLanguage as 'he' | 'en']}`}
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
