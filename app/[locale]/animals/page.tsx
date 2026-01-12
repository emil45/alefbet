'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import animals from '@/data/animals';
import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';

export default function AnimalsPage() {
  const t = useTranslations();
  const direction = useDirection();
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {animals.map((animal, index) => (
          <Grid key={index}>
            <ItemCard
              name={animal.imageUrl}
              textColor={animal.color}
              soundFile={`/audio/animals/he/${animal.audioFile}`}
              itemCaption={t(`animals.${animal.id}.name`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
