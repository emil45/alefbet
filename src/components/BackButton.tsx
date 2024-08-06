import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TEXTS } from '../data/texts';
import FunButton from './FunButton';

interface BackButtonProps {
  paddingX?: number;
}

const BackButton: React.FC<BackButtonProps> = ({ paddingX }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  return <FunButton text={TEXTS.BACK_BUTTON} fontSize={16} onClick={handleClick} paddingX={paddingX} />;
};

export default BackButton;
