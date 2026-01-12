'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import letters from '@/data/letters';
import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';

export default function LettersPage() {
  const t = useTranslations();
  // Hebrew letters should always be displayed RTL, regardless of UI language
  const isRTL = true;

  return (
    <>
      <BackButton />
      <div style={{ direction: 'rtl' }}>
        <Grid container spacing={4} justifyContent="center">
          {letters.map((letter, index) => (
            <Grid key={index}>
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
}
