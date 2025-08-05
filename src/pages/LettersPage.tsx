import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '../components/ItemCard';
import letters from '../data/letters';
import BackButton from '../components/BackButton';
import { useTranslation } from 'react-i18next';

const LettersPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'he';
  const isRTL = currentLanguage === 'he';

  // Show only 22 letters for Hebrew, 26 for English, 33 for Russian
  const lettersToShow =
    currentLanguage === 'he' ? letters.slice(0, 22) : currentLanguage === 'ru' ? letters.slice(0, 33) : letters;

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {lettersToShow.map((letter, index) => (
          <Grid item key={index}>
            <ItemCard
              name={t(`letters.${letter.id}.name`)}
              textColor={letter.color}
              soundFile={`/audio/letters/${currentLanguage}/${letter.audioFiles[currentLanguage as 'he' | 'en' | 'ru'] || letter.audioFiles.en}`}
              itemCaption={t(`letters.${letter.id}.fullName`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LettersPage;
