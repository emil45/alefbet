import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface FoodConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFiles: {
    he: string;
    en: string;
  };
  color: string;
  imageUrl: string;
}

const food: FoodConfig[] = [
  // Fruits
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_1',
    translationKey: 'food.food_1',
    audioFiles: {
      he: 'apple.mp3',
      en: 'apple.mp3',
    },
    color: '#FF6B6B',
    imageUrl: '🍎',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_2',
    translationKey: 'food.food_2',
    audioFiles: {
      he: 'banana.mp3',
      en: 'banana.mp3',
    },
    color: '#FFE66D',
    imageUrl: '🍌',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_3',
    translationKey: 'food.food_3',
    audioFiles: {
      he: 'orange.mp3',
      en: 'orange.mp3',
    },
    color: '#FF8C42',
    imageUrl: '🍊',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_4',
    translationKey: 'food.food_4',
    audioFiles: {
      he: 'strawberry.mp3',
      en: 'strawberry.mp3',
    },
    color: '#FF69B4',
    imageUrl: '🍓',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_5',
    translationKey: 'food.food_5',
    audioFiles: {
      he: 'grapes.mp3',
      en: 'grapes.mp3',
    },
    color: '#9B59B6',
    imageUrl: '🍇',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_6',
    translationKey: 'food.food_6',
    audioFiles: {
      he: 'watermelon.mp3',
      en: 'watermelon.mp3',
    },
    color: '#2ECC71',
    imageUrl: '🍉',
  },
  // Vegetables
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_7',
    translationKey: 'food.food_7',
    audioFiles: {
      he: 'carrot.mp3',
      en: 'carrot.mp3',
    },
    color: '#E67E22',
    imageUrl: '🥕',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_8',
    translationKey: 'food.food_8',
    audioFiles: {
      he: 'tomato.mp3',
      en: 'tomato.mp3',
    },
    color: '#E74C3C',
    imageUrl: '🍅',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_9',
    translationKey: 'food.food_9',
    audioFiles: {
      he: 'cucumber.mp3',
      en: 'cucumber.mp3',
    },
    color: '#27AE60',
    imageUrl: '🥒',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_10',
    translationKey: 'food.food_10',
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
    id: 'food_11',
    translationKey: 'food.food_11',
    audioFiles: {
      he: 'bread.mp3',
      en: 'bread.mp3',
    },
    color: '#D2691E',
    imageUrl: '🍞',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_12',
    translationKey: 'food.food_12',
    audioFiles: {
      he: 'cheese.mp3',
      en: 'cheese.mp3',
    },
    color: '#FFD700',
    imageUrl: '🧀',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_13',
    translationKey: 'food.food_13',
    audioFiles: {
      he: 'egg.mp3',
      en: 'egg.mp3',
    },
    color: '#FFFACD',
    imageUrl: '🥚',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_14',
    translationKey: 'food.food_14',
    audioFiles: {
      he: 'milk.mp3',
      en: 'milk.mp3',
    },
    color: '#F8F8FF',
    imageUrl: '🥛',
  },
  // Sweet treats
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_15',
    translationKey: 'food.food_15',
    audioFiles: {
      he: 'cake.mp3',
      en: 'cake.mp3',
    },
    color: '#FFB6C1',
    imageUrl: '🍰',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_16',
    translationKey: 'food.food_16',
    audioFiles: {
      he: 'cookie.mp3',
      en: 'cookie.mp3',
    },
    color: '#DEB887',
    imageUrl: '🍪',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_17',
    translationKey: 'food.food_17',
    audioFiles: {
      he: 'ice_cream.mp3',
      en: 'ice_cream.mp3',
    },
    color: '#FFC0CB',
    imageUrl: '🍦',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'food_18',
    translationKey: 'food.food_18',
    audioFiles: {
      he: 'chocolate.mp3',
      en: 'chocolate.mp3',
    },
    color: '#8B4513',
    imageUrl: '🍫',
  },
];

export default food;
