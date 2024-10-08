import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FunButton from '../components/FunButton';
import { useTranslation } from 'react-i18next';
import { RoutesEnum } from '../models/RoutesEnum';
import RoundFunButton from '../components/RoundFunButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDrawer from '../components/SettingsDrawer';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

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
        <FunButton to={RoutesEnum.GAMES} text={t('home.buttons.games')} />
      </Box>
    );
  };

  const showTitle = () => {
    return (
      <Typography textAlign="center" variant="h2" sx={{ mb: 3, color: 'primary.light' }}>
        {t('home.chooseGameText')}
      </Typography>
    );
  };

  const showSettingsButton = () => {
    return (
      <RoundFunButton onClick={() => toggleDrawer(true)}>
        <SettingsIcon />
      </RoundFunButton>
    );
  };

  return (
    <Box>
      {showSettingsButton()}
      <SettingsDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box display="flex" flexDirection="column" alignItems="center">
        {showTitle()}
        {showButtons()}
      </Box>
    </Box>
  );
};

export default HomePage;
