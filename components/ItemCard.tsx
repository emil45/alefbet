'use client';

import React, { useState } from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';
import VoiceIndicator from './VoiceIndicator';
import { VoiceCharacter } from '@/models/VoiceCharacter';
import { useFeatureFlagContext } from '@/contexts/FeatureFlagContext';

// Global variable to track currently playing audio
let currentlyPlayingAudio: HTMLAudioElement | null = null;

interface ItemCardProps {
  name: string;
  soundFile: string;
  textColor: string;
  cardSize?: number;
  backgroundColor?: string;
  itemCaption?: string;
  element?: React.ReactNode;
  isRTL?: boolean;
  onTap?: () => void;
  /** Voice character to display when audio plays. If undefined, no indicator shown. */
  voiceCharacter?: VoiceCharacter;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  soundFile,
  textColor,
  backgroundColor,
  itemCaption,
  element,
  cardSize = 1,
  isRTL = true,
  onTap,
  voiceCharacter,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { getFlag } = useFeatureFlagContext();
  // Numbers should always be LTR, even in Hebrew UI
  const isNumber = /^\d+$/.test(name);
  const shouldUseLTR = isNumber || !isRTL;

  const playSound = () => {
    // Fire tap callback if provided
    onTap?.();

    // Stop any currently playing audio
    if (currentlyPlayingAudio) {
      currentlyPlayingAudio.pause();
      currentlyPlayingAudio.currentTime = 0;
    }

    // Create and play new audio
    const audio = new Audio(soundFile);
    currentlyPlayingAudio = audio;

    // Show voice indicator when audio starts
    setIsPlaying(true);

    // Clear the reference and hide indicator when audio ends naturally
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      if (currentlyPlayingAudio === audio) {
        currentlyPlayingAudio = null;
      }
    });

    // Hide indicator if audio is paused (e.g., by another card)
    audio.addEventListener('pause', () => {
      setIsPlaying(false);
    });

    // Clear the reference if audio fails to load
    audio.addEventListener('error', (e) => {
      const target = e.target as HTMLAudioElement;
      console.error('Audio failed to load:', soundFile, {
        errorCode: target?.error?.code,
        errorMessage: target?.error?.message,
      });
      setIsPlaying(false);
      if (currentlyPlayingAudio === audio) {
        currentlyPlayingAudio = null;
      }
    });

    audio.play().catch((error) => {
      console.error('Error playing audio:', soundFile, error);
      setIsPlaying(false);
      if (currentlyPlayingAudio === audio) {
        currentlyPlayingAudio = null;
      }
    });
  };

  return (
    <Box
      onClick={playSound}
      sx={(theme) => ({
        cursor: 'pointer',
        padding: '30px',
        backgroundColor: backgroundColor || theme.palette.colors.components.itemCardBackground,
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, backgroundColor 0.3s',
        '&:hover': {
          transform: 'scale(1.1)',
        },
        '&:active': {
          transform: 'scale(1)',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${150 * cardSize}px`,
        width: `${150 * cardSize}px`,
        position: 'relative',
      })}
    >
      {element ? (
        <SvgIcon sx={{ fontSize: 100 * cardSize, color: textColor }}>{element}</SvgIcon>
      ) : (
        <Typography
          variant="h1"
          sx={{
            color: textColor,
            fontSize: `${124 * cardSize}px`,
            fontWeight: 'bold',
            direction: shouldUseLTR ? 'ltr !important' : 'rtl !important',
            unicodeBidi: shouldUseLTR ? 'normal' : 'bidi-override',
            textAlign: shouldUseLTR ? 'center !important' : 'right !important',
            writingMode: 'horizontal-tb',
            // Force RTL at CSS level for Hebrew letters only
            ...(!shouldUseLTR && {
              transform: 'scaleX(1)',
              '& *': {
                direction: 'rtl !important',
                unicodeBidi: 'bidi-override !important',
              },
            }),
          }}
        >
          {name}
        </Typography>
      )}
      {itemCaption && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '8px',
            ...(shouldUseLTR ? { left: '8px' } : { right: '8px' }),
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: '10%',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: shouldUseLTR ? 'left !important' : 'right !important',
            direction: shouldUseLTR ? 'ltr !important' : 'rtl !important',
            unicodeBidi: shouldUseLTR ? 'normal' : 'bidi-override',
            // Force RTL at CSS level for Hebrew captions only
            ...(!shouldUseLTR && {
              '& *': {
                direction: 'rtl !important',
                unicodeBidi: 'bidi-override !important',
              },
            }),
          }}
        >
          {itemCaption}
        </Typography>
      )}
      {voiceCharacter && getFlag('showVoiceIndicator') && (
        <VoiceIndicator isVisible={isPlaying} character={voiceCharacter} />
      )}
    </Box>
  );
};

export default ItemCard;
