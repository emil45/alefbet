import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FunButton from '../components/FunButton';
import { useTranslation } from 'react-i18next';
import { RoutesEnum } from '../models/RoutesEnum';
import RoundFunButton from '../components/RoundFunButton';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsDrawer from '../components/SettingsDrawer';
import { useNavigate } from 'react-router-dom';
import { getLanguageSpecificRoute } from '../utils/languageRoutes';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = (i18n.language || 'he') === 'he';

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const showButtons = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <FunButton to={RoutesEnum.LETTERS} text={t('home.buttons.letters')} />
        <FunButton to={RoutesEnum.NUMBERS} text={t('home.buttons.numbers')} />
        <FunButton to={RoutesEnum.COLORS} text={t('home.buttons.colors')} />
        <FunButton to={RoutesEnum.SHAPES} text={t('home.buttons.shapes')} />
        <FunButton to={RoutesEnum.ANIMALS} text={t('home.buttons.animals')} />
        <FunButton to={RoutesEnum.FOOD} text={t('home.buttons.food')} />
        <FunButton to={RoutesEnum.GAMES} text={t('home.buttons.games')} />
      </Box>
    );
  };

  const showSettingsButton = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' }, // Less top margin on mobile
          ...(isRTL ? { left: { xs: '10px', sm: '20px' } } : { right: { xs: '10px', sm: '20px' } }),
          zIndex: 10, // Ensure it's above other content
        }}
      >
        <RoundFunButton onClick={() => toggleDrawer(true)}>
          <SettingsIcon />
        </RoundFunButton>
      </Box>
    );
  };

  const showLearnMoreButton = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10px', sm: '20px' }, // Same positioning as settings
          ...(isRTL ? { right: { xs: '10px', sm: '20px' } } : { left: { xs: '10px', sm: '20px' } }), // Opposite side
          zIndex: 10, // Ensure it's above other content
        }}
      >
        <RoundFunButton onClick={() => navigate(getLanguageSpecificRoute(RoutesEnum.SEO, i18n.language))}>
          <HelpOutlineIcon />
        </RoundFunButton>
      </Box>
    );
  };

  return (
    <Box>
      {showSettingsButton()}
      {showLearnMoreButton()}
      <SettingsDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ pt: { xs: 8, sm: 6 } }} // Add top padding - more on mobile, less on desktop
      >
        {showButtons()}
      </Box>
    </Box>
  );
};

export default HomePage;
