/**
 * Letter Tracing Game Types
 *
 * Architecture:
 * - Checkpoints are normalized (0-1) for canvas-size independence
 * - Each letter has ordered strokes, each stroke has ordered checkpoints
 * - User must visit checkpoints in sequence within tolerance
 */

/** Normalized point (0-1 range, scales to any canvas size) */
export interface NormalizedPoint {
  x: number;
  y: number;
}

/** A checkpoint the user must pass through */
export interface Checkpoint extends NormalizedPoint {
  /** Optional: checkpoint is a control point for curves, not a target */
  isControlPoint?: boolean;
}

/** A single stroke of a letter (one continuous line) */
export interface Stroke {
  /** Ordered checkpoints user must visit */
  checkpoints: Checkpoint[];
}

/** Complete stroke definition for a letter */
export interface LetterStrokeData {
  /** Letter ID matching letters.ts data */
  letterId: string;
  /** Ordered strokes (user traces stroke 0, then stroke 1, etc.) */
  strokes: Stroke[];
}

/** Difficulty level */
export type Difficulty = 'easy' | 'medium';

/** Difficulty configuration */
export interface DifficultyConfig {
  /** Hit detection tolerance (multiplier on checkpoint radius) */
  tolerance: number;
  /** Checkpoint visual radius in pixels */
  checkpointRadius: number;
  /** Whether to show upcoming checkpoints */
  showNextCheckpoint: boolean;
  /** Whether to show all checkpoints or just current */
  showAllCheckpoints: boolean;
  /** Stroke width for user's drawing */
  strokeWidth: number;
}

/** Game state */
export type GameState = 'menu' | 'playing' | 'complete';

/** Tracing progress for current letter */
export interface TracingProgress {
  /** Current stroke index (0-based) */
  currentStroke: number;
  /** Current checkpoint index within stroke (0-based) */
  currentCheckpoint: number;
  /** Whether current letter is complete */
  isComplete: boolean;
  /** Points the user has drawn (for rendering) */
  drawnPoints: NormalizedPoint[];
}

/** Canvas touch/mouse event data */
export interface CanvasPointerEvent {
  /** X coordinate relative to canvas (0 to canvasSize) */
  x: number;
  /** Y coordinate relative to canvas (0 to canvasSize) */
  y: number;
  /** Whether this is a touch event (vs mouse) */
  isTouch: boolean;
}
