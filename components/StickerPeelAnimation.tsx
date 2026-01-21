'use client';

import React, { useEffect, useState } from 'react';
import { Box, Portal } from '@mui/material';
import { playSound, AudioSounds } from '@/utils/audio';

interface StickerPeelAnimationProps {
  emoji: string;
  color: string;
  onComplete: () => void;
  /** Origin position for the animation (center of the clicked sticker) */
  originX: number;
  originY: number;
}

type AnimationPhase = 'ready' | 'peeling' | 'reveal' | 'celebrate' | 'done';

/**
 * A delightful sticker peel animation that mimics peeling a real sticker.
 *
 * Animation sequence:
 * 1. Ready: Grey sticker with lifted corner appears at click position
 * 2. Peeling: Corner lifts more, sticker curls back from top-right to bottom-left
 * 3. Reveal: Grey backing peels away, colorful sticker revealed underneath
 * 4. Celebrate: Sticker bounces and sparkles burst
 * 5. Done: Fade out
 */
function getResponsiveStickerSize(): number {
  if (typeof window === 'undefined') return 140;
  return Math.min(window.innerWidth * 0.35, 140);
}

const StickerPeelAnimation: React.FC<StickerPeelAnimationProps> = ({
  emoji,
  color,
  onComplete,
  originX,
  originY,
}) => {
  const [phase, setPhase] = useState<AnimationPhase>('ready');
  const [stickerSize] = useState(getResponsiveStickerSize);

  // Animation phase timing
  useEffect(() => {
    // Small delay for initial render, then start peel
    const readyTimer = setTimeout(() => {
      setPhase('peeling');
      playSound(AudioSounds.WHOOSH);
    }, 100);

    const revealTimer = setTimeout(() => {
      setPhase('reveal');
    }, 500);

    const celebrateTimer = setTimeout(() => {
      setPhase('celebrate');
      playSound(AudioSounds.POP);
    }, 800);

    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, 1400);

    const completeTimer = setTimeout(onComplete, 1600);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(revealTimer);
      clearTimeout(celebrateTimer);
      clearTimeout(doneTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Center the animation on the origin point
  const left = originX - stickerSize / 2;
  const top = originY - stickerSize / 2;

  // Check if peel animation has completed (past the peeling phase)
  const isPeeled = phase === 'reveal' || phase === 'celebrate' || phase === 'done';

  // Get peel transform based on animation phase
  function getPeelTransform(): string {
    if (phase === 'ready') {
      return 'rotateY(0deg) rotateX(0deg) translateX(0) translateY(0) translateZ(0)';
    }
    if (phase === 'peeling') {
      return 'rotateY(-45deg) rotateX(15deg) translateX(-20px) translateY(-10px) translateZ(30px)';
    }
    // reveal, celebrate, done
    return 'rotateY(-180deg) rotateX(0deg) translateX(-40px) translateY(-20px) translateZ(0)';
  }

  function getPeelTransition(): string {
    if (phase === 'ready') return 'none';
    if (phase === 'peeling') return 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    return 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  return (
    <Portal>
      {/* Backdrop with subtle blur */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(3px)',
          zIndex: 1300,
          opacity: phase === 'done' ? 0 : 1,
          transition: 'opacity 0.2s ease-out',
        }}
      />

      {/* Animation container with 3D perspective */}
      <Box
        sx={{
          position: 'fixed',
          left,
          top,
          width: stickerSize,
          height: stickerSize,
          zIndex: 1301,
          perspective: '600px',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* The colorful revealed sticker (underneath) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '22px',
            background: `linear-gradient(145deg, ${color}30 0%, ${color}60 100%)`,
            border: `4px solid ${color}`,
            boxShadow:
              phase === 'celebrate'
                ? `0 8px 30px ${color}60, 0 4px 15px rgba(0,0,0,0.15)`
                : `0 4px 15px ${color}40, 0 2px 8px rgba(0,0,0,0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: stickerSize * 0.55,
            // Scale up on celebrate
            transform: phase === 'celebrate' ? 'scale(1.08)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            // Only visible after peel starts
            opacity: phase === 'ready' ? 0 : 1,
          }}
        >
          {/* Colorful emoji */}
          <Box
            sx={{
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            {emoji}
          </Box>
        </Box>

        {/* The grey backing that peels away */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            // Peel from right edge (like lifting a sticker)
            transformOrigin: 'left center',
            transform: getPeelTransform(),
            transition: getPeelTransition(),
            // Hide once fully peeled
            opacity: isPeeled ? 0 : 1,
            pointerEvents: 'none',
          }}
        >
          {/* Grey sticker front face */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '22px',
              background: 'linear-gradient(145deg, #f0f0f0 0%, #d8d8d8 100%)',
              border: '4px dashed #bbb',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
              backfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: stickerSize * 0.55,
            }}
          >
            {/* Greyed emoji */}
            <Box sx={{ filter: 'grayscale(100%) opacity(0.5)' }}>{emoji}</Box>

            {/* Lifted corner effect */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: phase === 'peeling' ? '45%' : '30%',
                height: phase === 'peeling' ? '45%' : '30%',
                background: `linear-gradient(135deg,
                  transparent 30%,
                  rgba(255,255,255,0.9) 40%,
                  rgba(255,255,255,1) 50%,
                  ${color}40 60%,
                  ${color}80 100%)`,
                borderTopRightRadius: '22px',
                borderBottomLeftRadius: '100%',
                boxShadow: '-4px 4px 10px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease-out',
              }}
            />
          </Box>

          {/* Back face of the peeling sticker (shows the color peeking) */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '22px',
              background: `linear-gradient(145deg, ${color}80 0%, ${color} 100%)`,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          />
        </Box>

        {/* Shine effect on revealed sticker */}
        {(phase === 'celebrate' || phase === 'reveal') && (
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '30%',
              height: '30%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: phase === 'celebrate' ? 1 : 0.5,
              transform: phase === 'celebrate' ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s ease-out',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Sparkle particles on celebration */}
        {phase === 'celebrate' &&
          [...Array(8)].map((_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const distance = 60 + (i % 2) * 20;
            return (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: i % 2 === 0 ? '10px' : '6px',
                  height: i % 2 === 0 ? '10px' : '6px',
                  borderRadius: '50%',
                  backgroundColor: i % 2 === 0 ? color : '#FFD700',
                  animation: `sparkle-${i} 0.6s ease-out forwards`,
                  [`@keyframes sparkle-${i}`]: {
                    '0%': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(0)',
                    },
                    '50%': {
                      opacity: 1,
                      transform: `translate(
                        calc(-50% + ${Math.cos(angle) * distance * 0.6}px),
                        calc(-50% + ${Math.sin(angle) * distance * 0.6}px)
                      ) scale(1.5)`,
                    },
                    '100%': {
                      opacity: 0,
                      transform: `translate(
                        calc(-50% + ${Math.cos(angle) * distance}px),
                        calc(-50% + ${Math.sin(angle) * distance}px)
                      ) scale(0)`,
                    },
                  },
                }}
              />
            );
          })}

        {/* Star bursts for extra celebration */}
        {phase === 'celebrate' &&
          [...Array(4)].map((_, i) => {
            const angle = (i * 90 + 45) * Math.PI / 180;
            return (
              <Box
                key={`star-${i}`}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  fontSize: '16px',
                  animation: `star-${i} 0.5s ease-out forwards`,
                  [`@keyframes star-${i}`]: {
                    '0%': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    },
                    '60%': {
                      opacity: 1,
                      transform: `translate(
                        calc(-50% + ${Math.cos(angle) * 45}px),
                        calc(-50% + ${Math.sin(angle) * 45}px)
                      ) scale(1) rotate(180deg)`,
                    },
                    '100%': {
                      opacity: 0,
                      transform: `translate(
                        calc(-50% + ${Math.cos(angle) * 55}px),
                        calc(-50% + ${Math.sin(angle) * 55}px)
                      ) scale(0.5) rotate(360deg)`,
                    },
                  },
                }}
              >
                ✨
              </Box>
            );
          })}
      </Box>
    </Portal>
  );
};

export default StickerPeelAnimation;
