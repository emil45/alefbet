'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import shapes from '@/data/shapes';
import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';

export default function ShapesPage() {
  const t = useTranslations();
  const direction = useDirection();
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {shapes.map((shape, index) => (
          <Grid key={index}>
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
}
