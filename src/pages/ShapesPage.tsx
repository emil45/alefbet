import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import shapes from '../data/shapes';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';

const ShapesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {shapes.map((shape, index) => (
          <Grid item key={index}>
            <ItemCard
              name=""
              element={shape.element}
              textColor={shape.color}
              soundFile={`/audio/shapes/${currentLanguage}/${shape.audioFiles[currentLanguage as 'he' | 'en']}`}
              itemCaption={t(`shapes.${shape.id}.name`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShapesPage;
