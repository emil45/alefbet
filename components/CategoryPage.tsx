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

interface TextItem extends BaseItem {
  // For letters/numbers - display translated text
}

interface ImageItem extends BaseItem {
  imageUrl: string;
}

interface ElementItem extends BaseItem {
  element: React.ReactNode;
}

type CategoryItem = TextItem | ImageItem | ElementItem;

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
    switch (renderMode) {
      case 'text':
        return t(`${translationPrefix}.${item.id}.name`);
      case 'image':
        return (item as ImageItem).imageUrl;
      case 'element':
      case 'color':
        return '';
      default:
        return '';
    }
  };

  const getItemCaption = (item: T): string => {
    if (hasFullName) {
      return t(`${translationPrefix}.${item.id}.fullName`);
    }
    return t(`${translationPrefix}.${item.id}.name`);
  };

  const getElement = (item: T): React.ReactNode | undefined => {
    if (renderMode === 'element') {
      return (item as ElementItem).element;
    }
    return undefined;
  };

  const getBackgroundColor = (item: T): string | undefined => {
    if (renderMode === 'color') {
      return item.color;
    }
    return undefined;
  };

  const content = (
    <Grid container spacing={4} justifyContent="center">
      {items.map((item, index) => (
        <Grid key={index}>
          <ItemCard
            name={getItemName(item)}
            element={getElement(item)}
            textColor={item.color}
            backgroundColor={getBackgroundColor(item)}
            soundFile={`/audio/${audioPath}/he/${item.audioFile}`}
            itemCaption={getItemCaption(item)}
            isRTL={isRTL}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
      }}
    >
      <BackButton />
      <PageIntro pageName={pageName} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {forceRTL ? <div style={{ direction: 'rtl' }}>{content}</div> : content}
      </Box>
    </Box>
  );
}
