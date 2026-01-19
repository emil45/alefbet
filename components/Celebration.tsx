'use client';

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Box } from '@mui/material';
import { CelebrationState } from '@/hooks/useCelebration';

interface CelebrationProps {
  celebrationState: CelebrationState;
  onComplete?: () => void;
}

/**
 * Celebration component that renders confetti based on celebration state
 * Use with useCelebration hook for easy celebration triggering
 *
 * @example
 * const { celebrationState, celebrate, resetCelebration } = useCelebration();
 *
 * // Trigger celebration
 * celebrate('gameComplete');
 *
 * // In render:
 * <Celebration celebrationState={celebrationState} onComplete={resetCelebration} />
 */
export default function Celebration({ celebrationState, onComplete }: CelebrationProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!celebrationState.isActive || windowSize.width === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        pointerEvents: 'none',
      }}
    >
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={celebrationState.confettiPieces}
        gravity={celebrationState.confettiGravity}
        colors={celebrationState.colors}
        recycle={false}
        onConfettiComplete={onComplete}
      />
    </Box>
  );
}
