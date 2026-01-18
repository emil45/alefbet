'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useStreakContext } from '@/contexts/StreakContext';

interface StreakIndicatorProps {
  compact?: boolean;
}

export default function StreakIndicator({ compact = false }: StreakIndicatorProps) {
  const t = useTranslations('streakIndicator');
  const { streakData, isStreakAtRisk, hasActivityToday } = useStreakContext();

  const { currentStreak, freezesRemaining, freezeUsedThisWeek } = streakData;

  const showAtRiskWarning = isStreakAtRisk && !hasActivityToday;

  const tooltipContent = (
    <Box sx={{ p: 0.5 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {currentStreak} {currentStreak === 1 ? t('day') : t('days')}
      </Typography>
      {showAtRiskWarning && (
        <Typography variant="caption" sx={{ display: 'block', color: '#ffcc80' }}>
          {t('atRisk')}
        </Typography>
      )}
      {freezesRemaining > 0 && !freezeUsedThisWeek && (
        <Typography variant="caption" sx={{ display: 'block', color: '#90caf9' }}>
          {t('freezeAvailable')}
        </Typography>
      )}
    </Box>
  );

  if (currentStreak === 0) {
    return null;
  }

  const size = compact ? '44px' : '50px';
  const fontSize = compact ? '0.85rem' : '1rem';

  return (
    <Tooltip title={tooltipContent} arrow placement="bottom">
      <Box
        sx={{
          color: 'white',
          height: size,
          width: size,
          position: 'relative',
          cursor: 'pointer',
          transition: 'filter 250ms',
          '& .shadow': {
            position: 'absolute',
            width: 'inherit',
            height: 'inherit',
            borderRadius: '50%',
            background: '#00000040',
            willChange: 'transform',
            transform: 'translateY(2px)',
            transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
          },
          '& .edge': {
            position: 'absolute',
            width: 'inherit',
            height: 'inherit',
            borderRadius: '50%',
            background: 'linear-gradient(to left, #b54500 0%, #ff6d00 8%, #ff6d00 92%, #b54500 100%)',
          },
          '& .front': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'inherit',
            height: 'inherit',
            borderRadius: '50%',
            background: '#ff9100',
            willChange: 'transform',
            transform: 'translateY(-4px)',
            transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
          },
          '&:hover': {
            filter: 'brightness(110%)',
            '& .front': {
              transform: 'translateY(-6px)',
              transition: 'transform 250ms cubic-bezier(.3, .7, .4, 1.5)',
            },
            '& .shadow': {
              transform: 'translateY(4px)',
              transition: 'transform 250ms cubic-bezier(.3, .7, .4, 1.5)',
            },
          },
          '&:active': {
            '& .front': {
              transform: 'translateY(-2px)',
              transition: 'transform 34ms',
            },
            '& .shadow': {
              transform: 'translateY(1px)',
              transition: 'transform 34ms',
            },
          },
        }}
      >
        <Box className="shadow" />
        <Box className="edge" />
        <Box className="front">
          <Typography sx={{ fontSize: '1.1rem', lineHeight: 1, mt: '-2px' }}>🔥</Typography>
          <Typography
            sx={{
              fontSize,
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {currentStreak}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
}
