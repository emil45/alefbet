import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface NumberConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFile: string;
  color: string;
}

const numbers: NumberConfig[] = [
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_1',
    translationKey: 'numbers.number_1',
    audioFile: 'one.mp3',
    color: '#FF5733',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_2',
    translationKey: 'numbers.number_2',
    audioFile: 'two.mp3',
    color: '#FF8D1A',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_3',
    translationKey: 'numbers.number_3',
    audioFile: 'three.mp3',
    color: '#FFC300',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_4',
    translationKey: 'numbers.number_4',
    audioFile: 'four.mp3',
    color: '#b5eb50',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_5',
    translationKey: 'numbers.number_5',
    audioFile: 'five.mp3',
    color: '#33FF57',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_6',
    translationKey: 'numbers.number_6',
    audioFile: 'six.mp3',
    color: '#1AFF8D',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_7',
    translationKey: 'numbers.number_7',
    audioFile: 'seven.mp3',
    color: '#33FFF7',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_8',
    translationKey: 'numbers.number_8',
    audioFile: 'eight.mp3',
    color: '#1A8DFF',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_9',
    translationKey: 'numbers.number_9',
    audioFile: 'nine.mp3',
    color: '#5733FF',
  },
  {
    type: ModelTypesEnum.NUMBERS,
    id: 'number_10',
    translationKey: 'numbers.number_10',
    audioFile: 'ten.mp3',
    color: '#8D1AFF',
  },
];

export default numbers;
