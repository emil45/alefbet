import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { logEvent } from '../utils/amplitude';
import { AmplitudeEventsEnum } from '../models/amplitudeEvents';
import { useTranslation } from 'react-i18next';
import { getLanguageSpecificRoute } from '../utils/languageRoutes';

interface FunButtonProps {
  text: string;
  to?: string;
  onClick?: () => void;
  fontSize?: number;
  backgroundColor?: string;
  paddingX?: number;
}

const FunButton: React.FC<FunButtonProps> = ({ text, to, onClick, fontSize, backgroundColor, paddingX, ...rest }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

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
      background: '#00000040',
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
      background: 'linear-gradient(to left, #5e1c32 0%, #a82f57 8%, #a82f57 92%, #5e1c32 100%)', // original linear-gradient(to left, #52001b 0%, #a30036 8%, #a30036 92%, #52001b 100%)
    },
    '& .front': {
      display: 'block',
      position: 'relative',
      color: theme.palette.colors.white,
      fontWeight: 'bold',
      fontSize: fontSize ? `${fontSize}px` : { xs: '30px', md: '40px' },
      padding: `12px ${paddingX || 30}px`,
      borderRadius: '12px',
      background: backgroundColor || '#f74572', // original '#f0003c'
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
      borderRadius: '10px',
      marginBottom: '2px',
      opacity: 0.6,
    },
    '&& .MuiTouchRipple-rippleVisible': {
      animationDuration: '600ms',
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (to) {
      // Get the language-specific route
      const languageRoute = getLanguageSpecificRoute(to as any, i18n.language);
      logEvent(AmplitudeEventsEnum.BUTTON_CLICK, { buttonName: to });
      setTimeout(() => {
        navigate(languageRoute);
      }, 500);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Button disableElevation sx={commonStyles} onClick={handleClick} {...rest}>
      <Box className="shadow" />
      <Box className="edge" />
      <Typography className="front" sx={{ minWidth: '100%' }}>
        {text}
      </Typography>
    </Button>
  );
};

export default FunButton;
