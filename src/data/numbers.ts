import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface NumberConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFiles: {
    he: string;
    en: string;
  };
  color: string;
}

const numbers: NumberConfig[] = [
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_1',
    translationKey: 'numbers.number_1',
    audioFiles: {
      he: 'one.mp3',
      en: 'one.mp3'
    },
    color: '#FF5733',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_2',
    translationKey: 'numbers.number_2',
    audioFiles: {
      he: 'two.mp3',
      en: 'two.mp3'
    },
    color: '#FF8D1A',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_3',
    translationKey: 'numbers.number_3',
    audioFiles: {
      he: 'three.mp3',
      en: 'three.mp3'
    },
    color: '#FFC300',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_4',
    translationKey: 'numbers.number_4',
    audioFiles: {
      he: 'four.mp3',
      en: 'four.mp3'
    },
    color: '#b5eb50',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_5',
    translationKey: 'numbers.number_5',
    audioFiles: {
      he: 'five.mp3',
      en: 'five.mp3'
    },
    color: '#33FF57',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_6',
    translationKey: 'numbers.number_6',
    audioFiles: {
      he: 'six.mp3',
      en: 'six.mp3'
    },
    color: '#1AFF8D',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_7',
    translationKey: 'numbers.number_7',
    audioFiles: {
      he: 'seven.mp3',
      en: 'seven.mp3'
    },
    color: '#33FFF7',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_8',
    translationKey: 'numbers.number_8',
    audioFiles: {
      he: 'eight.mp3',
      en: 'eight.mp3'
    },
    color: '#1A8DFF',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_9',
    translationKey: 'numbers.number_9',
    audioFiles: {
      he: 'nine.mp3',
      en: 'nine.mp3'
    },
    color: '#5733FF',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_10',
    translationKey: 'numbers.number_10',
    audioFiles: {
      he: 'ten.mp3',
      en: 'ten.mp3'
    },
    color: '#8D1AFF',
  },
];

export default numbers;
