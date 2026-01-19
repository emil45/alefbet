'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

interface StickerCardProps {
  emoji: string;
  name: string;
  isLocked: boolean;
  unlockHint?: string;
  onClick?: () => void;
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
  const cardContent = (
    <Box
      onClick={isLocked ? undefined : onClick}
      sx={{
        cursor: isLocked ? 'default' : onClick ? 'pointer' : 'default',
        position: 'relative',
        width: { xs: '90px', sm: '110px' },
        height: { xs: '90px', sm: '110px' },
      }}
    >
      {/* Sticker base - looks like a peeled sticker */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '20px',
          background: isLocked
            ? 'linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%)'
            : `linear-gradient(145deg, ${pageColor}22 0%, ${pageColor}44 100%)`,
          border: isLocked
            ? '3px dashed #ccc'
            : `3px solid ${pageColor}`,
          boxShadow: isLocked
            ? 'inset 0 2px 4px rgba(0,0,0,0.05)'
            : `0 4px 12px ${pageColor}40, inset 0 -2px 4px rgba(0,0,0,0.1)`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': !isLocked && onClick
            ? {
                transform: 'scale(1.08)',
                boxShadow: `0 8px 20px ${pageColor}50`,
              }
            : {},
        }}
      />

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
            filter: isLocked ? 'grayscale(100%) opacity(0.4)' : 'none',
            transition: 'all 0.3s ease',
            transform: !isLocked ? 'translateY(-2px)' : 'none',
            textShadow: !isLocked ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          {emoji}
        </Box>

        {/* Lock indicator for locked stickers */}
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

        {/* Sparkle effect for unlocked clickable stickers */}
        {!isLocked && onClick && (
          <Box
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${pageColor} 0%, transparent 70%)`,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
                '50%': { opacity: 1, transform: 'scale(1.2)' },
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
          color: isLocked ? '#aaa' : '#5d4037',
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
