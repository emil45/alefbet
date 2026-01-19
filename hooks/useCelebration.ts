'use client';

import { useState, useCallback } from 'react';
import {
  CelebrationType,
  getCelebrationConfig,
  triggerScreenShake,
  getCelebrationColors,
} from '@/utils/celebrations';
import { playSound, AudioSounds } from '@/utils/audio';

export interface CelebrationState {
  isActive: boolean;
  confettiPieces: number;
  confettiGravity: number;
  colors: string[];
}

const INITIAL_STATE: CelebrationState = {
  isActive: false,
  confettiPieces: 0,
  confettiGravity: 0.1,
  colors: [],
};

// Sound mapping for celebration types
const CELEBRATION_SOUNDS: Partial<Record<CelebrationType, AudioSounds>> = {
  gameComplete: AudioSounds.CELEBRATION,
  milestone: AudioSounds.BONUS,
  streak: AudioSounds.BONUS,
  stickerUnlock: AudioSounds.SPARKLE,
  levelUp: AudioSounds.LEVEL_UP,
  correctAnswer: AudioSounds.SUCCESS,
};

export function useCelebration() {
  const [celebrationState, setCelebrationState] = useState<CelebrationState>(INITIAL_STATE);

  /**
   * Trigger a celebration of a specific type
   */
  const celebrate = useCallback((type: CelebrationType) => {
    const config = getCelebrationConfig(type);

    // Trigger screen shake if configured
    if (config.screenShake) {
      triggerScreenShake(config.shakeDuration, config.shakeIntensity);
    }

    // Play celebration sound
    const sound = CELEBRATION_SOUNDS[type];
    if (sound) {
      playSound(sound);
    }

    // Update confetti state if pieces > 0
    if (config.confettiPieces > 0) {
      setCelebrationState({
        isActive: true,
        confettiPieces: config.confettiPieces,
        confettiGravity: config.confettiGravity,
        colors: getCelebrationColors(),
      });
    }
  }, []);

  /**
   * Reset celebration state (call when confetti is complete)
   */
  const resetCelebration = useCallback(() => {
    setCelebrationState(INITIAL_STATE);
  }, []);

  /**
   * Quick celebration for correct answers (sound only, no confetti)
   */
  const celebrateCorrect = useCallback(() => {
    playSound(AudioSounds.SUCCESS);
  }, []);

  /**
   * Celebration for wrong answers
   */
  const indicateWrong = useCallback(() => {
    playSound(AudioSounds.WRONG_ANSWER);
  }, []);

  return {
    celebrationState,
    celebrate,
    resetCelebration,
    celebrateCorrect,
    indicateWrong,
  };
}
