import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

type FunButtonStyleProps = {
  selected: boolean;
};

const FunButtonStyle = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ selected }) => ({
  background: selected
    ? 'linear-gradient(45deg, #4caf50, #ffeb3b)' // Bright gradient when selected
    : 'linear-gradient(45deg, #2196f3, #e91e63)', // Default gradient
  color: 'white',
  borderRadius: '25px', // Playful rounded corners
  padding: '12px 30px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: selected
    ? '0 12px 24px rgba(0, 0, 0, 0.6)' // Larger shadow for selected
    : '0 8px 16px rgba(0, 0, 0, 0.3)', // Default shadow
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease-in-out, background 0.3s ease', // Smooth animation
  '&:hover': {
    background: selected
      ? 'linear-gradient(45deg, #66bb6a, #ffeb3b)' // Lighter gradient on hover when selected
      : 'linear-gradient(45deg, #64b5f6, #ec407a)', // Lighter gradient on hover when not selected
    transform: 'scale(1.05)', // Slight scale-up effect
  },
}));

// Fun Button Component with text and onClick
interface FunButtonProps {
  selected: boolean;
  text: string;
  onClick: () => void;
}

const FunButton: React.FC<FunButtonProps> = ({ text, onClick, selected }) => {
  if (selected) {
    console.log(selected);
  }

  return (
    <FunButtonStyle variant="contained" selected={selected} onClick={onClick}>
      {text}
    </FunButtonStyle>
  );
};

export default FunButton;
