'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

interface StickerCardProps {
  emoji: string;
  name: string;
  isLocked: boolean;
  unlockHint?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  pageColor?: string;
}

const StickerCard: React.FC<StickerCardProps> = ({
  emoji,
  name,
  isLocked,
  unlockHint,
  onClick,
  pageColor = '#FFD93D',
}) => {
  // Peelable = unlocked but not yet earned (has onClick handler)
  const isPeelable = !isLocked && !!onClick;

  function getEmojiFilter(locked: boolean, peelable: boolean): string {
    if (locked) return 'grayscale(100%) opacity(0.4)';
    if (peelable) return 'grayscale(80%) opacity(0.5)';
    return 'none';
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isLocked && onClick) {
      onClick(event);
    }
  };

  const cardContent = (
    <Box
      onClick={handleClick}
      sx={{
        cursor: isLocked ? 'default' : onClick ? 'pointer' : 'default',
        position: 'relative',
        width: { xs: '90px', sm: '110px' },
        height: { xs: '90px', sm: '110px' },
      }}
    >
      {/* Sticker base */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '20px',
          // Peelable stickers look mostly locked (grey) to create anticipation
          ...(isLocked || isPeelable
            ? {
                background: 'linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)',
                border: '3px dashed #ccc',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
              }
            : {
                background: `linear-gradient(145deg, ${pageColor}22 0%, ${pageColor}44 100%)`,
                border: `3px solid ${pageColor}`,
                boxShadow: `0 4px 12px ${pageColor}40, inset 0 -2px 4px rgba(0,0,0,0.1)`,
              }),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...(isPeelable && {
            '&:hover': { transform: 'scale(1.05)' },
          }),
        }}
      />

      {/* Peelable corner tab - the "grab here" visual hint */}
      {isPeelable && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: { xs: '28px', sm: '34px' },
            height: { xs: '28px', sm: '34px' },
            zIndex: 3,
            // Lifted corner effect
            background: `linear-gradient(135deg,
              transparent 35%,
              rgba(255,255,255,0.95) 40%,
              rgba(255,255,255,1) 45%,
              ${pageColor}50 50%,
              ${pageColor} 60%,
              ${pageColor} 100%)`,
            borderTopRightRadius: '20px',
            borderBottomLeftRadius: '100%',
            // Shadow to show lift
            boxShadow: `-3px 3px 6px rgba(0,0,0,0.15), -1px 1px 2px rgba(0,0,0,0.1)`,
            // Gentle bounce animation
            animation: 'cornerLift 2s ease-in-out infinite',
            '@keyframes cornerLift': {
              '0%, 100%': {
                transform: 'rotate(0deg) translate(0, 0)',
              },
              '50%': {
                transform: 'rotate(-3deg) translate(-2px, 2px)',
              },
            },
          }}
        />
      )}

      {/* Color peek under the lifted corner - shows the reward underneath */}
      {isPeelable && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '4px', sm: '5px' },
            right: { xs: '4px', sm: '5px' },
            width: { xs: '20px', sm: '24px' },
            height: { xs: '20px', sm: '24px' },
            background: `linear-gradient(135deg, ${pageColor} 0%, ${pageColor}cc 100%)`,
            borderTopRightRadius: '16px',
            borderBottomLeftRadius: '50%',
            zIndex: 2,
          }}
        />
      )}

      {/* Sticker content */}
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {/* Emoji with fun styling */}
        <Box
          sx={{
            fontSize: { xs: '42px', sm: '52px' },
            lineHeight: 1,
            // Peelable stickers are greyed like locked, but slightly less
            filter: getEmojiFilter(isLocked, isPeelable),
            transition: 'all 0.3s ease',
            ...(!isLocked && !isPeelable && {
              transform: 'translateY(-2px)',
              textShadow: '0 4px 8px rgba(0,0,0,0.15)',
            }),
          }}
        >
          {emoji}
        </Box>

        {/* Lock indicator for locked stickers (not peelable ones) */}
        {isLocked && (
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: '6px', sm: '8px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              padding: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <LockIcon
              sx={{
                fontSize: { xs: 14, sm: 16 },
                color: '#999',
              }}
            />
          </Box>
        )}

        {/* Sparkle hint for peelable stickers - subtle glow on the lifted corner */}
        {isPeelable && (
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '2px', sm: '3px' },
              right: { xs: '2px', sm: '3px' },
              width: { xs: '16px', sm: '20px' },
              height: { xs: '16px', sm: '20px' },
              borderRadius: '50%',
              background: `radial-gradient(circle, ${pageColor}80 0%, transparent 70%)`,
              animation: 'sparkleGlow 1.5s ease-in-out infinite',
              zIndex: 4,
              '@keyframes sparkleGlow': {
                '0%, 100%': { opacity: 0.4, transform: 'scale(0.8)' },
                '50%': { opacity: 1, transform: 'scale(1.3)' },
              },
            }}
          />
        )}
      </Box>

      {/* Sticker name below */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: { xs: '-22px', sm: '-26px' },
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: { xs: '10px', sm: '11px' },
          fontWeight: 600,
          color: isLocked || isPeelable ? '#aaa' : '#5d4037',
          textAlign: 'center',
          width: '110%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          transition: 'color 0.3s ease',
        }}
      >
        {name}
      </Typography>
    </Box>
  );

  // Wrap in tooltip if locked with hint
  if (isLocked && unlockHint) {
    return (
      <Tooltip
        title={unlockHint}
        placement="top"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: 'rgba(93, 64, 55, 0.95)',
              fontSize: '12px',
              padding: '8px 12px',
              borderRadius: '8px',
            },
          },
          arrow: {
            sx: {
              color: 'rgba(93, 64, 55, 0.95)',
            },
          },
        }}
      >
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
};

export default StickerCard;
