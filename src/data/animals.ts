import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface AnimalConfig {
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

const animals: AnimalConfig[] = [
  // Farm Animals
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'cow',
    translationKey: 'animals.cow',
    audioFiles: {
      he: 'cow.mp3',
      en: 'cow.mp3',
    },
    color: '#8B4513',
    imageUrl: '🐄',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'pig',
    translationKey: 'animals.pig',
    audioFiles: {
      he: 'pig.mp3',
      en: 'pig.mp3',
    },
    color: '#FFC0CB',
    imageUrl: '🐷',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'sheep',
    translationKey: 'animals.sheep',
    audioFiles: {
      he: 'sheep.mp3',
      en: 'sheep.mp3',
    },
    color: '#F5F5DC',
    imageUrl: '🐑',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'chicken',
    translationKey: 'animals.chicken',
    audioFiles: {
      he: 'chicken.mp3',
      en: 'chicken.mp3',
    },
    color: '#FFD700',
    imageUrl: '🐔',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'horse',
    translationKey: 'animals.horse',
    audioFiles: {
      he: 'horse.mp3',
      en: 'horse.mp3',
    },
    color: '#8B4513',
    imageUrl: '🐎',
  },

  // Pets
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'dog',
    translationKey: 'animals.dog',
    audioFiles: {
      he: 'dog.mp3',
      en: 'dog.mp3',
    },
    color: '#8B4513',
    imageUrl: '🐶',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'cat',
    translationKey: 'animals.cat',
    audioFiles: {
      he: 'cat.mp3',
      en: 'cat.mp3',
    },
    color: '#FFA500',
    imageUrl: '🐱',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'bee',
    translationKey: 'animals.bee',
    audioFiles: {
      he: 'bee.mp3',
      en: 'bee.mp3',
    },
    color: '#FFD700',
    imageUrl: '🐝',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'goat',
    translationKey: 'animals.goat',
    audioFiles: {
      he: 'goat.mp3',
      en: 'goat.mp3',
    },
    color: '#D2B48C',
    imageUrl: '🐐',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'bird',
    translationKey: 'animals.bird',
    audioFiles: {
      he: 'bird.mp3',
      en: 'bird.mp3',
    },
    color: '#00BFFF',
    imageUrl: '🐦',
  },

  // Wild Animals
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'lion',
    translationKey: 'animals.lion',
    audioFiles: {
      he: 'lion.mp3',
      en: 'lion.mp3',
    },
    color: '#DAA520',
    imageUrl: '🦁',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'elephant',
    translationKey: 'animals.elephant',
    audioFiles: {
      he: 'elephant.mp3',
      en: 'elephant.mp3',
    },
    color: '#696969',
    imageUrl: '🐘',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'monkey',
    translationKey: 'animals.monkey',
    audioFiles: {
      he: 'monkey.mp3',
      en: 'monkey.mp3',
    },
    color: '#8B4513',
    imageUrl: '🐵',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'duck',
    translationKey: 'animals.duck',
    audioFiles: {
      he: 'duck.mp3',
      en: 'duck.mp3',
    },
    color: '#FFD700',
    imageUrl: '🦆',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'wolf',
    translationKey: 'animals.wolf',
    audioFiles: {
      he: 'wolf.mp3',
      en: 'wolf.mp3',
    },
    color: '#808080',
    imageUrl: '🐺',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'fox',
    translationKey: 'animals.fox',
    audioFiles: {
      he: 'fox.mp3',
      en: 'fox.mp3',
    },
    color: '#FF4500',
    imageUrl: '🦊',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'tiger',
    translationKey: 'animals.tiger',
    audioFiles: {
      he: 'tiger.mp3',
      en: 'tiger.mp3',
    },
    color: '#FF8C00',
    imageUrl: '🐅',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'cricket',
    translationKey: 'animals.cricket',
    audioFiles: {
      he: 'cricket.mp3',
      en: 'cricket.mp3',
    },
    color: '#228B22',
    imageUrl: '🦗',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'zebra',
    translationKey: 'animals.zebra',
    audioFiles: {
      he: 'zebra.mp3',
      en: 'zebra.mp3',
    },
    color: '#000000',
    imageUrl: '🦓',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'frog',
    translationKey: 'animals.frog',
    audioFiles: {
      he: 'frog.mp3',
      en: 'frog.mp3',
    },
    color: '#228B22',
    imageUrl: '🐸',
  },
];

export default animals;
