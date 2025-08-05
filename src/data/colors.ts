import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface ColorConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFiles: {
    he: string;
    en: string;
    ru?: string;
  };
  color: string;
}

const colors: ColorConfig[] = [
  {
    type: ModelTypesEnum.COLORS,
    id: 'red',
    translationKey: 'colors.red',
    audioFiles: { he: 'red.mp3', en: 'red.mp3' },
    color: 'red',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'green',
    translationKey: 'colors.green',
    audioFiles: { he: 'green.mp3', en: 'green.mp3' },
    color: 'green',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'blue',
    translationKey: 'colors.blue',
    audioFiles: { he: 'blue.mp3', en: 'blue.mp3' },
    color: 'blue',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'yellow',
    translationKey: 'colors.yellow',
    audioFiles: { he: 'yellow.mp3', en: 'yellow.mp3' },
    color: 'yellow',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'orange',
    translationKey: 'colors.orange',
    audioFiles: { he: 'orange.mp3', en: 'orange.mp3' },
    color: 'orange',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'cyan',
    translationKey: 'colors.cyan',
    audioFiles: { he: 'cyan.mp3', en: 'cyan.mp3' },
    color: 'cyan',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'brown',
    translationKey: 'colors.brown',
    audioFiles: { he: 'brown.mp3', en: 'brown.mp3' },
    color: 'brown',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'black',
    translationKey: 'colors.black',
    audioFiles: { he: 'black.mp3', en: 'black.mp3' },
    color: 'black',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'white',
    translationKey: 'colors.white',
    audioFiles: { he: 'white.mp3', en: 'white.mp3' },
    color: 'white',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'pink',
    translationKey: 'colors.pink',
    audioFiles: { he: 'pink.mp3', en: 'pink.mp3' },
    color: 'pink',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'purple',
    translationKey: 'colors.purple',
    audioFiles: { he: 'purple.mp3', en: 'purple.mp3' },
    color: 'purple',
  },
  {
    type: ModelTypesEnum.COLORS,
    id: 'gray',
    translationKey: 'colors.gray',
    audioFiles: { he: 'gray.mp3', en: 'gray.mp3' },
    color: 'gray',
  },
];

export default colors;
