import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { logEvent } from '../utils/amplitude';
import { AmplitudeEventsEnum } from '../models/amplitudeEvents';


interface RoundFunButtonProps {
  to?: string;
  onClick?: () => void;
  backgroundColor?: string;
  children: React.ReactNode;
}

const RoundFunButton: React.FC<RoundFunButtonProps> = (props) => {
  const navigate = useNavigate();

  const commonStyles = (theme: any) => ({
    color: 'white',
    height: '50px',
    width: '50px',
    position: 'relative',
    border: 'none',
    background: 'transparent',
    padding: '0',
    cursor: 'pointer',
    outlineOffset: '4px',
    transition: 'filter 250ms',
    minWidth: 0,
    '& .shadow': {
      position: 'absolute',
      width: 'inherit',
      height: 'inherit',
      borderRadius: `50%`,
      background: '#00000040',
      willChange: 'transform',
      transform: 'translateY(2px)',
      transition: 'transform 600ms cubic-bezier(.3, .7, .4, 1)',
    },
    '& .edge': {
      position: 'absolute',
      width: 'inherit',
      height: 'inherit',
      borderRadius: `50%`,
      background: 'linear-gradient(to left, #5e1c32 0%, #a82f57 8%, #a82f57 92%, #5e1c32 100%)', // original linear-gradient(to left, #52001b 0%, #a30036 8%, #a30036 92%, #52001b 100%)
    },
    '& .front': {
      width: 'inherit',
      height: 'inherit',
      pt: `15px`,
      borderRadius: `50%`,
      background: props.backgroundColor || '#f74572', // original '#f0003c'
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
    '& .MuiTouchRipple-root': {
      color: 'red',
      borderRadius: `50%`,
      marginBottom: '2px',
      opacity: 0.6,
    },
    '&& .MuiTouchRipple-rippleVisible': {
      animationDuration: '600ms',
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (props.to) {
      // logEvent(AmplitudeEventsEnum.BUTTON_CLICK, { buttonName: to });
      setTimeout(() => {
        navigate(props.to!);
      }, 500);
    } else if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Button disableElevation sx={commonStyles} onClick={handleClick}>
      <Box className="shadow" />
      <Box className="edge" />
      <Typography className="front">
        {props.children}
      </Typography>
    </Button>
  );
};

export default RoundFunButton;
