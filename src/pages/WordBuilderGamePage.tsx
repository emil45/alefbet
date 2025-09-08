import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Modal,
} from '@mui/material';
import BackButton from '../components/BackButton';
import FunButton from '../components/FunButton';
import RoundFunButton from '../components/RoundFunButton';
import { useTranslation } from 'react-i18next';
import { shuffle } from '../utils/common';
import { AudioSounds, playSound } from '../utils/audio';
import Confetti from 'react-confetti';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';

interface HebrewWord {
  word: string;
  letters: string[];
  meaning: string;
  audioFile: string;
}

const HEBREW_WORDS: HebrewWord[] = [
  // Easy 2-letter words
  { word: 'אל', letters: ['א', 'ל'], meaning: 'אל', audioFile: '/audio/words/he/el.mp3' },
  { word: 'גן', letters: ['ג', 'ן'], meaning: 'גן', audioFile: '/audio/words/he/gan.mp3' },
  { word: 'דג', letters: ['ד', 'ג'], meaning: 'דג', audioFile: '/audio/words/he/dag.mp3' },
  { word: 'זב', letters: ['ז', 'ב'], meaning: 'זב', audioFile: '/audio/words/he/zav.mp3' },
  { word: 'חם', letters: ['ח', 'ם'], meaning: 'חם', audioFile: '/audio/words/he/cham.mp3' },
  { word: 'ים', letters: ['י', 'ם'], meaning: 'ים', audioFile: '/audio/words/he/yam.mp3' },
  { word: 'לב', letters: ['ל', 'ב'], meaning: 'לב', audioFile: '/audio/words/he/lev.mp3' },
  { word: 'מה', letters: ['מ', 'ה'], meaning: 'מה', audioFile: '/audio/words/he/ma.mp3' },
  { word: 'נר', letters: ['נ', 'ר'], meaning: 'נר', audioFile: '/audio/words/he/ner.mp3' },
  { word: 'עם', letters: ['ע', 'ם'], meaning: 'עם', audioFile: '/audio/words/he/am.mp3' },
  { word: 'פה', letters: ['פ', 'ה'], meaning: 'פה', audioFile: '/audio/words/he/pe.mp3' },
  { word: 'רק', letters: ['ר', 'ק'], meaning: 'רק', audioFile: '/audio/words/he/rak.mp3' },
  { word: 'שם', letters: ['ש', 'ם'], meaning: 'שם', audioFile: '/audio/words/he/sham.mp3' },
  { word: 'תן', letters: ['ת', 'ן'], meaning: 'תן', audioFile: '/audio/words/he/ten.mp3' },

  // Easy 3-letter words - Family & Basic
  { word: 'אבא', letters: ['א', 'ב', 'א'], meaning: 'אבא', audioFile: '/audio/words/he/abba.mp3' },
  { word: 'אמא', letters: ['א', 'מ', 'א'], meaning: 'אמא', audioFile: '/audio/words/he/ima.mp3' },
  { word: 'בן', letters: ['ב', 'ן'], meaning: 'בן', audioFile: '/audio/words/he/ben.mp3' },
  { word: 'בת', letters: ['ב', 'ת'], meaning: 'בת', audioFile: '/audio/words/he/bat.mp3' },
  { word: 'גמל', letters: ['ג', 'מ', 'ל'], meaning: 'גמל', audioFile: '/audio/words/he/gamal.mp3' },
  { word: 'דוד', letters: ['ד', 'ו', 'ד'], meaning: 'דוד', audioFile: '/audio/words/he/dod.mp3' },
  { word: 'דודה', letters: ['ד', 'ו', 'ד', 'ה'], meaning: 'דודה', audioFile: '/audio/words/he/doda.mp3' },
  
  // Easy 3-letter words - Animals
  { word: 'חתול', letters: ['ח', 'ת', 'ו', 'ל'], meaning: 'חתול', audioFile: '/audio/words/he/chatul.mp3' },
  { word: 'כלב', letters: ['כ', 'ל', 'ב'], meaning: 'כלב', audioFile: '/audio/words/he/kelev.mp3' },
  { word: 'עז', letters: ['ע', 'ז'], meaning: 'עז', audioFile: '/audio/words/he/ez.mp3' },
  { word: 'פרה', letters: ['פ', 'ר', 'ה'], meaning: 'פרה', audioFile: '/audio/words/he/para.mp3' },
  { word: 'צב', letters: ['צ', 'ב'], meaning: 'צב', audioFile: '/audio/words/he/tzav.mp3' },
  { word: 'ארי', letters: ['א', 'ר', 'י'], meaning: 'ארי', audioFile: '/audio/words/he/ari.mp3' },
  { word: 'דוב', letters: ['ד', 'ו', 'ב'], meaning: 'דוב', audioFile: '/audio/words/he/dov.mp3' },
  { word: 'זאב', letters: ['ז', 'א', 'ב'], meaning: 'זאב', audioFile: '/audio/words/he/zeev.mp3' },
  
  // Easy 3-letter words - Food & Nature
  { word: 'לחם', letters: ['ל', 'ח', 'ם'], meaning: 'לחם', audioFile: '/audio/words/he/lechem.mp3' },
  { word: 'מים', letters: ['מ', 'י', 'ם'], meaning: 'מים', audioFile: '/audio/words/he/mayim.mp3' },
  { word: 'שמש', letters: ['ש', 'מ', 'ש'], meaning: 'שמש', audioFile: '/audio/words/he/shemesh.mp3' },
  { word: 'ירח', letters: ['י', 'ר', 'ח'], meaning: 'ירח', audioFile: '/audio/words/he/yareach.mp3' },
  { word: 'עץ', letters: ['ע', 'ץ'], meaning: 'עץ', audioFile: '/audio/words/he/etz.mp3' },
  { word: 'פרח', letters: ['פ', 'ר', 'ח'], meaning: 'פרח', audioFile: '/audio/words/he/perach.mp3' },
  { word: 'דבש', letters: ['ד', 'ב', 'ש'], meaning: 'דבש', audioFile: '/audio/words/he/dvash.mp3' },
  { word: 'חלב', letters: ['ח', 'ל', 'ב'], meaning: 'חלב', audioFile: '/audio/words/he/chalav.mp3' },
  
  // Medium 3-4 letter words - Home & Objects
  { word: 'בית', letters: ['ב', 'י', 'ת'], meaning: 'בית', audioFile: '/audio/words/he/bayit.mp3' },
  { word: 'דלת', letters: ['ד', 'ל', 'ת'], meaning: 'דלת', audioFile: '/audio/words/he/delet.mp3' },
  { word: 'חלון', letters: ['ח', 'ל', 'ו', 'ן'], meaning: 'חלון', audioFile: '/audio/words/he/chalon.mp3' },
  { word: 'כסא', letters: ['כ', 'ס', 'א'], meaning: 'כסא', audioFile: '/audio/words/he/kise.mp3' },
  { word: 'שולחן', letters: ['ש', 'ו', 'ל', 'ח', 'ן'], meaning: 'שולחן', audioFile: '/audio/words/he/shulchan.mp3' },
  { word: 'מיטה', letters: ['מ', 'י', 'ט', 'ה'], meaning: 'מיטה', audioFile: '/audio/words/he/mita.mp3' },
  { word: 'ספר', letters: ['ס', 'פ', 'ר'], meaning: 'ספר', audioFile: '/audio/words/he/sefer.mp3' },
  { word: 'עפרון', letters: ['ע', 'פ', 'ר', 'ו', 'ן'], meaning: 'עפרון', audioFile: '/audio/words/he/iparon.mp3' },
  
  // Medium words - Body parts
  { word: 'עין', letters: ['ע', 'י', 'ן'], meaning: 'עין', audioFile: '/audio/words/he/ayin.mp3' },
  { word: 'אף', letters: ['א', 'ף'], meaning: 'אף', audioFile: '/audio/words/he/af.mp3' },
  { word: 'יד', letters: ['י', 'ד'], meaning: 'יד', audioFile: '/audio/words/he/yad.mp3' },
  { word: 'רגל', letters: ['ר', 'ג', 'ל'], meaning: 'רגל', audioFile: '/audio/words/he/regel.mp3' },
  { word: 'ראש', letters: ['ר', 'א', 'ש'], meaning: 'ראש', audioFile: '/audio/words/he/rosh.mp3' },
  { word: 'שיער', letters: ['ש', 'י', 'ע', 'ר'], meaning: 'שיער', audioFile: '/audio/words/he/sear.mp3' },
  
  // Medium words - Actions & Common words
  { word: 'אוכל', letters: ['א', 'ו', 'כ', 'ל'], meaning: 'אוכל', audioFile: '/audio/words/he/ochel.mp3' },
  { word: 'שותה', letters: ['ש', 'ו', 'ת', 'ה'], meaning: 'שותה', audioFile: '/audio/words/he/shote.mp3' },
  { word: 'ישן', letters: ['י', 'ש', 'ן'], meaning: 'ישן', audioFile: '/audio/words/he/yashen.mp3' },
  { word: 'קם', letters: ['ק', 'ם'], meaning: 'קם', audioFile: '/audio/words/he/kam.mp3' },
  { word: 'רץ', letters: ['ר', 'ץ'], meaning: 'רץ', audioFile: '/audio/words/he/ratz.mp3' },
  { word: 'הולך', letters: ['ה', 'ו', 'ל', 'ך'], meaning: 'הולך', audioFile: '/audio/words/he/holech.mp3' },
  
  // Medium words - Time & Weather
  { word: 'יום', letters: ['י', 'ו', 'ם'], meaning: 'יום', audioFile: '/audio/words/he/yom.mp3' },
  { word: 'לילה', letters: ['ל', 'י', 'ל', 'ה'], meaning: 'לילה', audioFile: '/audio/words/he/layla.mp3' },
  { word: 'בוקר', letters: ['ב', 'ו', 'ק', 'ר'], meaning: 'בוקר', audioFile: '/audio/words/he/boker.mp3' },
  { word: 'ערב', letters: ['ע', 'ר', 'ב'], meaning: 'ערב', audioFile: '/audio/words/he/erev.mp3' },
  { word: 'גשם', letters: ['ג', 'ש', 'ם'], meaning: 'גשם', audioFile: '/audio/words/he/geshem.mp3' },
  { word: 'רוח', letters: ['ר', 'ו', 'ח'], meaning: 'רוח', audioFile: '/audio/words/he/ruach.mp3' },
  
  // Medium words - Colors 
  { word: 'אדום', letters: ['א', 'ד', 'ו', 'ם'], meaning: 'אדום', audioFile: '/audio/words/he/adom.mp3' },
  { word: 'ירוק', letters: ['י', 'ר', 'ו', 'ק'], meaning: 'ירוק', audioFile: '/audio/words/he/yarok.mp3' },
  { word: 'כחול', letters: ['כ', 'ח', 'ו', 'ל'], meaning: 'כחול', audioFile: '/audio/words/he/kachol.mp3' },
  { word: 'צהוב', letters: ['צ', 'ה', 'ו', 'ב'], meaning: 'צהוב', audioFile: '/audio/words/he/tzahov.mp3' },
  { word: 'שחור', letters: ['ש', 'ח', 'ו', 'ר'], meaning: 'שחור', audioFile: '/audio/words/he/shachor.mp3' },
  { word: 'לבן', letters: ['ל', 'ב', 'ן'], meaning: 'לבן', audioFile: '/audio/words/he/lavan.mp3' },
  
  // Hard words - More complex
  { word: 'ילד', letters: ['י', 'ל', 'ד'], meaning: 'ילד', audioFile: '/audio/words/he/yeled.mp3' },
  { word: 'ילדה', letters: ['י', 'ל', 'ד', 'ה'], meaning: 'ילדה', audioFile: '/audio/words/he/yalda.mp3' },
  { word: 'מורה', letters: ['מ', 'ו', 'ר', 'ה'], meaning: 'מורה', audioFile: '/audio/words/he/mora.mp3' },
  { word: 'תלמיד', letters: ['ת', 'ל', 'מ', 'י', 'ד'], meaning: 'תלמיד', audioFile: '/audio/words/he/talmid.mp3' },
  { word: 'חבר', letters: ['ח', 'ב', 'ר'], meaning: 'חבר', audioFile: '/audio/words/he/chaver.mp3' },
  { word: 'חברה', letters: ['ח', 'ב', 'ר', 'ה'], meaning: 'חברה', audioFile: '/audio/words/he/chavera.mp3' },
  
  // Hard words - Fruits & Vegetables
  { word: 'תפוח', letters: ['ת', 'פ', 'ו', 'ח'], meaning: 'תפוח', audioFile: '/audio/words/he/tapuach.mp3' },
  { word: 'בננה', letters: ['ב', 'נ', 'נ', 'ה'], meaning: 'בננה', audioFile: '/audio/words/he/banana.mp3' },
  { word: 'תפוז', letters: ['ת', 'פ', 'ו', 'ז'], meaning: 'תפוז', audioFile: '/audio/words/he/tapuz.mp3' },
  { word: 'אבטיח', letters: ['א', 'ב', 'ט', 'י', 'ח'], meaning: 'אבטיח', audioFile: '/audio/words/he/avtiach.mp3' },
  { word: 'גזר', letters: ['ג', 'ז', 'ר'], meaning: 'גזר', audioFile: '/audio/words/he/gezer.mp3' },
  { word: 'עגבנייה', letters: ['ע', 'ג', 'ב', 'ן', 'י', 'ה'], meaning: 'עגבנייה', audioFile: '/audio/words/he/agvaniya.mp3' },
  
  // Hard words - Transportation
  { word: 'רכב', letters: ['ר', 'כ', 'ב'], meaning: 'רכב', audioFile: '/audio/words/he/rechev.mp3' },
  { word: 'אוטובוס', letters: ['א', 'ו', 'ט', 'ו', 'ב', 'ו', 'ס'], meaning: 'אוטובוס', audioFile: '/audio/words/he/autobus.mp3' },
  { word: 'רכבת', letters: ['ר', 'כ', 'ב', 'ת'], meaning: 'רכבת', audioFile: '/audio/words/he/rakevet.mp3' },
  { word: 'אופניים', letters: ['א', 'ו', 'פ', 'נ', 'י', 'ם'], meaning: 'אופניים', audioFile: '/audio/words/he/ofanayim.mp3' },
  { word: 'מטוס', letters: ['מ', 'ט', 'ו', 'ס'], meaning: 'מטוס', audioFile: '/audio/words/he/matos.mp3' },
  
  // Very Hard words - Challenging
  { word: 'משפחה', letters: ['מ', 'ש', 'פ', 'ח', 'ה'], meaning: 'משפחה', audioFile: '/audio/words/he/mishpacha.mp3' },
  { word: 'חתונה', letters: ['ח', 'ת', 'ו', 'נ', 'ה'], meaning: 'חתונה', audioFile: '/audio/words/he/chatuna.mp3' },
  { word: 'יום הולדת', letters: ['י', 'ו', 'ם', ' ', 'ה', 'ו', 'ל', 'ד', 'ת'], meaning: 'יום הולדת', audioFile: '/audio/words/he/yom-huledet.mp3' },
  { word: 'ספרייה', letters: ['ס', 'פ', 'ר', 'י', 'ה'], meaning: 'ספרייה', audioFile: '/audio/words/he/sifriya.mp3' },
  { word: 'חנות', letters: ['ח', 'נ', 'ו', 'ת'], meaning: 'חנות', audioFile: '/audio/words/he/chanut.mp3' },
  { word: 'בית ספר', letters: ['ב', 'י', 'ת', ' ', 'ס', 'פ', 'ר'], meaning: 'בית ספר', audioFile: '/audio/words/he/beit-sefer.mp3' },
  { word: 'מחשב', letters: ['מ', 'ח', 'ש', 'ב'], meaning: 'מחשב', audioFile: '/audio/words/he/machshev.mp3' },
  { word: 'טלפון', letters: ['ט', 'ל', 'פ', 'ו', 'ן'], meaning: 'טלפון', audioFile: '/audio/words/he/telefon.mp3' },
  { word: 'מקרר', letters: ['מ', 'ק', 'ר', 'ר'], meaning: 'מקרר', audioFile: '/audio/words/he/mekarer.mp3' },
  { word: 'טלוויזיה', letters: ['ט', 'ל', 'ו', 'ו', 'י', 'ז', 'י', 'ה'], meaning: 'טלוויזיה', audioFile: '/audio/words/he/televizya.mp3' },
  
  // More simple words for variety
  { word: 'בוקר', letters: ['ב', 'ו', 'ק', 'ר'], meaning: 'בוקר', audioFile: '/audio/words/he/boker.mp3' },
  { word: 'לילה', letters: ['ל', 'י', 'ל', 'ה'], meaning: 'לילה', audioFile: '/audio/words/he/layla.mp3' },
  { word: 'חום', letters: ['ח', 'ו', 'ם'], meaning: 'חום', audioFile: '/audio/words/he/chum.mp3' },
  { word: 'קר', letters: ['ק', 'ר'], meaning: 'קר', audioFile: '/audio/words/he/kar.mp3' },
  { word: 'גדול', letters: ['ג', 'ד', 'ו', 'ל'], meaning: 'גדול', audioFile: '/audio/words/he/gadol.mp3' },
  { word: 'קטן', letters: ['ק', 'ט', 'ן'], meaning: 'קטן', audioFile: '/audio/words/he/katan.mp3' },
  { word: 'טוב', letters: ['ט', 'ו', 'ב'], meaning: 'טוב', audioFile: '/audio/words/he/tov.mp3' },
  { word: 'רע', letters: ['ר', 'ע'], meaning: 'רע', audioFile: '/audio/words/he/ra.mp3' },
  { word: 'חדש', letters: ['ח', 'ד', 'ש'], meaning: 'חדש', audioFile: '/audio/words/he/chadash.mp3' },
  { word: 'ישן', letters: ['י', 'ש', 'ן'], meaning: 'ישן', audioFile: '/audio/words/he/yashan.mp3' },
];

// Game configuration
const WORDS_PER_GAME = 10;

// Get random selection of words for each game
const getRandomWords = (count: number): HebrewWord[] => {
  const shuffled = [...HEBREW_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

interface LetterCardProps {
  letter: string;
  isUsed: boolean;
  onClick: () => void;
  isInBuilt?: boolean;
  onRemove?: () => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter, isUsed, onClick, isInBuilt, onRemove }) => {
  return (
    <Box
      onClick={isInBuilt ? onRemove : onClick}
      sx={(theme) => ({
        cursor: isUsed && !isInBuilt ? 'default' : 'pointer',
        opacity: isUsed && !isInBuilt ? 0.4 : 1,
        position: 'relative',
        border: 'none',
        background: 'transparent',
        padding: '0',
        outlineOffset: '4px',
        transition: 'all 250ms ease',
        pointerEvents: isUsed && !isInBuilt ? 'none' : 'auto',
        '& .shadow': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: '#00000030',
          willChange: 'transform',
          transform: 'translateY(2px)',
          transition: 'transform 300ms cubic-bezier(.3, .7, .4, 1)',
        },
        '& .edge': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: isInBuilt 
            ? 'linear-gradient(to left, #1565c0 0%, #2196f3 8%, #2196f3 92%, #1565c0 100%)'
            : 'linear-gradient(to left, #388e3c 0%, #66bb6a 8%, #66bb6a 92%, #388e3c 100%)',
        },
        '& .front': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: theme.palette.colors.white,
          fontWeight: 'bold',
          fontSize: { xs: '28px', sm: '36px', md: '44px' },
          width: { xs: '60px', sm: '70px', md: '80px' },
          height: { xs: '60px', sm: '70px', md: '80px' },
          borderRadius: '12px',
          background: isInBuilt ? '#42a5f5' : '#81c784',
          willChange: 'transform',
          transform: 'translateY(-4px)',
          transition: 'transform 300ms cubic-bezier(.3, .7, .4, 1)',
          direction: 'rtl !important',
          unicodeBidi: 'bidi-override !important',
        },
        '&:hover': {
          filter: 'brightness(110%)',
          '& .front': {
            transform: 'translateY(-6px)',
            transition: 'transform 200ms cubic-bezier(.3, .7, .4, 1.5)',
          },
          '& .shadow': {
            transform: 'translateY(4px)',
            transition: 'transform 200ms cubic-bezier(.3, .7, .4, 1.5)',
          },
        },
        '&:active': {
          '& .front': {
            transform: 'translateY(-2px)',
            transition: 'transform 50ms',
          },
          '& .shadow': {
            transform: 'translateY(1px)',
            transition: 'transform 50ms',
          },
        },
      })}
    >
      <Box className="shadow" />
      <Box className="edge" />
      <Box className="front">
        {letter}
      </Box>
    </Box>
  );
};

const WordBuilderGamePage: React.FC = () => {
  const { t } = useTranslation();
  const [gameWords] = useState<HebrewWord[]>(() => getRandomWords(WORDS_PER_GAME));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [builtWord, setBuiltWord] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [usedLetterIndices, setUsedLetterIndices] = useState<Set<number>>(new Set());

  const currentWord = gameWords[currentWordIndex];

  const initializeGame = useCallback(() => {
    const word = gameWords[currentWordIndex];
    // Add some extra random Hebrew letters to make it more challenging
    const extraLetters = ['א', 'ה', 'ו', 'ר', 'ת', 'נ', 'ל', 'מ', 'ש', 'ק'];
    const availableLetters = [...word.letters];
    
    // Add 2-3 extra letters that aren't in the word
    const filteredExtra = extraLetters.filter(letter => !word.letters.includes(letter));
    const randomExtra = filteredExtra.slice(0, Math.min(3, Math.max(1, 8 - word.letters.length)));
    
    setShuffledLetters(shuffle([...availableLetters, ...randomExtra]));
    setBuiltWord([]);
    setIsCorrect(null);
    setUsedLetterIndices(new Set());
    
    // Play game start sound on first word, level up sound on subsequent words
    if (currentWordIndex === 0) {
      playSound(AudioSounds.GAME_START);
    } else {
      setTimeout(() => playSound(AudioSounds.TICK), 200);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleLetterClick = (letter: string, index: number) => {
    if (usedLetterIndices.has(index)) return;
    
    setBuiltWord(prev => [...prev, letter]);
    setUsedLetterIndices(prev => new Set([...Array.from(prev), index]));
    setIsCorrect(null);
    playSound(AudioSounds.LETTER_PICK);
  };

  const handleRemoveLetter = (indexToRemove: number) => {
    const letterToRemove = builtWord[indexToRemove];
    const originalIndex = shuffledLetters.findIndex((letter, idx) => 
      letter === letterToRemove && usedLetterIndices.has(idx)
    );
    
    setBuiltWord(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setUsedLetterIndices(prev => {
      const newSet = new Set(Array.from(prev));
      if (originalIndex !== -1) {
        newSet.delete(originalIndex);
      }
      return newSet;
    });
    setIsCorrect(null);
    playSound(AudioSounds.LETTER_REMOVE);
  };

  const checkWord = () => {
    const isWordCorrect = builtWord.join('') === currentWord.word;
    setIsCorrect(isWordCorrect);
    
    if (isWordCorrect) {
      setScore(prev => prev + 10);
      playSound(AudioSounds.WORD_COMPLETE);
      
      // Play word audio after a short delay
      setTimeout(() => {
        const audio = new Audio(currentWord.audioFile);
        audio.play().catch(() => {
          console.log('Audio file not found:', currentWord.audioFile);
        });
      }, 500);

      // Level up sound and progression
      setTimeout(() => {
        if (currentWordIndex < gameWords.length - 1) {
          playSound(AudioSounds.LEVEL_UP);
          setCurrentWordIndex(prev => prev + 1);
        } else {
          playSound(AudioSounds.CELEBRATION);
          setShowConfetti(true);
          setIsGameComplete(true);
        }
      }, 2500);
    } else {
      playSound(AudioSounds.WRONG_ANSWER);
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setIsGameComplete(false);
    setShowConfetti(false);
  };

  const clearBuiltWord = () => {
    setBuiltWord([]);
    setUsedLetterIndices(new Set());
    setIsCorrect(null);
    playSound(AudioSounds.WHOOSH);
  };

  return (
    <>
      <BackButton />
      
      {showConfetti && <Confetti />}
      
      <Box
        sx={{
          padding: { xs: 2, sm: 3 },
          maxWidth: '900px',
          margin: '0 auto',
          direction: 'rtl',
          minHeight: '100vh',
        }}
      >
        {/* Header with beautiful styling */}
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={(theme) => ({ 
              color: theme.palette.primary.light,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3
            })}
          >
            {t('games.buttons.wordBuilder')}
          </Typography>
          
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={3}
            sx={{ 
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              p: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {t('wordBuilder.score')}: {score}
            </Typography>
            
            <Box 
              sx={{ 
                background: 'linear-gradient(45deg, #f74572, #ff6b6b)',
                borderRadius: '20px',
                px: 3,
                py: 1
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                {currentWordIndex + 1} / {gameWords.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        {!isGameComplete ? (
          <>
            {/* Current Word Challenge - Beautiful Card */}
            <Paper 
              elevation={8} 
              sx={{ 
                p: 4, 
                mb: 4, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,248,250,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: 'primary.dark',
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }
                }}
              >
                {t('wordBuilder.buildWord')}: "{currentWord.meaning}"
              </Typography>
              
              {/* Built Word Display - Beautiful RTL Container */}
              <Box 
                sx={{ 
                  minHeight: '120px', 
                  border: isCorrect === true ? '3px solid #4caf50' : isCorrect === false ? '3px solid #f44336' : '3px dashed #ddd',
                  borderRadius: '15px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 2,
                  p: 3,
                  mb: 4,
                  background: isCorrect === true ? 'rgba(76, 175, 80, 0.1)' : isCorrect === false ? 'rgba(244, 67, 54, 0.1)' : 'rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                {builtWord.length === 0 ? (
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      opacity: 0.7
                    }}
                  >
                    {t('wordBuilder.selectLettersHere')}
                  </Typography>
                ) : (
                  builtWord.map((letter, index) => (
                    <LetterCard
                      key={index}
                      letter={letter}
                      isUsed={false}
                      onClick={() => {}}
                      isInBuilt={true}
                      onRemove={() => handleRemoveLetter(index)}
                    />
                  ))
                )}
              </Box>

              {/* Action Buttons with your FunButton style */}
              <Box display="flex" gap={3} justifyContent="center" mb={3}>
                <FunButton
                  text={t('wordBuilder.check')}
                  onClick={checkWord}
                  fontSize={20}
                  backgroundColor={builtWord.length === 0 ? '#ccc' : '#4caf50'}
                />
                
                <Box sx={{ position: 'relative' }}>
                  <RoundFunButton onClick={clearBuiltWord}>
                    <ClearIcon />
                  </RoundFunButton>
                </Box>
              </Box>

              {/* Feedback Messages */}
              {isCorrect === true && (
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'success.main', 
                    fontWeight: 'bold',
                    animation: 'bounce 0.5s ease',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {t('wordBuilder.correct')} ✨
                </Typography>
              )}
              {isCorrect === false && (
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'error.main', 
                    fontWeight: 'bold',
                    animation: 'shake 0.5s ease'
                  }}
                >
                  {t('wordBuilder.tryAgain')} 🤔
                </Typography>
              )}
            </Paper>

            {/* Available Letters - Beautiful Grid */}
            <Paper 
              elevation={6} 
              sx={{ 
                p: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,242,247,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                textAlign="center"
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                  mb: 3
                }}
              >
                {t('wordBuilder.availableLetters')}
              </Typography>
              
              <Grid container spacing={2} justifyContent="center">
                {shuffledLetters.map((letter, index) => (
                  <Grid item key={index}>
                    <LetterCard
                      letter={letter}
                      isUsed={usedLetterIndices.has(index)}
                      onClick={() => handleLetterClick(letter, index)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </>
        ) : (
          /* Game Complete Modal - Beautiful Design */
          <Modal open={isGameComplete} onClose={resetGame}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '500px',
                background: 'linear-gradient(135deg, #f74572 0%, #ff6b6b 100%)',
                borderRadius: '25px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                p: 4,
                textAlign: 'center',
                border: '3px solid rgba(255,255,255,0.2)'
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom 
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  mb: 3
                }}
              >
                🎉 {t('wordBuilder.gameComplete')} 🎉
              </Typography>
              
              <Box 
                sx={{ 
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '15px',
                  p: 3,
                  mb: 3
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  {t('wordBuilder.finalScore')}: {score}
                </Typography>
                
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  {t('wordBuilder.congratulations')}
                </Typography>
              </Box>
              
              <FunButton
                text={t('wordBuilder.playAgain')}
                onClick={resetGame}
                fontSize={24}
                backgroundColor="#4caf50"
              />
            </Box>
          </Modal>
        )}
      </Box>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}
      </style>
    </>
  );
};

export default WordBuilderGamePage;