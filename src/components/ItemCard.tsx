import React from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';

interface ItemCardProps {
  name: string;
  soundFile: string;
  textColor: string;
  cardSize?: number;
  backgroundColor?: string;
  itemCaption?: string;
  element?: React.ReactNode;
  isRTL?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  soundFile,
  textColor,
  backgroundColor,
  itemCaption,
  element,
  cardSize = 1,
  isRTL = true,
}) => {
  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <Box
      onClick={playSound}
      sx={(theme) => ({
        cursor: 'pointer',
        padding: '30px',
        backgroundColor: backgroundColor || theme.palette.colors.components.itemCardBackground,
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, backgroundColor 0.3s',
        '&:hover': {
          transform: 'scale(1.1)',
        },
        '&:active': {
          transform: 'scale(1)',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${150 * cardSize}px`,
        width: `${150 * cardSize}px`,
        position: 'relative',
      })}
    >
      {element ? (
        <SvgIcon sx={{ fontSize: 100 * cardSize, color: textColor }}>{element}</SvgIcon>
      ) : (
        <Typography variant="h1" sx={{ color: textColor, fontSize: `${124 * cardSize}px`, fontWeight: 'bold' }}>
          {name}
        </Typography>
      )}
      {itemCaption && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '8px',
            ...(isRTL ? { right: '8px' } : { left: '8px' }),
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: '10%',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          {itemCaption}
        </Typography>
      )}
    </Box>
  );
};

export default ItemCard;
