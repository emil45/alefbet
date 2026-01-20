'use client';

import React from 'react';
import { Box, Grid } from '@mui/material';
import ItemCard from '@/components/ItemCard';
import BackButton from '@/components/BackButton';
import PageIntro from '@/components/PageIntro';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useDirection } from '@/hooks/useDirection';
import { logEvent } from '@/utils/amplitude';
import { AmplitudeEventsEnum, CategoryType, LocaleType } from '@/models/amplitudeEvents';
import { useStreakContext } from '@/contexts/StreakContext';
import { VOICE_CHARACTERS } from '@/data/voiceCharacters';

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
  category: CategoryType;
}

export default function CategoryPage<T extends CategoryItem>({
  pageName,
  items,
  translationPrefix,
  audioPath,
  renderMode,
  forceRTL = false,
  hasFullName = false,
  category,
}: CategoryPageProps<T>) {
  const t = useTranslations();
  const locale = useLocale() as LocaleType;
  const direction = useDirection();
  const isRTL = forceRTL || direction === 'rtl';
  const { recordActivity } = useStreakContext();

  const getItemName = (item: T): string => {
    if (renderMode === 'text') return t(`${translationPrefix}.${item.id}.name`);
    if (renderMode === 'image') return (item as ImageItem).imageUrl;
    return '';
  };

  const getItemCaption = (item: T) => t(`${translationPrefix}.${item.id}.${hasFullName ? 'fullName' : 'name'}`);

  const handleItemTap = (item: T) => {
    // Record learning activity for streak tracking
    recordActivity();

    // Fire item_tapped event
    logEvent(AmplitudeEventsEnum.ITEM_TAPPED, {
      category,
      item_id: item.id,
      locale,
    });

    // Fire audio_played event
    logEvent(AmplitudeEventsEnum.AUDIO_PLAYED, {
      category,
      item_id: item.id,
      locale,
      audio_file: item.audioFile,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
      <BackButton />
      <PageIntro pageName={pageName} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Grid container spacing={4} justifyContent="center" sx={forceRTL ? { direction: 'rtl' } : undefined}>
          {items.map((item) => (
            <Grid key={item.id} sx={{ pb: { xs: 3, sm: 4 } }}>
              <ItemCard
                name={getItemName(item)}
                element={renderMode === 'element' ? (item as ElementItem).element : undefined}
                textColor={item.color}
                backgroundColor={renderMode === 'color' ? item.color : undefined}
                soundFile={`/audio/${audioPath}/he/${item.audioFile}`}
                itemCaption={getItemCaption(item)}
                isRTL={isRTL}
                onTap={() => handleItemTap(item)}
                voiceCharacter={category === 'animals' ? VOICE_CHARACTERS.animal : VOICE_CHARACTERS.noa}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
