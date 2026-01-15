'use client';

import React from 'react';
import { Box, Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import BackButton from '@/components/BackButton';
import PageIntro from '@/components/PageIntro';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';

type RenderMode = 'text' | 'image' | 'element' | 'color';

interface BaseItem {
  id: string;
  color: string;
  audioFile: string;
}

interface ImageItem extends BaseItem {
  imageUrl: string;
}

interface ElementItem extends BaseItem {
  element: React.ReactNode;
}

type CategoryItem = BaseItem | ImageItem | ElementItem;

interface CategoryPageProps<T extends CategoryItem> {
  pageName: string;
  items: T[];
  translationPrefix: string;
  audioPath: string;
  renderMode: RenderMode;
  forceRTL?: boolean;
  hasFullName?: boolean;
}

export default function CategoryPage<T extends CategoryItem>({
  pageName,
  items,
  translationPrefix,
  audioPath,
  renderMode,
  forceRTL = false,
  hasFullName = false,
}: CategoryPageProps<T>) {
  const t = useTranslations();
  const direction = useDirection();
  const isRTL = forceRTL || direction === 'rtl';

  const getItemName = (item: T): string => {
    if (renderMode === 'text') return t(`${translationPrefix}.${item.id}.name`);
    if (renderMode === 'image') return (item as ImageItem).imageUrl;
    return '';
  };

  const getItemCaption = (item: T) => t(`${translationPrefix}.${item.id}.${hasFullName ? 'fullName' : 'name'}`);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
      <BackButton />
      <PageIntro pageName={pageName} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Grid container spacing={4} justifyContent="center" sx={forceRTL ? { direction: 'rtl' } : undefined}>
          {items.map((item) => (
            <Grid key={item.id}>
              <ItemCard
                name={getItemName(item)}
                element={renderMode === 'element' ? (item as ElementItem).element : undefined}
                textColor={item.color}
                backgroundColor={renderMode === 'color' ? item.color : undefined}
                soundFile={`/audio/${audioPath}/he/${item.audioFile}`}
                itemCaption={getItemCaption(item)}
                isRTL={isRTL}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
