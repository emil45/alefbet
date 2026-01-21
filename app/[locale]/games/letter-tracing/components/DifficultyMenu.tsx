'use client';

/**
 * DifficultyMenu Component
 *
 * Menu screen for selecting difficulty level before starting the game.
 */

import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import FunButton from '@/components/FunButton';
import type { Difficulty } from '../types';

interface DifficultyMenuProps {
  title: string;
  instructions: string;
  selectDifficultyLabel: string;
  startLabel: string;
  tracedCountLabel: string;
  difficulties: {
    key: Difficulty;
    label: string;
    description: string;
  }[];
  selectedDifficulty: Difficulty;
  onDifficultySelect: (difficulty: Difficulty) => void;
  onStart: () => void;
}

function DifficultyMenuComponent({
  title,
  instructions,
  selectDifficultyLabel,
  startLabel,
  tracedCountLabel,
  difficulties,
  selectedDifficulty,
  onDifficultySelect,
  onStart,
}: DifficultyMenuProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={3}
      px={2}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 3 }}>
        {instructions}
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} width="100%" maxWidth={300}>
        <Typography variant="subtitle1" align="center" fontWeight="bold">
          {selectDifficultyLabel}
        </Typography>

        {difficulties.map((diff) => (
          <Box
            key={diff.key}
            onClick={() => onDifficultySelect(diff.key)}
            sx={{
              p: 2,
              borderRadius: 3,
              cursor: 'pointer',
              border: selectedDifficulty === diff.key ? '3px solid #4ECDC4' : '2px solid',
              borderColor: selectedDifficulty === diff.key ? '#4ECDC4' : 'grey.300',
              backgroundColor:
                selectedDifficulty === diff.key ? 'rgba(78, 205, 196, 0.15)' : 'background.paper',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#4ECDC4',
                transform: 'scale(1.02)',
              },
            }}
          >
            <Typography variant="h6" align="center">
              {diff.label}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              {diff.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box mt={3}>
        <FunButton text={startLabel} onClick={onStart} />
      </Box>

      <Typography variant="body2" color="text.secondary" align="center">
        {tracedCountLabel}
      </Typography>
    </Box>
  );
}

export const DifficultyMenu = memo(DifficultyMenuComponent);
