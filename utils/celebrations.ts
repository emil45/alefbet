/**
 * Celebration effects utility
 * Provides screen shake and celebration triggering functions
 */

export type CelebrationType =
  | 'gameComplete'      // End of game celebration (big)
  | 'correctAnswer'     // Single correct answer (small)
  | 'milestone'         // Score milestones (medium)
  | 'streak'            // Streak milestones (medium)
  | 'stickerUnlock'     // New sticker earned (medium with special effect)
  | 'levelUp';          // Level progression (medium)

export interface CelebrationConfig {
  confettiPieces: number;
  confettiGravity: number;
  screenShake: boolean;
  shakeDuration: number; // ms
  shakeIntensity: 'light' | 'medium' | 'strong';
}

export const CELEBRATION_CONFIGS: Record<CelebrationType, CelebrationConfig> = {
  gameComplete: {
    confettiPieces: 500,
    confettiGravity: 0.05,
    screenShake: true,
    shakeDuration: 300,
    shakeIntensity: 'medium',
  },
  correctAnswer: {
    confettiPieces: 0, // No confetti for single answers
    confettiGravity: 0,
    screenShake: false,
    shakeDuration: 0,
    shakeIntensity: 'light',
  },
  milestone: {
    confettiPieces: 200,
    confettiGravity: 0.08,
    screenShake: true,
    shakeDuration: 200,
    shakeIntensity: 'light',
  },
  streak: {
    confettiPieces: 300,
    confettiGravity: 0.06,
    screenShake: true,
    shakeDuration: 250,
    shakeIntensity: 'medium',
  },
  stickerUnlock: {
    confettiPieces: 400,
    confettiGravity: 0.04,
    screenShake: true,
    shakeDuration: 300,
    shakeIntensity: 'medium',
  },
  levelUp: {
    confettiPieces: 250,
    confettiGravity: 0.07,
    screenShake: true,
    shakeDuration: 200,
    shakeIntensity: 'light',
  },
};

// Shake intensity to CSS values mapping
const SHAKE_INTENSITIES = {
  light: { translate: 2, rotate: 0.5 },
  medium: { translate: 4, rotate: 1 },
  strong: { translate: 8, rotate: 2 },
};

// Singleton style sheet to prevent memory leak from accumulating style elements
let shakeStyleSheet: HTMLStyleElement | null = null;
let shakeCleanupTimeout: NodeJS.Timeout | null = null;

/**
 * Triggers a screen shake effect on the document body
 * Uses a singleton style sheet to prevent memory leaks from rapid calls
 */
export function triggerScreenShake(
  duration: number = 200,
  intensity: 'light' | 'medium' | 'strong' = 'medium'
): void {
  if (typeof window === 'undefined') return;

  const body = document.body;
  const { translate, rotate } = SHAKE_INTENSITIES[intensity];

  // Cancel any pending cleanup to prevent race conditions
  if (shakeCleanupTimeout) {
    clearTimeout(shakeCleanupTimeout);
    shakeCleanupTimeout = null;
  }

  // Reset any ongoing animation
  body.style.animation = 'none';
  // Force reflow to restart animation
  void body.offsetWidth;

  const animationName = 'celebration-shake';
  const keyframes = `
    @keyframes ${animationName} {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      10% { transform: translate(-${translate}px, 0) rotate(-${rotate}deg); }
      20% { transform: translate(${translate}px, 0) rotate(${rotate}deg); }
      30% { transform: translate(-${translate}px, 0) rotate(0deg); }
      40% { transform: translate(${translate}px, 0) rotate(${rotate}deg); }
      50% { transform: translate(-${translate}px, 0) rotate(-${rotate}deg); }
      60% { transform: translate(${translate}px, 0) rotate(0deg); }
      70% { transform: translate(-${translate}px, 0) rotate(${rotate}deg); }
      80% { transform: translate(${translate}px, 0) rotate(-${rotate}deg); }
      90% { transform: translate(-${translate}px, 0) rotate(0deg); }
    }
  `;

  // Reuse singleton style sheet or create if not exists
  if (!shakeStyleSheet) {
    shakeStyleSheet = document.createElement('style');
    shakeStyleSheet.id = 'celebration-shake-styles';
    document.head.appendChild(shakeStyleSheet);
  }
  shakeStyleSheet.textContent = keyframes;

  // Apply animation
  body.style.animation = `${animationName} ${duration}ms ease-in-out`;

  // Clean up animation style (but keep style sheet for reuse)
  shakeCleanupTimeout = setTimeout(() => {
    body.style.animation = '';
    shakeCleanupTimeout = null;
  }, duration);
}

/**
 * Get confetti colors - fun pastel palette for children
 */
export function getCelebrationColors(): string[] {
  return [
    '#FF6B6B', // Coral red
    '#4ECDC4', // Teal
    '#45B7D1', // Sky blue
    '#96CEB4', // Sage green
    '#FFEAA7', // Soft yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Golden yellow
    '#BB8FCE', // Light purple
    '#85C1E9', // Light blue
    '#FF9FF3', // Pink
    '#54A0FF', // Bright blue
  ];
}

/**
 * Get celebration config by type
 */
export function getCelebrationConfig(type: CelebrationType): CelebrationConfig {
  return CELEBRATION_CONFIGS[type];
}
