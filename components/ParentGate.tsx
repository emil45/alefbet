'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Box, TextField, Typography, Paper, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ParentGateProps {
  children: React.ReactNode;
}

function generateMathProblem(): { num1: number; num2: number; answer: number } {
  const num1 = Math.floor(Math.random() * 10) + 5; // 5-14
  const num2 = Math.floor(Math.random() * 10) + 5; // 5-14
  return { num1, num2, answer: num1 + num2 };
}

export default function ParentGate({ children }: ParentGateProps) {
  const t = useTranslations('parentGate');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);

  const problem = useMemo(() => generateMathProblem(), []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (parseInt(userAnswer, 10) === problem.answer) {
        setIsUnlocked(true);
        setIsWrong(false);
      } else {
        setIsWrong(true);
        setUserAnswer('');
      }
    },
    [userAnswer, problem.answer]
  );

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #fff9c4 0%, #fff3e0 100%)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#6a1b9a', mb: 3 }}
        >
          {t('title')}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: '#5d4037' }}>
          {t('description')}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: '#1565c0',
            fontFamily: 'monospace',
          }}
        >
          {problem.num1} + {problem.num2} = ?
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            type="number"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setIsWrong(false);
            }}
            placeholder={t('placeholder')}
            error={isWrong}
            helperText={isWrong ? t('wrongAnswer') : ''}
            inputProps={{
              style: { fontSize: '24px', textAlign: 'center' },
              inputMode: 'numeric',
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white',
              },
            }}
            fullWidth
            autoFocus
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: 2,
              backgroundColor: '#7b1fa2',
              '&:hover': {
                backgroundColor: '#6a1b9a',
              },
            }}
          >
            {t('submit')}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
