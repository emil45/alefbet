import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoundFunButton from './RoundFunButton';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setTimeout(() => {
      if (location.key === 'default') {
        navigate('/');
      } else {
        navigate(-1);
      }
    }, 500);
  };

  return (<Box>
    <RoundFunButton onClick={handleClick} >
      <ArrowBackIcon />
    </RoundFunButton>
  </Box>);
};

export default BackButton;
