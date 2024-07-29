import React from 'react';
import { Box, Typography } from '@mui/material';

interface ItemCardProps {
  name: string;
  soundFile: string;
  color: string;
  itemCaption?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, soundFile, color, itemCaption }) => {
  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  return (
    <Box
      onClick={playSound}
      sx={{
        cursor: 'pointer',
        padding: '20px',
        backgroundColor: '#ecebff',
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
        position: 'relative', // Ensure the number can be positioned absolutely
      }}
    >
      <Typography variant="h1" sx={{ color, fontSize: '124px', fontWeight: 'bold' }}>
        {name}
      </Typography>
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
