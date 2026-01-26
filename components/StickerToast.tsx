'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Slide } from '@mui/material';
import { STICKER_PAGES } from '@/data/stickers';

export interface StickerToastData {
  emoji: string;
  name: string;
  pageNumber: number;
}

interface StickerToastProps {
  data: StickerToastData | null;
  onClose: () => void;
}

export default function StickerToast({ data, onClose }: StickerToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      // Small delay before showing to allow celebration to start first
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      // Auto-dismiss after 3 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3300);

      // Clean up after animation completes
      const closeTimer = setTimeout(() => {
        onClose();
      }, 3600);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [data, onClose]);

  if (!data) return null;

  const pageColor =
    STICKER_PAGES.find((p) => p.pageNumber === data.pageNumber)?.color || '#FFD93D';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 24 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1500,
        pointerEvents: 'none',
      }}
    >
      <Slide direction="up" in={isVisible} timeout={300}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            padding: { xs: '10px 16px', sm: '12px 20px' },
            boxShadow: `
              0 4px 20px rgba(0, 0, 0, 0.15),
              0 0 0 2px ${pageColor}40,
              inset 0 1px 0 rgba(255, 255, 255, 0.5)
            `,
            border: `2px solid ${pageColor}`,
            animation: 'toastPulse 0.5s ease-out',
            '@keyframes toastPulse': {
              '0%': {
                transform: 'scale(0.8)',
                opacity: 0,
              },
              '50%': {
                transform: 'scale(1.05)',
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
        >
          <Box
            sx={{
              fontSize: { xs: '28px', sm: '32px' },
              filter: `drop-shadow(0 0 8px ${pageColor}80)`,
              animation: 'emojiPop 0.4s ease-out 0.2s both',
              '@keyframes emojiPop': {
                '0%': {
                  transform: 'scale(0) rotate(-20deg)',
                },
                '70%': {
                  transform: 'scale(1.2) rotate(5deg)',
                },
                '100%': {
                  transform: 'scale(1) rotate(0deg)',
                },
              },
            }}
          >
            {data.emoji}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                fontWeight: 500,
                color: pageColor,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                lineHeight: 1,
              }}
            >
              +1
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 700,
                color: '#333',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              {data.name}
            </Typography>
          </Box>

          <Box
            sx={{
              fontSize: { xs: '16px', sm: '18px' },
              animation: 'sparkle 0.6s ease-out infinite alternate',
              '@keyframes sparkle': {
                '0%': {
                  opacity: 0.5,
                  transform: 'scale(0.8)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
              },
            }}
          >
            ✨
          </Box>
        </Box>
      </Slide>
    </Box>
  );
}
