import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { TEXTS } from '../data/texts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.colors.greenPastel,
  color: theme.palette.colors.blackPastel,
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '16px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.colors.purplePastel,
  },
}));

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BackButtonStyle
      variant="contained"
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackIcon />}
    >
      {TEXTS.BACK_BUTTON}
    </BackButtonStyle>
  );
};

export default BackButton;
