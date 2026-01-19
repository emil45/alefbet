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

type AnimationPhase = 'lifting' | 'peeling' | 'landing' | 'done';

function getShadowTransform(phase: AnimationPhase): string {
  switch (phase) {
    case 'lifting':
      return 'scaleX(0.8) scaleY(0.5)';
    case 'peeling':
      return 'scaleX(1.2) scaleY(0.6)';
    default:
      return 'scaleX(1) scaleY(0.8)';
  }
}

function getShadowTransition(phase: AnimationPhase): string {
  switch (phase) {
    case 'lifting':
      return 'all 0.2s ease-out';
    case 'peeling':
      return 'all 0.4s ease-in-out';
    default:
      return 'all 0.3s ease-out';
  }
}

function getStickerTransform(phase: AnimationPhase): string {
  switch (phase) {
    case 'lifting':
      return 'rotateX(15deg) rotateY(-10deg) rotateZ(5deg) translateZ(20px)';
    case 'peeling':
      return 'rotateX(45deg) rotateY(-15deg) rotateZ(8deg) translateZ(60px) translateY(-20px)';
    case 'landing':
      return 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px) translateY(0px) scale(1.05)';
    default:
      return 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px) scale(1)';
  }
}

function getStickerTransition(phase: AnimationPhase): string {
  switch (phase) {
    case 'lifting':
      return 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    case 'peeling':
      return 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    case 'landing':
      return 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    default:
      return 'transform 0.2s ease-out';
  }
}

/**
 * A delightful sticker peel animation that shows a sticker "peeling" from a
 * greyed-out state, lifting from the corner, and settling with a bounce.
 *
 * Animation sequence:
 * 1. Sticker appears at origin, greyed out and flat
 * 2. Top-right corner begins to lift (3D perspective)
 * 3. Sticker peels down diagonally with curl effect
 * 4. Color floods in as it peels
 * 5. Sticker lands with a satisfying bounce
 * 6. Quick sparkle effect on completion
 */
const StickerPeelAnimation: React.FC<StickerPeelAnimationProps> = ({
  emoji,
  color,
  onComplete,
  originX,
  originY,
}) => {
  const [phase, setPhase] = useState<AnimationPhase>('lifting');
  const [stickerSize, setStickerSize] = useState(160);

  // Calculate responsive size on mount
  useEffect(() => {
    setStickerSize(Math.min(window.innerWidth * 0.35, 160));
  }, []);

  // Sound effects and animation phases
  useEffect(() => {
    // Play initial lift sound (soft whoosh)
    playSound(AudioSounds.WHOOSH);

    // Phase timing
    const liftTimer = setTimeout(() => {
      setPhase('peeling');
    }, 200);

    const peelTimer = setTimeout(() => {
      setPhase('landing');
      // Play pop sound when landing
      playSound(AudioSounds.POP);
    }, 600);

    const landTimer = setTimeout(() => {
      setPhase('done');
    }, 1000);

    const completeTimer = setTimeout(() => {
      try {
        onComplete();
      } catch (error) {
        console.error('StickerPeelAnimation: onComplete callback failed:', error);
      }
    }, 1200);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(peelTimer);
      clearTimeout(landTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Center the animation on the origin point
  const left = originX - stickerSize / 2;
  const top = originY - stickerSize / 2;

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
          backgroundColor: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(2px)',
          zIndex: 1300,
          opacity: phase === 'done' ? 0 : 1,
          transition: 'opacity 0.2s ease-out',
        }}
      />

      {/* Animated sticker container */}
      <Box
        sx={{
          position: 'fixed',
          left,
          top,
          width: stickerSize,
          height: stickerSize,
          zIndex: 1301,
          perspective: '800px',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Shadow underneath the sticker */}
        <Box
          sx={{
            position: 'absolute',
            left: '10%',
            right: '10%',
            bottom: phase === 'landing' || phase === 'done' ? '-8%' : '-15%',
            height: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)',
            transform: getShadowTransform(phase),
            opacity: phase === 'done' ? 0 : 0.6,
            transition: getShadowTransition(phase),
          }}
        />

        {/* The sticker itself */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transformOrigin: 'bottom left',
            transform: getStickerTransform(phase),
            transition: getStickerTransition(phase),
          }}
        >
          {/* Sticker background - transitions from grey to colorful */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              background: phase === 'lifting'
                ? 'linear-gradient(145deg, #e8e8e8 0%, #d0d0d0 100%)'
                : `linear-gradient(145deg, ${color}40 0%, ${color}80 100%)`,
              border: phase === 'lifting'
                ? '4px dashed #bbb'
                : `4px solid ${color}`,
              boxShadow: phase === 'lifting' || phase === 'peeling'
                ? '0 15px 35px rgba(0,0,0,0.2), 0 5px 15px rgba(0,0,0,0.1)'
                : phase === 'landing'
                ? `0 8px 25px ${color}50, 0 4px 10px rgba(0,0,0,0.1), inset 0 -3px 6px rgba(0,0,0,0.1)`
                : `0 4px 12px ${color}40, inset 0 -2px 4px rgba(0,0,0,0.1)`,
              transition: 'all 0.4s ease-out',
            }}
          />

          {/* Curl/fold effect on top-right corner during peel */}
          {(phase === 'lifting' || phase === 'peeling') && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: phase === 'lifting' ? '30%' : '40%',
                height: phase === 'lifting' ? '30%' : '40%',
                background: `linear-gradient(135deg,
                  transparent 40%,
                  rgba(255,255,255,0.8) 45%,
                  rgba(255,255,255,0.9) 50%,
                  ${color}60 55%,
                  ${color}80 100%)`,
                borderTopRightRadius: '24px',
                borderBottomLeftRadius: '50%',
                transform: phase === 'lifting'
                  ? 'rotate(-10deg) translateX(5%) translateY(-5%)'
                  : 'rotate(-25deg) translateX(15%) translateY(-15%)',
                boxShadow: '-3px 3px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease-out',
              }}
            />
          )}

          {/* Emoji content */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: stickerSize * 0.55,
              filter: phase === 'lifting'
                ? 'grayscale(80%) opacity(0.6)'
                : 'grayscale(0%) opacity(1)',
              transform: phase === 'landing' ? 'scale(1.1)' : 'scale(1)',
              textShadow: phase === 'landing' || phase === 'done'
                ? '0 4px 12px rgba(0,0,0,0.2)'
                : 'none',
              transition: 'all 0.3s ease-out',
            }}
          >
            {emoji}
          </Box>

          {/* Shine/glint effect on landing */}
          {(phase === 'landing' || phase === 'done') && (
            <Box
              sx={{
                position: 'absolute',
                top: '15%',
                left: '15%',
                width: '25%',
                height: '25%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, transparent 70%)',
                borderRadius: '50%',
                opacity: phase === 'landing' ? 1 : 0,
                transform: phase === 'landing' ? 'scale(1)' : 'scale(0.5)',
                transition: 'all 0.3s ease-out',
              }}
            />
          )}
        </Box>

        {/* Sparkle particles on completion */}
        {phase === 'landing' &&
          [...Array(6)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: color,
                animation: `sparkle-burst-${i} 0.6s ease-out forwards`,
                [`@keyframes sparkle-burst-${i}`]: {
                  '0%': {
                    opacity: 1,
                    transform: `translate(-50%, -50%) scale(0)`,
                  },
                  '50%': {
                    opacity: 1,
                    transform: `translate(
                      calc(-50% + ${Math.cos((i * 60) * Math.PI / 180) * 50}px),
                      calc(-50% + ${Math.sin((i * 60) * Math.PI / 180) * 50}px)
                    ) scale(1.5)`,
                  },
                  '100%': {
                    opacity: 0,
                    transform: `translate(
                      calc(-50% + ${Math.cos((i * 60) * Math.PI / 180) * 80}px),
                      calc(-50% + ${Math.sin((i * 60) * Math.PI / 180) * 80}px)
                    ) scale(0)`,
                  },
                },
              }}
            />
          ))}
      </Box>
    </Portal>
  );
};

export default StickerPeelAnimation;
