import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface AnimalConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFile: string;
  color: string;
  imageUrl: string;
}

const animals: AnimalConfig[] = [
  // Farm Animals
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'cow',
    translationKey: 'animals.cow',
    audioFile: 'cow.mp3',
    color: '#8B4513',
    imageUrl: '🐄',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'pig',
    translationKey: 'animals.pig',
    audioFile: 'pig.mp3',
    color: '#FFC0CB',
    imageUrl: '🐷',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'sheep',
    translationKey: 'animals.sheep',
    audioFile: 'sheep.mp3',
    color: '#F5F5DC',
    imageUrl: '🐑',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'chicken',
    translationKey: 'animals.chicken',
    audioFile: 'chicken.mp3',
    color: '#FFD700',
    imageUrl: '🐔',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'horse',
    translationKey: 'animals.horse',
    audioFile: 'horse.mp3',
    color: '#8B4513',
    imageUrl: '🐎',
  },

  // Pets
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'dog',
    translationKey: 'animals.dog',
    audioFile: 'dog.mp3',
    color: '#8B4513',
    imageUrl: '🐶',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'cat',
    translationKey: 'animals.cat',
    audioFile: 'cat.mp3',
    color: '#FFA500',
    imageUrl: '🐱',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'bee',
    translationKey: 'animals.bee',
    audioFile: 'bee.mp3',
    color: '#FFD700',
    imageUrl: '🐝',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'goat',
    translationKey: 'animals.goat',
    audioFile: 'goat.mp3',
    color: '#D2B48C',
    imageUrl: '🐐',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'bird',
    translationKey: 'animals.bird',
    audioFile: 'bird.mp3',
    color: '#00BFFF',
    imageUrl: '🐦',
  },

  // Wild Animals
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'lion',
    translationKey: 'animals.lion',
    audioFile: 'lion.mp3',
    color: '#DAA520',
    imageUrl: '🦁',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'elephant',
    translationKey: 'animals.elephant',
    audioFile: 'elephant.mp3',
    color: '#696969',
    imageUrl: '🐘',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'monkey',
    translationKey: 'animals.monkey',
    audioFile: 'monkey.mp3',
    color: '#8B4513',
    imageUrl: '🐵',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'duck',
    translationKey: 'animals.duck',
    audioFile: 'duck.mp3',
    color: '#FFD700',
    imageUrl: '🦆',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'wolf',
    translationKey: 'animals.wolf',
    audioFile: 'wolf.mp3',
    color: '#808080',
    imageUrl: '🐺',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'fox',
    translationKey: 'animals.fox',
    audioFile: 'fox.mp3',
    color: '#FF4500',
    imageUrl: '🦊',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'tiger',
    translationKey: 'animals.tiger',
    audioFile: 'tiger.mp3',
    color: '#FF8C00',
    imageUrl: '🐅',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'cricket',
    translationKey: 'animals.cricket',
    audioFile: 'cricket.mp3',
    color: '#228B22',
    imageUrl: '🦗',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'zebra',
    translationKey: 'animals.zebra',
    audioFile: 'zebra.mp3',
    color: '#000000',
    imageUrl: '🦓',
  },
  {
    type: ModelTypesEnum.ANIMALS,
    id: 'frog',
    translationKey: 'animals.frog',
    audioFile: 'frog.mp3',
    color: '#228B22',
    imageUrl: '🐸',
  },
];

export default animals;
