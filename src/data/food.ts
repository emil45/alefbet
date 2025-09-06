import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface FoodConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFile: string;
  color: string;
  imageUrl: string;
}

const food: FoodConfig[] = [
  // Fruits
  {
    type: ModelTypesEnum.FOOD,
    id: 'apple',
    translationKey: 'food.apple',
    audioFile: 'apple.mp3',
    color: '#FF6B6B',
    imageUrl: '🍎',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'banana',
    translationKey: 'food.banana',
    audioFile: 'banana.mp3',
    color: '#FFD93D',
    imageUrl: '🍌',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'orange',
    translationKey: 'food.orange',
    audioFile: 'orange.mp3',
    color: '#FF8C42',
    imageUrl: '🍊',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'strawberry',
    translationKey: 'food.strawberry',
    audioFile: 'strawberry.mp3',
    color: '#FF6B9D',
    imageUrl: '🍓',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'grapes',
    translationKey: 'food.grapes',
    audioFile: 'grapes.mp3',
    color: '#8E44AD',
    imageUrl: '🍇',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'watermelon',
    translationKey: 'food.watermelon',
    audioFile: 'watermelon.mp3',
    color: '#27AE60',
    imageUrl: '🍉',
  },

  // Vegetables
  {
    type: ModelTypesEnum.FOOD,
    id: 'carrot',
    translationKey: 'food.carrot',
    audioFile: 'carrot.mp3',
    color: '#F39C12',
    imageUrl: '🥕',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'tomato',
    translationKey: 'food.tomato',
    audioFile: 'tomato.mp3',
    color: '#E74C3C',
    imageUrl: '🍅',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'cucumber',
    translationKey: 'food.cucumber',
    audioFile: 'cucumber.mp3',
    color: '#27AE60',
    imageUrl: '🥒',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'pepper',
    translationKey: 'food.pepper',
    audioFile: 'pepper.mp3',
    color: '#E67E22',
    imageUrl: '🌶️',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'broccoli',
    translationKey: 'food.broccoli',
    audioFile: 'broccoli.mp3',
    color: '#27AE60',
    imageUrl: '🥦',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'corn',
    translationKey: 'food.corn',
    audioFile: 'corn.mp3',
    color: '#F1C40F',
    imageUrl: '🌽',
  },

  // Dairy & Proteins
  {
    type: ModelTypesEnum.FOOD,
    id: 'bread',
    translationKey: 'food.bread',
    audioFile: 'bread.mp3',
    color: '#D4AC0D',
    imageUrl: '🍞',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'cheese',
    translationKey: 'food.cheese',
    audioFile: 'cheese.mp3',
    color: '#F1C40F',
    imageUrl: '🧀',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'egg',
    translationKey: 'food.egg',
    audioFile: 'egg.mp3',
    color: '#F7DC6F',
    imageUrl: '🥚',
  },

  // Sweet Treats
  {
    type: ModelTypesEnum.FOOD,
    id: 'cookie',
    translationKey: 'food.cookie',
    audioFile: 'cookie.mp3',
    color: '#D4AC0D',
    imageUrl: '🍪',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'icecream',
    translationKey: 'food.icecream',
    audioFile: 'icecream.mp3',
    color: '#FFC0CB',
    imageUrl: '🍦',
  },
  {
    type: ModelTypesEnum.FOOD,
    id: 'chocolate',
    translationKey: 'food.chocolate',
    audioFile: 'chocolate.mp3',
    color: '#8B4513',
    imageUrl: '🍫',
  },
];

export default food;
