'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import numbers from '@/data/numbers';
import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';

export default function NumbersPage() {
  const t = useTranslations();
  const direction = useDirection();
  // Numbers display according to UI language direction
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {numbers.map((number, index) => (
          <Grid key={index}>
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
}
