'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Paper, IconButton, keyframes, Slide } from '@mui/material';
import { useTranslations } from 'next-intl';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import { playSound, AudioSounds } from '@/utils/audio';

const VISIT_COUNT_KEY = 'lepdy_visit_count';
const INSTALL_DISMISSED_KEY = 'lepdy_install_dismissed';
const VISITS_BEFORE_PROMPT = 3;

// Bouncy animation for the icon
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

// Sparkle effect
const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

// Pulse glow effect
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 4px 20px rgba(123, 31, 162, 0.3); }
  50% { box-shadow: 0 4px 30px rgba(123, 31, 162, 0.5); }
`;

// Interface for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Deterministic sparkle positions to avoid re-render issues
const SPARKLE_POSITIONS = [
  { top: 25, left: 15, duration: 2.0, delay: 0 },
  { top: 45, left: 75, duration: 2.2, delay: 0.4 },
  { top: 35, left: 45, duration: 2.4, delay: 0.8 },
  { top: 65, left: 25, duration: 2.1, delay: 1.2 },
  { top: 55, left: 85, duration: 2.3, delay: 1.6 },
];

export default function InstallPrompt() {
  const t = useTranslations('installPrompt');
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  // Track visits and check if we should show prompt
  useEffect(() => {
    // Don't run on server
    if (typeof window === 'undefined') return;

    try {
      // Check if already dismissed
      const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY);
      if (dismissed) return;

      // Check if app is already installed (standalone mode)
      if (window.matchMedia('(display-mode: standalone)').matches) return;

      // Increment visit count
      const currentCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0', 10);
      const newCount = currentCount + 1;
      localStorage.setItem(VISIT_COUNT_KEY, String(newCount));

      // Only show after required visits
      if (newCount < VISITS_BEFORE_PROMPT) return;

      // Listen for the beforeinstallprompt event
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowPrompt(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    } catch {
      // localStorage may be unavailable (private browsing, disabled, quota exceeded)
      // Gracefully degrade by not showing the install prompt
    }
  }, []);

  // Listen for app installed event to hide prompt if user installs via browser
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);
    playSound(AudioSounds.POP);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        playSound(AudioSounds.CELEBRATION);
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Install prompt error:', error);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);

    try {
      localStorage.setItem(INSTALL_DISMISSED_KEY, new Date().toISOString());
    } catch {
      // localStorage may fail - prompt will reappear next visit
    }

    playSound(AudioSounds.POP);
  }, []);

  if (!showPrompt) return null;

  return (
    <Slide direction="up" in={showPrompt} mountOnEnter unmountOnExit>
      <Paper
        elevation={12}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 'auto' },
          right: { xs: 16, sm: 24 },
          width: { xs: 'calc(100% - 32px)', sm: 'auto' },
          maxWidth: { sm: 380 },
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
          zIndex: 1300,
          animation: `${pulseGlow} 3s ease-in-out infinite`,
          overflow: 'hidden',
        }}
      >
        {/* Sparkle decorations */}
        {SPARKLE_POSITIONS.map((pos, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: 12,
              height: 12,
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animation: `${sparkle} ${pos.duration}s ease-in-out infinite`,
              animationDelay: `${pos.delay}s`,
              '&::before': {
                content: '"✨"',
                fontSize: '14px',
              },
            }}
          />
        ))}

        {/* Close button */}
        <IconButton
          onClick={handleDismiss}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#7b1fa2',
            '&:hover': {
              backgroundColor: 'rgba(123, 31, 162, 0.1)',
            },
          }}
          aria-label={t('close')}
        >
          <CloseIcon />
        </IconButton>

        {/* Icon with bounce animation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#7b1fa2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: `${bounce} 2s ease-in-out infinite`,
            }}
          >
            <GetAppIcon sx={{ fontSize: 36, color: 'white' }} />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#6a1b9a',
            mb: 1,
          }}
        >
          {t('title')}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#5d4037',
            mb: 3,
          }}
        >
          {t('description')}
        </Typography>

        {/* Install button */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleInstall}
          disabled={isInstalling}
          startIcon={<GetAppIcon />}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: 3,
            backgroundColor: '#7b1fa2',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#6a1b9a',
              transform: 'scale(1.02)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {isInstalling ? t('installing') : t('install')}
        </Button>

        {/* Benefits text */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#8e24aa',
            mt: 2,
          }}
        >
          {t('benefits')}
        </Typography>
      </Paper>
    </Slide>
  );
}
