import React from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';
import { MemoryMatchCardModel } from '../models/MemoryMatchCardModel';
import StarIcon from '@mui/icons-material/Star';

interface MemoryMatchCardProps {
  card: MemoryMatchCardModel;
  flipped: boolean;
  onClick: () => void;
}

const MemoryMatchCard: React.FC<MemoryMatchCardProps> = React.memo(({ card, flipped, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={(theme) => ({
        cursor: 'pointer',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(1)',
        },
        height: { xs: '100px', sm: '150px' },
        width: { xs: '100px', sm: '150px' },
        perspective: '1000px',
      })}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <Box
          sx={(theme) => ({
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.colors.components.memoryMatchCardBack,
            borderRadius: '8px',
          })}
        >
          <StarIcon
            sx={(theme) => ({
              fontSize: { xs: '90px', sm: '120px' },
              color: theme.palette.colors.components.memoryMatchCardBackIcon,
            })}
          />
        </Box>
        <Box
          sx={(theme) => ({
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.colors.components.itemCardBackground,
            borderRadius: '8px',
            transform: 'rotateY(180deg)',
          })}
        >
          {card.element ? (
            <SvgIcon sx={{ fontSize: { xs: 70, sm: 100 }, color: card.textColor }}>{card.element}</SvgIcon>
          ) : (
            <Typography
              variant="h1"
              sx={{
                color: card.textColor,
                fontSize: { xs: '100px', sm: '124px' },
                fontWeight: 'bold',
              }}
            >
              {card.name}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default MemoryMatchCard;
