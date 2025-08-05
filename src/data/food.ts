import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface FoodConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFiles: {
    he: string;
    en: string;
    ru?: string;
  };
  color: string;
  imageUrl: string;
}

const food: FoodConfig[] = [
  // Fruits
  {
    type: ModelTypesEnum.FOOD,
    id: 'apple',
    translationKey: 'food.apple',
    audioFiles: {
      he: 'apple.mp3',
      en: 'apple.mp3',
    },
    color: '#FF6B6B',
    imageUrl: '🍎',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'banana',
    translationKey: 'food.banana',
    audioFiles: {
      he: 'banana.mp3',
      en: 'banana.mp3',
    },
    color: '#FFD93D',
    imageUrl: '🍌',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'orange',
    translationKey: 'food.orange',
    audioFiles: {
      he: 'orange.mp3',
      en: 'orange.mp3',
    },
    color: '#FF8C42',
    imageUrl: '🍊',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'strawberry',
    translationKey: 'food.strawberry',
    audioFiles: {
      he: 'strawberry.mp3',
      en: 'strawberry.mp3',
    },
    color: '#FF6B9D',
    imageUrl: '🍓',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'grapes',
    translationKey: 'food.grapes',
    audioFiles: {
      he: 'grapes.mp3',
      en: 'grapes.mp3',
    },
    color: '#8E44AD',
    imageUrl: '🍇',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'watermelon',
    translationKey: 'food.watermelon',
    audioFiles: {
      he: 'watermelon.mp3',
      en: 'watermelon.mp3',
    },
    color: '#27AE60',
    imageUrl: '🍉',
  },

  // Vegetables
  {
    type: ModelTypesEnum.FOOD,
    id: 'carrot',
    translationKey: 'food.carrot',
    audioFiles: {
      he: 'carrot.mp3',
      en: 'carrot.mp3',
    },
    color: '#F39C12',
    imageUrl: '🥕',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'tomato',
    translationKey: 'food.tomato',
    audioFiles: {
      he: 'tomato.mp3',
      en: 'tomato.mp3',
    },
    color: '#E74C3C',
    imageUrl: '🍅',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'cucumber',
    translationKey: 'food.cucumber',
    audioFiles: {
      he: 'cucumber.mp3',
      en: 'cucumber.mp3',
    },
    color: '#27AE60',
    imageUrl: '🥒',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'pepper',
    translationKey: 'food.pepper',
    audioFiles: {
      he: 'pepper.mp3',
      en: 'pepper.mp3',
    },
    color: '#E67E22',
    imageUrl: '🌶️',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'broccoli',
    translationKey: 'food.broccoli',
    audioFiles: {
      he: 'broccoli.mp3',
      en: 'broccoli.mp3',
    },
    color: '#27AE60',
    imageUrl: '🥦',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'corn',
    translationKey: 'food.corn',
    audioFiles: {
      he: 'corn.mp3',
      en: 'corn.mp3',
    },
    color: '#F1C40F',
    imageUrl: '🌽',
  },

  // Dairy & Proteins
  {
    type: ModelTypesEnum.FOOD,
    id: 'bread',
    translationKey: 'food.bread',
    audioFiles: {
      he: 'bread.mp3',
      en: 'bread.mp3',
    },
    color: '#D4AC0D',
    imageUrl: '🍞',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'cheese',
    translationKey: 'food.cheese',
    audioFiles: {
      he: 'cheese.mp3',
      en: 'cheese.mp3',
    },
    color: '#F1C40F',
    imageUrl: '🧀',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'egg',
    translationKey: 'food.egg',
    audioFiles: {
      he: 'egg.mp3',
      en: 'egg.mp3',
    },
    color: '#F7DC6F',
    imageUrl: '🥚',
  },

  // Sweet Treats
  {
    type: ModelTypesEnum.FOOD,
    id: 'cookie',
    translationKey: 'food.cookie',
    audioFiles: {
      he: 'cookie.mp3',
      en: 'cookie.mp3',
    },
    color: '#D4AC0D',
    imageUrl: '🍪',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'icecream',
    translationKey: 'food.icecream',
    audioFiles: {
      he: 'icecream.mp3',
      en: 'icecream.mp3',
    },
    color: '#FFC0CB',
    imageUrl: '🍦',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'chocolate',
    translationKey: 'food.chocolate',
    audioFiles: {
      he: 'chocolate.mp3',
      en: 'chocolate.mp3',
    },
    color: '#8B4513',
    imageUrl: '🍫',
  },
];

export default food;
