/**
 * Hebrew Letter Stroke Definitions
 *
 * Each letter has strokes with checkpoints that must be visited in order.
 * Coordinates are normalized (0-1) where:
 * - (0, 0) = top-left of canvas
 * - (1, 1) = bottom-right of canvas
 * - Letters are roughly centered in 0.25-0.75 range
 *
 * IDs match letters.ts: letter_1 = aleph, letter_2 = bet, etc.
 */

import type { LetterStrokeData } from '../types';

/**
 * All Hebrew letter stroke definitions
 * Indexed by letter ID from letters.ts
 */
export const hebrewLetterStrokes: Record<string, LetterStrokeData> = {
  // letter_1: א (Aleph)
  letter_1: {
    letterId: 'letter_1',
    strokes: [
      // Main diagonal stroke (top-right to bottom-left)
      {
        checkpoints: [
          { x: 0.65, y: 0.30 },
          { x: 0.50, y: 0.50 },
          { x: 0.35, y: 0.70 },
        ],
      },
      // Upper-left small stroke
      {
        checkpoints: [
          { x: 0.38, y: 0.32 },
          { x: 0.30, y: 0.42 },
        ],
      },
      // Lower-right small stroke
      {
        checkpoints: [
          { x: 0.62, y: 0.58 },
          { x: 0.70, y: 0.68 },
        ],
      },
    ],
  },

  // letter_2: ב (Bet)
  letter_2: {
    letterId: 'letter_2',
    strokes: [
      // Top curve going left then down
      {
        checkpoints: [
          { x: 0.35, y: 0.32 },
          { x: 0.55, y: 0.30 },
          { x: 0.68, y: 0.38 },
        ],
      },
      // Right side going down
      {
        checkpoints: [
          { x: 0.68, y: 0.38 },
          { x: 0.68, y: 0.55 },
          { x: 0.68, y: 0.70 },
        ],
      },
      // Bottom going left
      {
        checkpoints: [
          { x: 0.68, y: 0.70 },
          { x: 0.50, y: 0.70 },
          { x: 0.30, y: 0.70 },
        ],
      },
    ],
  },

  // letter_3: ג (Gimel)
  letter_3: {
    letterId: 'letter_3',
    strokes: [
      // Main curve from top going down
      {
        checkpoints: [
          { x: 0.55, y: 0.28 },
          { x: 0.52, y: 0.45 },
          { x: 0.45, y: 0.60 },
          { x: 0.38, y: 0.72 },
        ],
      },
      // Small foot going right
      {
        checkpoints: [
          { x: 0.50, y: 0.62 },
          { x: 0.60, y: 0.70 },
        ],
      },
    ],
  },

  // letter_4: ד (Dalet)
  letter_4: {
    letterId: 'letter_4',
    strokes: [
      // Top horizontal (right to left)
      {
        checkpoints: [
          { x: 0.70, y: 0.30 },
          { x: 0.50, y: 0.30 },
          { x: 0.30, y: 0.30 },
        ],
      },
      // Right vertical (down)
      {
        checkpoints: [
          { x: 0.68, y: 0.32 },
          { x: 0.68, y: 0.50 },
          { x: 0.68, y: 0.70 },
        ],
      },
    ],
  },

  // letter_5: ה (He)
  letter_5: {
    letterId: 'letter_5',
    strokes: [
      // Top horizontal
      {
        checkpoints: [
          { x: 0.70, y: 0.30 },
          { x: 0.50, y: 0.30 },
          { x: 0.30, y: 0.30 },
        ],
      },
      // Right vertical
      {
        checkpoints: [
          { x: 0.68, y: 0.32 },
          { x: 0.68, y: 0.50 },
          { x: 0.68, y: 0.70 },
        ],
      },
      // Left short vertical (detached)
      {
        checkpoints: [
          { x: 0.35, y: 0.45 },
          { x: 0.35, y: 0.58 },
          { x: 0.35, y: 0.70 },
        ],
      },
    ],
  },

  // letter_6: ו (Vav)
  letter_6: {
    letterId: 'letter_6',
    strokes: [
      {
        checkpoints: [
          { x: 0.50, y: 0.28 },
          { x: 0.50, y: 0.42 },
          { x: 0.50, y: 0.56 },
          { x: 0.50, y: 0.70 },
        ],
      },
    ],
  },

  // letter_7: ז (Zayin)
  letter_7: {
    letterId: 'letter_7',
    strokes: [
      // Top crown
      {
        checkpoints: [
          { x: 0.38, y: 0.32 },
          { x: 0.50, y: 0.28 },
          { x: 0.62, y: 0.32 },
        ],
      },
      // Vertical stem
      {
        checkpoints: [
          { x: 0.50, y: 0.32 },
          { x: 0.50, y: 0.50 },
          { x: 0.50, y: 0.70 },
        ],
      },
    ],
  },

  // letter_8: ח (Chet)
  letter_8: {
    letterId: 'letter_8',
    strokes: [
      // Top horizontal
      {
        checkpoints: [
          { x: 0.70, y: 0.30 },
          { x: 0.50, y: 0.30 },
          { x: 0.30, y: 0.30 },
        ],
      },
      // Right vertical
      {
        checkpoints: [
          { x: 0.68, y: 0.32 },
          { x: 0.68, y: 0.50 },
          { x: 0.68, y: 0.70 },
        ],
      },
      // Left vertical (connected at top)
      {
        checkpoints: [
          { x: 0.32, y: 0.32 },
          { x: 0.32, y: 0.50 },
          { x: 0.32, y: 0.70 },
        ],
      },
    ],
  },

  // letter_9: ט (Tet)
  letter_9: {
    letterId: 'letter_9',
    strokes: [
      // Outer curved body going around
      {
        checkpoints: [
          { x: 0.35, y: 0.35 },
          { x: 0.30, y: 0.50 },
          { x: 0.35, y: 0.65 },
          { x: 0.50, y: 0.70 },
          { x: 0.65, y: 0.65 },
          { x: 0.70, y: 0.50 },
        ],
      },
      // Inner curve going up
      {
        checkpoints: [
          { x: 0.65, y: 0.50 },
          { x: 0.55, y: 0.40 },
          { x: 0.50, y: 0.32 },
        ],
      },
    ],
  },

  // letter_10: י (Yod)
  letter_10: {
    letterId: 'letter_10',
    strokes: [
      {
        checkpoints: [
          { x: 0.52, y: 0.35 },
          { x: 0.48, y: 0.45 },
          { x: 0.45, y: 0.55 },
        ],
      },
    ],
  },

  // letter_11: כ (Kaf)
  letter_11: {
    letterId: 'letter_11',
    strokes: [
      // Curved shape open on left
      {
        checkpoints: [
          { x: 0.35, y: 0.32 },
          { x: 0.55, y: 0.30 },
          { x: 0.68, y: 0.40 },
          { x: 0.68, y: 0.55 },
          { x: 0.55, y: 0.68 },
          { x: 0.35, y: 0.68 },
        ],
      },
    ],
  },

  // letter_12: ל (Lamed)
  letter_12: {
    letterId: 'letter_12',
    strokes: [
      // Upper part (tall stroke)
      {
        checkpoints: [
          { x: 0.55, y: 0.18 },
          { x: 0.58, y: 0.28 },
          { x: 0.55, y: 0.38 },
        ],
      },
      // Lower curve
      {
        checkpoints: [
          { x: 0.55, y: 0.38 },
          { x: 0.50, y: 0.52 },
          { x: 0.42, y: 0.65 },
          { x: 0.38, y: 0.75 },
        ],
      },
    ],
  },

  // letter_13: מ (Mem)
  letter_13: {
    letterId: 'letter_13',
    strokes: [
      // Left side going down
      {
        checkpoints: [
          { x: 0.30, y: 0.35 },
          { x: 0.32, y: 0.50 },
          { x: 0.38, y: 0.68 },
        ],
      },
      // Bottom and right going up
      {
        checkpoints: [
          { x: 0.38, y: 0.68 },
          { x: 0.55, y: 0.70 },
          { x: 0.68, y: 0.60 },
          { x: 0.68, y: 0.40 },
        ],
      },
      // Top curve going left
      {
        checkpoints: [
          { x: 0.68, y: 0.40 },
          { x: 0.55, y: 0.30 },
          { x: 0.40, y: 0.32 },
        ],
      },
    ],
  },

  // letter_14: נ (Nun)
  letter_14: {
    letterId: 'letter_14',
    strokes: [
      // Main curved stroke
      {
        checkpoints: [
          { x: 0.58, y: 0.32 },
          { x: 0.52, y: 0.45 },
          { x: 0.45, y: 0.58 },
          { x: 0.38, y: 0.70 },
        ],
      },
      // Small foot
      {
        checkpoints: [
          { x: 0.48, y: 0.62 },
          { x: 0.58, y: 0.70 },
        ],
      },
    ],
  },

  // letter_15: ס (Samekh)
  letter_15: {
    letterId: 'letter_15',
    strokes: [
      // Full circle/oval
      {
        checkpoints: [
          { x: 0.50, y: 0.28 },
          { x: 0.68, y: 0.35 },
          { x: 0.72, y: 0.50 },
          { x: 0.68, y: 0.65 },
          { x: 0.50, y: 0.72 },
          { x: 0.32, y: 0.65 },
          { x: 0.28, y: 0.50 },
          { x: 0.32, y: 0.35 },
          { x: 0.50, y: 0.28 },
        ],
      },
    ],
  },

  // letter_16: ע (Ayin)
  letter_16: {
    letterId: 'letter_16',
    strokes: [
      // Left branch
      {
        checkpoints: [
          { x: 0.35, y: 0.30 },
          { x: 0.40, y: 0.45 },
          { x: 0.48, y: 0.58 },
        ],
      },
      // Right branch and stem
      {
        checkpoints: [
          { x: 0.65, y: 0.30 },
          { x: 0.58, y: 0.45 },
          { x: 0.52, y: 0.58 },
          { x: 0.50, y: 0.72 },
        ],
      },
    ],
  },

  // letter_17: פ (Pe)
  letter_17: {
    letterId: 'letter_17',
    strokes: [
      // Outer curve
      {
        checkpoints: [
          { x: 0.35, y: 0.38 },
          { x: 0.30, y: 0.55 },
          { x: 0.40, y: 0.70 },
          { x: 0.58, y: 0.68 },
          { x: 0.68, y: 0.55 },
          { x: 0.65, y: 0.38 },
        ],
      },
      // Inner curl
      {
        checkpoints: [
          { x: 0.55, y: 0.45 },
          { x: 0.50, y: 0.55 },
          { x: 0.45, y: 0.60 },
        ],
      },
    ],
  },

  // letter_18: צ (Tsade)
  letter_18: {
    letterId: 'letter_18',
    strokes: [
      // Upper right branch
      {
        checkpoints: [
          { x: 0.60, y: 0.25 },
          { x: 0.55, y: 0.38 },
          { x: 0.50, y: 0.52 },
        ],
      },
      // Main body going down-left
      {
        checkpoints: [
          { x: 0.50, y: 0.52 },
          { x: 0.42, y: 0.62 },
          { x: 0.35, y: 0.72 },
        ],
      },
      // Foot going right
      {
        checkpoints: [
          { x: 0.45, y: 0.65 },
          { x: 0.55, y: 0.72 },
        ],
      },
    ],
  },

  // letter_19: ק (Qof)
  letter_19: {
    letterId: 'letter_19',
    strokes: [
      // Top horizontal
      {
        checkpoints: [
          { x: 0.70, y: 0.30 },
          { x: 0.50, y: 0.30 },
          { x: 0.30, y: 0.30 },
        ],
      },
      // Right side going down (descends below)
      {
        checkpoints: [
          { x: 0.68, y: 0.32 },
          { x: 0.68, y: 0.50 },
          { x: 0.65, y: 0.70 },
          { x: 0.58, y: 0.80 },
        ],
      },
      // Left short vertical
      {
        checkpoints: [
          { x: 0.35, y: 0.45 },
          { x: 0.35, y: 0.58 },
          { x: 0.35, y: 0.68 },
        ],
      },
    ],
  },

  // letter_20: ר (Resh)
  letter_20: {
    letterId: 'letter_20',
    strokes: [
      // Top going left with curve
      {
        checkpoints: [
          { x: 0.68, y: 0.32 },
          { x: 0.50, y: 0.28 },
          { x: 0.35, y: 0.35 },
        ],
      },
      // Right vertical
      {
        checkpoints: [
          { x: 0.65, y: 0.32 },
          { x: 0.65, y: 0.50 },
          { x: 0.65, y: 0.70 },
        ],
      },
    ],
  },

  // letter_21: ש (Shin)
  letter_21: {
    letterId: 'letter_21',
    strokes: [
      // Right branch
      {
        checkpoints: [
          { x: 0.70, y: 0.28 },
          { x: 0.65, y: 0.42 },
          { x: 0.58, y: 0.58 },
        ],
      },
      // Middle branch
      {
        checkpoints: [
          { x: 0.50, y: 0.28 },
          { x: 0.50, y: 0.42 },
          { x: 0.50, y: 0.58 },
        ],
      },
      // Left branch
      {
        checkpoints: [
          { x: 0.30, y: 0.35 },
          { x: 0.38, y: 0.48 },
          { x: 0.45, y: 0.58 },
        ],
      },
      // Base connecting
      {
        checkpoints: [
          { x: 0.58, y: 0.58 },
          { x: 0.50, y: 0.70 },
          { x: 0.42, y: 0.58 },
        ],
      },
    ],
  },

  // letter_22: ת (Tav)
  letter_22: {
    letterId: 'letter_22',
    strokes: [
      // Top horizontal
      {
        checkpoints: [
          { x: 0.70, y: 0.30 },
          { x: 0.50, y: 0.30 },
          { x: 0.30, y: 0.30 },
        ],
      },
      // Right vertical
      {
        checkpoints: [
          { x: 0.68, y: 0.32 },
          { x: 0.68, y: 0.50 },
          { x: 0.68, y: 0.70 },
        ],
      },
      // Left vertical with foot
      {
        checkpoints: [
          { x: 0.32, y: 0.32 },
          { x: 0.32, y: 0.50 },
          { x: 0.32, y: 0.65 },
          { x: 0.25, y: 0.72 },
        ],
      },
    ],
  },
};

/**
 * Get stroke data for a letter by ID
 */
export function getLetterStrokeData(letterId: string): LetterStrokeData | undefined {
  return hebrewLetterStrokes[letterId];
}

/**
 * Check if stroke data exists for a letter
 */
export function hasStrokeData(letterId: string): boolean {
  return letterId in hebrewLetterStrokes;
}

/**
 * Get all letter IDs that have stroke data
 */
export function getAvailableLetterIds(): string[] {
  return Object.keys(hebrewLetterStrokes);
}
