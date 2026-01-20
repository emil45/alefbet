/**
 * Represents a voice character that appears when audio plays.
 * Extensible for future voices/personalities.
 */
export interface VoiceCharacter {
  /** The emoji or icon to display */
  emoji: string;
  /** Translation key for the label (optional - no label if undefined) */
  labelKey?: string;
  /** Accent color for animations (ring, glow effects) */
  accentColor: string;
}
