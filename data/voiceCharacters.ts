import { VoiceCharacter } from '@/models/VoiceCharacter';

/**
 * Predefined voice characters.
 * Add new personalities here without modifying components.
 */
export const VOICE_CHARACTERS = {
  /** Noa - the main Hebrew voice for most categories */
  noa: {
    emoji: '👧',
    labelKey: 'common.voiceName',
    accentColor: '#ffb6c1', // pink
  },
  /** Generic animal - for animal sounds */
  animal: {
    emoji: '🐾',
    accentColor: '#a8d5a2', // nature green
  },
  // Future extensions:
  // danny: {
  //   emoji: '👦',
  //   labelKey: 'common.voiceDanny',
  //   accentColor: '#87ceeb', // sky blue
  // },
} as const satisfies Record<string, VoiceCharacter>;

/** Type for available character keys */
export type VoiceCharacterKey = keyof typeof VOICE_CHARACTERS;
