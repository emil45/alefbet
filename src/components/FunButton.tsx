import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

// Styled Button with pastel colors from the theme
const FunButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.colors.redPastel, // Use pastel color
  color: 'black', // Text color
  borderRadius: '4px', // Standard border radius
  padding: '8px 16px', // Standard padding
  fontSize: '16px', // Standard font size
  textTransform: 'none', // No text transformation
  '&:hover': {
    backgroundColor: theme.palette.colors.purplePastel, // Hover color
  },
}));

// Fun Button Component with text and onClick
interface FunButtonProps {
  text: string;
  onClick: () => void;
}

const FunButton: React.FC<FunButtonProps> = ({ text, onClick }) => {
  return (
    <FunButtonStyle variant="contained" onClick={onClick}>
      {text}
    </FunButtonStyle>
  );
};

export default FunButton;
