/**
 * useLetterTracing Hook
 *
 * Manages the core tracing logic:
 * - Track current checkpoint progress
 * - Validate user input against checkpoints
 * - Handle completion and advancement
 */

import { useState, useCallback, useRef } from 'react';
import type { LetterStrokeData, Difficulty, DifficultyConfig, NormalizedPoint } from '../types';
import {
  isNearCheckpoint,
  getNextCheckpoint,
  calculateProgress,
  toNormalizedCoords,
} from '../utils/tracingUtils';

/** Difficulty configurations */
const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    tolerance: 2.5,
    checkpointRadius: 30,
    showNextCheckpoint: false, // Hide until coordinates are calibrated
    showAllCheckpoints: false,
    strokeWidth: 20,
  },
  medium: {
    tolerance: 2.0,
    checkpointRadius: 25,
    showNextCheckpoint: false,
    showAllCheckpoints: false,
    strokeWidth: 16,
  },
};

export interface UseLetterTracingOptions {
  letterData: LetterStrokeData | null;
  difficulty: Difficulty;
  canvasSize: number;
  onCheckpointReached?: (stroke: number, checkpoint: number) => void;
  onLetterComplete?: () => void;
}

export interface UseLetterTracingReturn {
  /** Current stroke index */
  currentStroke: number;
  /** Current checkpoint index within stroke */
  currentCheckpoint: number;
  /** Whether letter is complete */
  isComplete: boolean;
  /** Progress percentage (0-100) */
  progress: number;
  /** Points user has drawn */
  drawnPoints: NormalizedPoint[];
  /** Current difficulty config */
  config: DifficultyConfig;
  /** Handle pointer down event */
  handlePointerDown: (x: number, y: number) => void;
  /** Handle pointer move event */
  handlePointerMove: (x: number, y: number) => void;
  /** Handle pointer up event */
  handlePointerUp: () => void;
  /** Reset tracing state for current letter */
  reset: () => void;
  /** Whether user is currently drawing */
  isDrawing: boolean;
  /** Get tolerance radius in pixels */
  getToleranceRadius: () => number;
}

export function useLetterTracing({
  letterData,
  difficulty,
  canvasSize,
  onCheckpointReached,
  onLetterComplete,
}: UseLetterTracingOptions): UseLetterTracingReturn {
  const config = DIFFICULTY_CONFIGS[difficulty];

  // State
  const [currentStroke, setCurrentStroke] = useState(0);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<NormalizedPoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Refs for performance (avoid re-renders during drawing)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Calculate tolerance radius in pixels
  const getToleranceRadius = useCallback(() => {
    return config.checkpointRadius * config.tolerance;
  }, [config]);

  // Check if a point hits the current checkpoint
  const checkCheckpointHit = useCallback(
    (x: number, y: number): boolean => {
      if (!letterData || isComplete) return false;

      const next = getNextCheckpoint(letterData, currentStroke, currentCheckpoint);
      if (!next) return false;

      const toleranceRadius = getToleranceRadius();
      return isNearCheckpoint(x, y, next.point, canvasSize, toleranceRadius);
    },
    [letterData, isComplete, currentStroke, currentCheckpoint, canvasSize, getToleranceRadius]
  );

  // Advance to next checkpoint
  const advanceCheckpoint = useCallback(() => {
    if (!letterData) return;

    const currentStrokeData = letterData.strokes[currentStroke];
    const isLastCheckpointInStroke =
      currentCheckpoint >= currentStrokeData.checkpoints.length - 1;

    if (isLastCheckpointInStroke) {
      // Check if this was the last stroke
      const isLastStroke = currentStroke >= letterData.strokes.length - 1;

      if (isLastStroke) {
        // Letter complete!
        setIsComplete(true);
        onLetterComplete?.();
      } else {
        // Move to next stroke
        setCurrentStroke((prev) => prev + 1);
        setCurrentCheckpoint(0);
        onCheckpointReached?.(currentStroke + 1, 0);
      }
    } else {
      // Move to next checkpoint in current stroke
      setCurrentCheckpoint((prev) => prev + 1);
      onCheckpointReached?.(currentStroke, currentCheckpoint + 1);
    }
  }, [letterData, currentStroke, currentCheckpoint, onCheckpointReached, onLetterComplete]);

  // Handle pointer down
  const handlePointerDown = useCallback(
    (x: number, y: number) => {
      if (!letterData || isComplete) return;

      setIsDrawing(true);
      lastPointRef.current = { x, y };

      // Add point to drawn points
      const normalizedPoint = toNormalizedCoords(x, y, canvasSize);
      setDrawnPoints((prev) => [...prev, normalizedPoint]);

      // Check if hitting current checkpoint
      if (checkCheckpointHit(x, y)) {
        advanceCheckpoint();
      }
    },
    [letterData, isComplete, canvasSize, checkCheckpointHit, advanceCheckpoint]
  );

  // Handle pointer move
  const handlePointerMove = useCallback(
    (x: number, y: number) => {
      if (!isDrawing || !letterData || isComplete) return;

      // Add point to drawn points (throttled to avoid too many points)
      const lastPoint = lastPointRef.current;
      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only add point if moved enough (reduces point count)
        if (distance > 3) {
          const normalizedPoint = toNormalizedCoords(x, y, canvasSize);
          setDrawnPoints((prev) => [...prev, normalizedPoint]);
          lastPointRef.current = { x, y };
        }
      }

      // Check if hitting current checkpoint
      if (checkCheckpointHit(x, y)) {
        advanceCheckpoint();
      }
    },
    [isDrawing, letterData, isComplete, canvasSize, checkCheckpointHit, advanceCheckpoint]
  );

  // Handle pointer up
  const handlePointerUp = useCallback(() => {
    setIsDrawing(false);
    lastPointRef.current = null;
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setCurrentStroke(0);
    setCurrentCheckpoint(0);
    setIsComplete(false);
    setDrawnPoints([]);
    setIsDrawing(false);
    lastPointRef.current = null;
  }, []);

  // Calculate progress
  const progress = letterData
    ? calculateProgress(letterData, currentStroke, currentCheckpoint)
    : 0;

  return {
    currentStroke,
    currentCheckpoint,
    isComplete,
    progress,
    drawnPoints,
    config,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    reset,
    isDrawing,
    getToleranceRadius,
  };
}
