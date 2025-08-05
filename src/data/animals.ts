import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface AnimalConfig {
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

const animals: AnimalConfig[] = [
  // Farm Animals
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_1',
    translationKey: 'animals.animal_1',
    audioFiles: {
      he: 'cow.mp3',
      en: 'cow.mp3',
    },
    color: '#8B4513',
    imageUrl: '🐄',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_2',
    translationKey: 'animals.animal_2',
    audioFiles: {
      he: 'pig.mp3',
      en: 'pig.mp3',
    },
    color: '#FFC0CB',
    imageUrl: '🐷',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_3',
    translationKey: 'animals.animal_3',
    audioFiles: {
      he: 'sheep.mp3',
      en: 'sheep.mp3',
    },
    color: '#F5F5DC',
    imageUrl: '🐑',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_4',
    translationKey: 'animals.animal_4',
    audioFiles: {
      he: 'chicken.mp3',
      en: 'chicken.mp3',
    },
    color: '#FFD700',
    imageUrl: '🐔',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_5',
    translationKey: 'animals.animal_5',
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
    id: 'animal_6',
    translationKey: 'animals.animal_6',
    audioFiles: {
      he: 'dog.mp3',
      en: 'dog.mp3',
    },
    color: '#D2691E',
    imageUrl: '🐕',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_7',
    translationKey: 'animals.animal_7',
    audioFiles: {
      he: 'cat.mp3',
      en: 'cat.mp3',
    },
    color: '#808080',
    imageUrl: '🐈',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_8',
    translationKey: 'animals.animal_8',
    audioFiles: {
      he: 'rabbit.mp3',
      en: 'rabbit.mp3',
    },
    color: '#F5F5DC',
    imageUrl: '🐰',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_9',
    translationKey: 'animals.animal_9',
    audioFiles: {
      he: 'fish.mp3',
      en: 'fish.mp3',
    },
    color: '#4169E1',
    imageUrl: '🐠',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_10',
    translationKey: 'animals.animal_10',
    audioFiles: {
      he: 'bird.mp3',
      en: 'bird.mp3',
    },
    color: '#87CEEB',
    imageUrl: '🐦',
  },

  // Wild Animals
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_11',
    translationKey: 'animals.animal_11',
    audioFiles: {
      he: 'lion.mp3',
      en: 'lion.mp3',
    },
    color: '#DAA520',
    imageUrl: '🦁',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_12',
    translationKey: 'animals.animal_12',
    audioFiles: {
      he: 'elephant.mp3',
      en: 'elephant.mp3',
    },
    color: '#696969',
    imageUrl: '🐘',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_13',
    translationKey: 'animals.animal_13',
    audioFiles: {
      he: 'monkey.mp3',
      en: 'monkey.mp3',
    },
    color: '#8B4513',
    imageUrl: '🐵',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_14',
    translationKey: 'animals.animal_14',
    audioFiles: {
      he: 'bear.mp3',
      en: 'bear.mp3',
    },
    color: '#8B4513',
    imageUrl: '🐻',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_15',
    translationKey: 'animals.animal_15',
    audioFiles: {
      he: 'wolf.mp3',
      en: 'wolf.mp3',
    },
    color: '#696969',
    imageUrl: '🐺',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_16',
    translationKey: 'animals.animal_16',
    audioFiles: {
      he: 'fox.mp3',
      en: 'fox.mp3',
    },
    color: '#FF6347',
    imageUrl: '🦊',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_17',
    translationKey: 'animals.animal_17',
    audioFiles: {
      he: 'tiger.mp3',
      en: 'tiger.mp3',
    },
    color: '#FF8C00',
    imageUrl: '🐯',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_18',
    translationKey: 'animals.animal_18',
    audioFiles: {
      he: 'giraffe.mp3',
      en: 'giraffe.mp3',
    },
    color: '#DAA520',
    imageUrl: '🦒',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_19',
    translationKey: 'animals.animal_19',
    audioFiles: {
      he: 'zebra.mp3',
      en: 'zebra.mp3',
    },
    color: '#000000',
    imageUrl: '🦓',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'animal_20',
    translationKey: 'animals.animal_20',
    audioFiles: {
      he: 'frog.mp3',
      en: 'frog.mp3',
    },
    color: '#32CD32',
    imageUrl: '🐸',
  },
];

export default animals;
