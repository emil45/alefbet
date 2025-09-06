import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import shapes from '../data/shapes';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../context/ThemeContext';

const ShapesPage: React.FC = () => {
  const { t } = useTranslation();
  const { direction } = useThemeContext();
  // Shapes display according to UI language direction
  const isRTL = direction === 'rtl';

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
              soundFile={`/audio/shapes/he/${shape.audioFile}`}
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
