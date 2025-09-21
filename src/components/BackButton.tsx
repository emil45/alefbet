import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoundFunButton from './RoundFunButton';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const handleClick = () => {
    setTimeout(() => {
      if (location.key === 'default') {
        navigate('/');
      } else {
        navigate(-1);
      }
    }, 500);
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      <RoundFunButton onClick={handleClick}>
        <ArrowBackIcon />
      </RoundFunButton>
    </Box>
  );
};

export default BackButton;
