'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import RoundFunButton from './RoundFunButton';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      router.push('/');
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
