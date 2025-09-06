import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface ColorConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFile: string;
  color: string;
}

const colors: ColorConfig[] = [
  {
    type: ModelTypesEnum.COLORS,
    id: 'red',
    translationKey: 'colors.red',
    audioFile: 'red.mp3',
    color: 'red',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'green',
    translationKey: 'colors.green',
    audioFile: 'green.mp3',
    color: 'green',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'blue',
    translationKey: 'colors.blue',
    audioFile: 'blue.mp3',
    color: 'blue',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'yellow',
    translationKey: 'colors.yellow',
    audioFile: 'yellow.mp3',
    color: 'yellow',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'orange',
    translationKey: 'colors.orange',
    audioFile: 'orange.mp3',
    color: 'orange',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'cyan',
    translationKey: 'colors.cyan',
    audioFile: 'cyan.mp3',
    color: 'cyan',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'brown',
    translationKey: 'colors.brown',
    audioFile: 'brown.mp3',
    color: 'brown',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'black',
    translationKey: 'colors.black',
    audioFile: 'black.mp3',
    color: 'black',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'white',
    translationKey: 'colors.white',
    audioFile: 'white.mp3',
    color: 'white',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'pink',
    translationKey: 'colors.pink',
    audioFile: 'pink.mp3',
    color: 'pink',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'purple',
    translationKey: 'colors.purple',
    audioFile: 'purple.mp3',
    color: 'purple',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'gray',
    translationKey: 'colors.gray',
    audioFile: 'gray.mp3',
    color: 'gray',
  },
];

export default colors;
