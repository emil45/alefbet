'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import food from '@/data/food';
import BackButton from '@/components/BackButton';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';

export default function FoodPage() {
  const t = useTranslations();
  const direction = useDirection();
  const isRTL = direction === 'rtl';

  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center">
        {food.map((foodItem, index) => (
          <Grid key={index}>
            <ItemCard
              name={foodItem.imageUrl}
              textColor={foodItem.color}
              soundFile={`/audio/food/he/${foodItem.audioFile}`}
              itemCaption={t(`food.${foodItem.id}.name`)}
              isRTL={isRTL}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
