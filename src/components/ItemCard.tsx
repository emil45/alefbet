import React from 'react';
import { Box, SvgIcon, Typography, useTheme } from '@mui/material';

interface ItemCardProps {
  name: string;
  soundFile: string;
  textColor: string;
  backgroundColor?: string;
  itemCaption?: string;
  element?: React.ReactNode;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, soundFile, textColor, backgroundColor, itemCaption, element }) => {
  const theme = useTheme();

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
        backgroundColor: backgroundColor || theme.palette.colors.beigePastel,
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
        height: '150px',
        width: '150px',
        position: 'relative',
      })}
    >
      {element ? (
        <SvgIcon sx={{ fontSize: 100, color: textColor }}>{element}</SvgIcon>
      ) : (
        <Typography variant="h1" sx={{ color: textColor, fontSize: '124px', fontWeight: 'bold' }}>
          {name}
        </Typography>
      )}
      {itemCaption && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: '10%',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {itemCaption}
        </Typography>
      )}
    </Box>
  );
};

export default ItemCard;
