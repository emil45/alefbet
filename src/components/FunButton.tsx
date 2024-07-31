import React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

// Fun Button Component with text, onClick, and optional to (for navigation)
interface FunButtonProps {
  text: string;
  to: string; // Optional prop for navigation
}

const FunButton: React.FC<FunButtonProps> = ({ text, to }) => {
  return (
    <Button
      sx={(theme) => ({
        backgroundColor: theme.palette.colors.greenPastel, // Use pastel color
        color: theme.palette.colors.blackPastel,
        borderRadius: '4px', // Standard border radius
        fontSize: '28px', // Standard font size
        textTransform: 'none', // No text transformation
        '&:hover': {
          backgroundColor: theme.palette.colors.purplePastel, // Hover color
        },
      })}
      variant="contained"
      size='large'
      component={RouterLink}
      to={to}
    >
      {text}
    </Button>
  );
};

export default FunButton;
