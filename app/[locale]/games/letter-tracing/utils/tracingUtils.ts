/**
 * Tracing Utilities
 *
 * Core functions for letter tracing validation:
 * - Checkpoint hit detection
 * - Distance calculations
 * - Coordinate transformations
 */

import type { NormalizedPoint, Checkpoint, Stroke, LetterStrokeData } from '../types';

/**
 * Convert normalized point (0-1) to canvas coordinates
 */
export function toCanvasCoords(
  point: NormalizedPoint,
  canvasSize: number
): { x: number; y: number } {
  return {
    x: point.x * canvasSize,
    y: point.y * canvasSize,
  };
}

/**
 * Convert canvas coordinates to normalized point (0-1)
 */
export function toNormalizedCoords(
  x: number,
  y: number,
  canvasSize: number
): NormalizedPoint {
  return {
    x: x / canvasSize,
    y: y / canvasSize,
  };
}

/**
 * Calculate distance between two points (in canvas coordinates)
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Check if a point is within tolerance of a checkpoint
 */
export function isNearCheckpoint(
  pointX: number,
  pointY: number,
  checkpoint: Checkpoint,
  canvasSize: number,
  toleranceRadius: number
): boolean {
  const checkpointCanvas = toCanvasCoords(checkpoint, canvasSize);
  const dist = distance(pointX, pointY, checkpointCanvas.x, checkpointCanvas.y);
  return dist <= toleranceRadius;
}

/**
 * Get the next checkpoint to visit
 * Returns null if all checkpoints are complete
 */
export function getNextCheckpoint(
  letterData: LetterStrokeData,
  currentStroke: number,
  currentCheckpoint: number
): { stroke: number; checkpoint: number; point: Checkpoint } | null {
  // Check if we're done with all strokes
  if (currentStroke >= letterData.strokes.length) {
    return null;
  }

  const stroke = letterData.strokes[currentStroke];

  // Check if we're done with current stroke
  if (currentCheckpoint >= stroke.checkpoints.length) {
    // Move to next stroke
    if (currentStroke + 1 >= letterData.strokes.length) {
      return null; // All done
    }
    return {
      stroke: currentStroke + 1,
      checkpoint: 0,
      point: letterData.strokes[currentStroke + 1].checkpoints[0],
    };
  }

  return {
    stroke: currentStroke,
    checkpoint: currentCheckpoint,
    point: stroke.checkpoints[currentCheckpoint],
  };
}

/**
 * Calculate total progress percentage
 */
export function calculateProgress(
  letterData: LetterStrokeData,
  currentStroke: number,
  currentCheckpoint: number
): number {
  let totalCheckpoints = 0;
  let completedCheckpoints = 0;

  for (let s = 0; s < letterData.strokes.length; s++) {
    const strokeLength = letterData.strokes[s].checkpoints.length;
    totalCheckpoints += strokeLength;

    if (s < currentStroke) {
      // Entire stroke completed
      completedCheckpoints += strokeLength;
    } else if (s === currentStroke) {
      // Current stroke - count completed checkpoints
      completedCheckpoints += currentCheckpoint;
    }
  }

  if (totalCheckpoints === 0) return 100;
  return Math.round((completedCheckpoints / totalCheckpoints) * 100);
}

/**
 * Create a Path2D for a stroke (for visual rendering)
 */
export function createStrokePath(
  stroke: Stroke,
  canvasSize: number
): Path2D {
  const path = new Path2D();

  if (stroke.checkpoints.length === 0) return path;

  const first = toCanvasCoords(stroke.checkpoints[0], canvasSize);
  path.moveTo(first.x, first.y);

  for (let i = 1; i < stroke.checkpoints.length; i++) {
    const point = toCanvasCoords(stroke.checkpoints[i], canvasSize);
    path.lineTo(point.x, point.y);
  }

  return path;
}

/**
 * Create Path2D for entire letter (all strokes)
 */
export function createLetterPath(
  letterData: LetterStrokeData,
  canvasSize: number
): Path2D {
  const path = new Path2D();

  for (const stroke of letterData.strokes) {
    if (stroke.checkpoints.length === 0) continue;

    const first = toCanvasCoords(stroke.checkpoints[0], canvasSize);
    path.moveTo(first.x, first.y);

    for (let i = 1; i < stroke.checkpoints.length; i++) {
      const point = toCanvasCoords(stroke.checkpoints[i], canvasSize);
      path.lineTo(point.x, point.y);
    }
  }

  return path;
}

/**
 * Check if point is on or near the letter path using isPointInStroke
 * This uses Canvas API's built-in hit detection with tolerance via lineWidth
 */
export function isPointOnPath(
  ctx: CanvasRenderingContext2D,
  path: Path2D,
  x: number,
  y: number,
  tolerance: number
): boolean {
  // Save current line width
  const originalLineWidth = ctx.lineWidth;

  // Set tolerance as line width for hit detection
  ctx.lineWidth = tolerance * 2; // diameter

  const isOnPath = ctx.isPointInStroke(path, x, y);

  // Restore original line width
  ctx.lineWidth = originalLineWidth;

  return isOnPath;
}

/**
 * Get canvas coordinates from mouse/touch event
 */
export function getEventCoordinates(
  event: MouseEvent | TouchEvent,
  canvas: HTMLCanvasElement
): { x: number; y: number } | null {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let clientX: number;
  let clientY: number;

  if ('touches' in event) {
    if (event.touches.length === 0) return null;
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}
