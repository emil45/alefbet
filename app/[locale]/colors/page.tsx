'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import colors from '@/data/colors';
import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';

export default function ColorsPage() {
  const t = useTranslations();
  const direction = useDirection();
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {colors.map((color, index) => (
          <Grid key={index}>
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
}
