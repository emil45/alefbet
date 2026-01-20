'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { VoiceCharacter } from '@/models/VoiceCharacter';

interface VoiceIndicatorProps {
  isVisible: boolean;
  character: VoiceCharacter;
}

/** Fallback gray color for invalid inputs */
const FALLBACK_RGB = { r: 128, g: 128, b: 128 };

/** Parses hex color (#RRGGBB) to RGB components. Returns fallback for invalid input. */
function parseHex(hex: string): { r: number; g: number; b: number } {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    console.error(`[VoiceIndicator] Invalid hex color: "${hex}". Expected format: #RRGGBB`);
    return FALLBACK_RGB;
  }
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

/** Converts hex color to rgba with alpha (0-1). */
function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = parseHex(hex);
  const clampedAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}

/** Darkens a hex color by a percentage (0-1). */
function darkenColor(hex: string, percent: number): string {
  const { r, g, b } = parseHex(hex);
  const amount = Math.round(255 * percent);
  return `rgb(${Math.max(0, r - amount)}, ${Math.max(0, g - amount)}, ${Math.max(0, b - amount)})`;
}

/** Lightens a hex color by mixing with white (0-1). */
function lightenColor(hex: string, percent: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgb(${Math.min(255, r + Math.round((255 - r) * percent))}, ${Math.min(255, g + Math.round((255 - g) * percent))}, ${Math.min(255, b + Math.round((255 - b) * percent))})`;
}

export default function VoiceIndicator({ isVisible, character }: VoiceIndicatorProps) {
  const t = useTranslations();

  const { emoji, labelKey, accentColor } = character;

  // Derive colors from accent color
  const waveColor = hexToRgba(accentColor, 0.6);
  const backgroundColor = lightenColor(accentColor, 0.7);
  const borderColor = accentColor;
  const shadowColor = hexToRgba(accentColor, 0.4);
  const textColor = darkenColor(accentColor, 0.15);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        marginTop: { xs: '-18px', sm: '-22px' }, // Pull up so avatar is half on card border
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: 'none',
      }}
    >
      {/* Avatar with sound waves */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Sound wave rings - animated */}
        {isVisible &&
          [0, 0.4].map((delay) => (
            <Box
              key={delay}
              sx={{
                position: 'absolute',
                width: { xs: 44, sm: 52 },
                height: { xs: 44, sm: 52 },
                borderRadius: '50%',
                border: '2px solid',
                borderColor: waveColor,
                animation: `soundWave 1.2s ease-out infinite ${delay}s`,
                '@keyframes soundWave': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 0.8,
                  },
                  '100%': {
                    transform: 'scale(1.5)',
                    opacity: 0,
                  },
                },
              }}
            />
          ))}

        {/* Avatar circle with emoji */}
        <Box
          sx={{
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            borderRadius: '50%',
            backgroundColor,
            border: `3px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: '20px', sm: '24px' },
            boxShadow: `0 2px 8px ${shadowColor}`,
            animation: isVisible ? 'gentleBounce 0.6s ease-out' : 'none',
            '@keyframes gentleBounce': {
              '0%': {
                transform: 'scale(0.5)',
                opacity: 0,
              },
              '50%': {
                transform: 'scale(1.1)',
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
        >
          {emoji}
        </Box>
      </Box>

      {/* Name label - only shown if labelKey is provided */}
      {labelKey && (
        <Typography
          sx={{
            fontSize: { xs: '11px', sm: '13px' },
            fontWeight: 'bold',
            color: textColor,
            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
            animation: isVisible ? 'fadeInUp 0.4s ease-out 0.2s both' : 'none',
            '@keyframes fadeInUp': {
              '0%': {
                transform: 'translateY(5px)',
                opacity: 0,
              },
              '100%': {
                transform: 'translateY(0)',
                opacity: 1,
              },
            },
          }}
        >
          {t(labelKey)}
        </Typography>
      )}
    </Box>
  );
}
