'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, Chip, Button, keyframes } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { useWordCollectionContext } from '@/contexts/WordCollectionContext';
import { HEBREW_WORDS, HebrewWord } from '@/data/hebrewWords';

// Animations
const sparkle = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

type FilterType = 'all' | 'recent' | 'new' | 'easy' | 'medium' | 'hard' | string;

// Category colors for visual variety
const CATEGORY_COLORS: Record<string, string> = {
  basic: '#FF6B9D',
  family: '#FF8C42',
  animals: '#4ECDC4',
  food: '#FFD93D',
  weather: '#45B7D1',
  nature: '#6BCB77',
  body: '#C9B1FF',
  questions: '#FF6B6B',
  objects: '#4ECDC4',
  actions: '#FF8C42',
  locations: '#45B7D1',
  colors: '#FF6B9D',
  numbers: '#FFD93D',
  adjectives: '#9B59B6',
  time: '#3498DB',
  toys: '#FF6B9D',
  manners: '#FFD93D',
  greetings: '#4ECDC4',
  professions: '#45B7D1',
  social: '#FF8C42',
  celebration: '#FF6B9D',
  places: '#6BCB77',
  technology: '#3498DB',
  appliances: '#9B59B6',
  emotions: '#FF6B6B',
};

// Difficulty colors
const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#6BCB77',
  medium: '#FFD93D',
  hard: '#FF6B6B',
};

interface WordCardProps {
  word: HebrewWord;
  isCollected: boolean;
  timesBuilt?: number;
  isNew?: boolean;
}

function WordCard({ word, isCollected, timesBuilt = 0, isNew = false }: WordCardProps) {
  const t = useTranslations('myWords');
  const categoryColor = CATEGORY_COLORS[word.category] || '#FF6B9D';
  const difficultyColor = DIFFICULTY_COLORS[word.difficulty] || '#FFD93D';

  if (!isCollected) {
    // Locked/uncollected word
    return (
      <Box
        sx={{
          width: { xs: '140px', sm: '160px' },
          height: { xs: '140px', sm: '160px' },
          borderRadius: '20px',
          backgroundColor: 'rgba(0,0,0,0.05)',
          border: '2px dashed #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.6,
        }}
      >
        <Typography sx={{ fontSize: '32px', filter: 'grayscale(1)', opacity: 0.4 }}>
          ?
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            color: '#999',
            mt: 1,
            textAlign: 'center',
            px: 1,
          }}
        >
          {word.meaning}
        </Typography>
      </Box>
    );
  }

  // Collected word
  return (
    <Box
      sx={{
        width: { xs: '140px', sm: '160px' },
        height: { xs: '140px', sm: '160px' },
        borderRadius: '20px',
        backgroundColor: 'white',
        border: `3px solid ${categoryColor}`,
        boxShadow: `0 4px 20px ${categoryColor}40`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: isNew ? `${float} 2s ease-in-out infinite` : undefined,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: `0 8px 30px ${categoryColor}60`,
        },
        // Gradient shine effect
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '200%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
          animation: isNew ? `${shimmer} 3s ease-in-out infinite` : undefined,
        },
      }}
    >
      {/* New badge */}
      {isNew && (
        <Box
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: '#FF6B6B',
            color: 'white',
            fontSize: '0.6rem',
            fontWeight: 700,
            px: 1,
            py: 0.3,
            borderRadius: '8px',
            animation: `${sparkle} 1.5s ease-in-out infinite`,
          }}
        >
          {t('card.new')}
        </Box>
      )}

      {/* Difficulty indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: difficultyColor,
          boxShadow: `0 2px 4px ${difficultyColor}60`,
        }}
      />

      {/* Hebrew word */}
      <Typography
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem' },
          fontWeight: 700,
          color: categoryColor,
          textShadow: `2px 2px 0 ${categoryColor}20`,
          lineHeight: 1,
        }}
      >
        {word.word}
      </Typography>

      {/* Meaning */}
      <Typography
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.85rem' },
          color: '#666',
          mt: 0.5,
          fontWeight: 500,
        }}
      >
        {word.meaning}
      </Typography>

      {/* Times built indicator */}
      {timesBuilt > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
          }}
        >
          {Array.from({ length: Math.min(timesBuilt, 5) }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: categoryColor,
                opacity: 0.7,
              }}
            />
          ))}
          {timesBuilt > 5 && (
            <Typography sx={{ fontSize: '0.6rem', color: categoryColor, fontWeight: 600 }}>
              +{timesBuilt - 5}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default function MyWordsContent() {
  const t = useTranslations('myWords');
  const router = useRouter();
  const {
    collectedWordsWithData,
    uniqueWordsCollected,
    totalAvailableWords,
    getRecentlyCollected,
    getNewWords,
    availableCategories,
    getCollectedCountInCategory,
    hasStorageError,
  } = useWordCollectionContext();

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const newWords = useMemo(() => getNewWords(), [getNewWords]);

  const filteredWords = useMemo(() => {
    switch (activeFilter) {
      case 'all':
        return HEBREW_WORDS;
      case 'recent':
        return getRecentlyCollected(20).map((w) => w.word);
      case 'new':
        return newWords.map((w) => w.word);
      case 'easy':
      case 'medium':
      case 'hard':
        return HEBREW_WORDS.filter((w) => w.difficulty === activeFilter);
      default:
        return HEBREW_WORDS.filter((w) => w.category === activeFilter);
    }
  }, [activeFilter, getRecentlyCollected, newWords]);

  const collectedMap = useMemo(() => {
    const map = new Map<string, { timesBuilt: number; isNew: boolean }>();
    for (const item of collectedWordsWithData) {
      const wordId = `${item.word.category}_${item.word.word}`;
      map.set(wordId, {
        timesBuilt: item.timesBuilt,
        isNew: item.timesBuilt === 1,
      });
    }
    return map;
  }, [collectedWordsWithData]);

  // Difficulty filters
  const difficultyFilters: FilterType[] = ['easy', 'medium', 'hard'];

  // Empty state
  if (uniqueWordsCollected === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          pb: 6,
        }}
      >
        <BackButton />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: '80px', mb: 2 }}>📚</Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#5d4037',
              mb: 1,
            }}
          >
            {t('empty')}
          </Typography>
          <Typography
            sx={{
              color: '#8d6e63',
              mb: 3,
            }}
          >
            {t('emptyHint')}
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/games/word-builder')}
            sx={{
              backgroundColor: '#FF6B9D',
              borderRadius: '20px',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(255, 107, 157, 0.4)',
              '&:hover': {
                backgroundColor: '#FF5189',
                transform: 'scale(1.05)',
              },
            }}
          >
            {t('playWordBuilder')}
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        pb: 6,
      }}
    >
      {/* Header */}
      <BackButton />

      {/* Title Section */}
      <Box
        sx={{
          textAlign: 'center',
          px: 2,
          pt: { xs: 1, sm: 2 },
          pb: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 0.5,
          }}
        >
          <Box sx={{ fontSize: { xs: '24px', sm: '32px' }, animation: `${sparkle} 2s ease-in-out infinite` }}>
            📚
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FF6B9D 0%, #FFD93D 50%, #4ECDC4 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.6rem', sm: '2.2rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {t('title')}
          </Typography>
          <Box sx={{ fontSize: { xs: '24px', sm: '32px' }, animation: `${sparkle} 2s ease-in-out infinite` }}>
            ✨
          </Box>
        </Box>

        {/* Progress indicator */}
        <Typography
          sx={{
            color: '#8d6e63',
            fontWeight: 500,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 0.5,
          }}
        >
          {t('collected', { count: uniqueWordsCollected, total: totalAvailableWords })}
        </Typography>

        {/* Progress bar */}
        <Box
          sx={{
            width: '200px',
            height: '8px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
            mx: 'auto',
            mt: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: `${(uniqueWordsCollected / totalAvailableWords) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF6B9D, #FFD93D, #4ECDC4)',
              borderRadius: '4px',
              transition: 'width 0.5s ease',
            }}
          />
        </Box>

        {hasStorageError && (
          <Typography
            sx={{
              color: '#FF6B6B',
              fontSize: '0.75rem',
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            <span>⚠️</span>
            {t('storageError')}
          </Typography>
        )}
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          px: 2,
          pb: 2,
        }}
      >
        {/* Main filters */}
        <Chip
          label={t('filters.all')}
          onClick={() => setActiveFilter('all')}
          sx={{
            backgroundColor: activeFilter === 'all' ? '#FF6B9D' : 'rgba(255,255,255,0.7)',
            color: activeFilter === 'all' ? 'white' : '#666',
            fontWeight: 600,
            '&:hover': { backgroundColor: activeFilter === 'all' ? '#FF5189' : 'rgba(255,255,255,0.9)' },
          }}
        />
        <Chip
          label={`${t('filters.recent')}`}
          onClick={() => setActiveFilter('recent')}
          sx={{
            backgroundColor: activeFilter === 'recent' ? '#45B7D1' : 'rgba(255,255,255,0.7)',
            color: activeFilter === 'recent' ? 'white' : '#666',
            fontWeight: 600,
            '&:hover': { backgroundColor: activeFilter === 'recent' ? '#3AA3BD' : 'rgba(255,255,255,0.9)' },
          }}
        />
        {newWords.length > 0 && (
          <Chip
            label={`${t('filters.new')} (${newWords.length})`}
            onClick={() => setActiveFilter('new')}
            sx={{
              backgroundColor: activeFilter === 'new' ? '#FF6B6B' : 'rgba(255,255,255,0.7)',
              color: activeFilter === 'new' ? 'white' : '#666',
              fontWeight: 600,
              animation: `${sparkle} 2s ease-in-out infinite`,
              '&:hover': { backgroundColor: activeFilter === 'new' ? '#FF5252' : 'rgba(255,255,255,0.9)' },
            }}
          />
        )}
      </Box>

      {/* Difficulty filters */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 0.75,
          px: 2,
          pb: 1,
        }}
      >
        {difficultyFilters.map((diff) => (
          <Chip
            key={diff}
            label={t(`difficulties.${diff}`)}
            size="small"
            onClick={() => setActiveFilter(diff)}
            sx={{
              backgroundColor: activeFilter === diff ? DIFFICULTY_COLORS[diff] : 'transparent',
              color: activeFilter === diff ? 'white' : DIFFICULTY_COLORS[diff],
              border: `2px solid ${DIFFICULTY_COLORS[diff]}`,
              fontWeight: 600,
              fontSize: '0.75rem',
              '&:hover': {
                backgroundColor: DIFFICULTY_COLORS[diff],
                color: 'white',
              },
            }}
          />
        ))}
      </Box>

      {/* Category filters - scrollable */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 0.75,
          px: 2,
          pb: 2,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {availableCategories.map((cat) => {
          const count = getCollectedCountInCategory(cat);
          const total = HEBREW_WORDS.filter((w) => w.category === cat).length;
          return (
            <Chip
              key={cat}
              label={`${t(`categories.${cat}`, { defaultValue: cat })} ${count}/${total}`}
              size="small"
              onClick={() => setActiveFilter(cat)}
              sx={{
                flexShrink: 0,
                backgroundColor: activeFilter === cat ? (CATEGORY_COLORS[cat] || '#FF6B9D') : 'rgba(255,255,255,0.7)',
                color: activeFilter === cat ? 'white' : '#666',
                fontWeight: 500,
                fontSize: '0.7rem',
                '&:hover': {
                  backgroundColor: CATEGORY_COLORS[cat] || '#FF6B9D',
                  color: 'white',
                },
              }}
            />
          );
        })}
      </Box>

      {/* Words Grid */}
      <Box
        sx={{
          flex: 1,
          mx: 'auto',
          px: { xs: 1, sm: 3 },
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderRadius: { xs: '24px', sm: '32px' },
            padding: { xs: 2, sm: 3 },
            minHeight: { xs: '300px', sm: '400px' },
            boxShadow: `
              0 4px 6px rgba(0,0,0,0.05),
              0 10px 40px rgba(0,0,0,0.08),
              inset 0 0 0 1px rgba(255,255,255,0.8)
            `,
          }}
        >
          {/* Words display */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 2, sm: 3 },
            }}
          >
            {filteredWords.map((word) => {
              const wordId = `${word.category}_${word.word}`;
              const collectionData = collectedMap.get(wordId);
              return (
                <WordCard
                  key={`${word.category}_${word.word}`}
                  word={word}
                  isCollected={!!collectionData}
                  timesBuilt={collectionData?.timesBuilt}
                  isNew={collectionData?.isNew}
                />
              );
            })}
          </Box>

          {filteredWords.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
              }}
            >
              <Typography sx={{ color: '#999' }}>
                {activeFilter === 'new' ? t('noNewWords') : t('noWordsInCategory')}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
