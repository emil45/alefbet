'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import RoundFunButton from './RoundFunButton';
import { Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  href?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href = '/' }) => {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      router.push(href);
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
