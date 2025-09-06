import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import letters from '../data/letters';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';

const LettersPage: React.FC = () => {
  const { t } = useTranslation();
  // Hebrew letters should always be displayed RTL, regardless of UI language
  const isRTL = true;

  return (
    <>
      <BackButton />
      <div style={{ direction: 'rtl' }}>
        <Grid container spacing={4} justifyContent="center">
          {letters.map((letter, index) => (
            <Grid item key={index}>
              <ItemCard
                name={t(`letters.${letter.id}.name`)}
                textColor={letter.color}
                soundFile={`/audio/letters/he/${letter.audioFile}`}
                itemCaption={t(`letters.${letter.id}.fullName`)}
                isRTL={isRTL}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default LettersPage;
