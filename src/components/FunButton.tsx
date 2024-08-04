import React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

interface FunButtonProps {
  text: string;
  to?: string; // Made optional
  onClick?: () => void; // Made optional
}

const FunButton: React.FC<FunButtonProps> = ({ text, to, onClick }) => {
  const navigate = useNavigate();

  const commonStyles = (theme: any) => ({
    position: 'relative',
    border: 'none',
    background: 'transparent',
    padding: '0',
    cursor: 'pointer',
    outlineOffset: '4px',
    transition: 'filter 250ms',
    '& .shadow': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      background: 'hsla(0, 0%, 0%, 0.25)',
      willChange: 'transform',
      transform: 'translateY(2px)',
      transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
    },
    '& .edge': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      background: 'linear-gradient(to left, #52001b 0%, #a30036 8%, #a30036 92%, #52001b 100%)',
    },
    '& .front': {
      display: 'block',
      position: 'relative',
      color: theme.palette.colors.white,
      fontWeight: 'bold',
      fontSize: { xs: '30px', sm: '40px', md: '50px' },
      padding: '12px 30px',
      borderRadius: '12px',
      background: '#f0003c', // original '#f0003c'
      willChange: 'transform',
      transform: 'translateY(-4px)',
      transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
    },
    '&:hover': {
      backgroundColor: 'transparent',
      filter: 'brightness(110%)',
      '& .front': {
        transform: 'translateY(-6px)',
        transition: 'transform 250ms cubic-bezier(.3, .7, .4, 1.5)',
      },
      '& .shadow': {
        transform: 'translateY(4px)',
        transition: 'transform 250ms cubic-bezier(.3, .7, .4, 1.5)',
      },
    },
    '&:active': {
      '& .front': {
        transform: 'translateY(-2px)',
        transition: 'transform 34ms',
      },
      '& .shadow': {
        transform: 'translateY(1px)',
        transition: 'transform 34ms',
      },
    },
    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (to) {
      setTimeout(() => {
        navigate(to);
      }, 500);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Button disableElevation sx={commonStyles} onClick={handleClick}>
      <Box className="shadow" />
      <Box className="edge" />
      <Typography className="front" sx={{ minWidth: '100%' }}>
        {text}
      </Typography>
    </Button>
  );
};

export default FunButton;
