import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface ColorConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFiles: {
    he: string;
    en: string;
  };
  color: string;
}

const colors: ColorConfig[] = [
  { type: ModelTypesEnum.COLORS, id: 'color_1', translationKey: 'colors.color_1', audioFiles: { he: 'red.mp3', en: 'red.mp3' }, color: 'red' },
  { type: ModelTypesEnum.COLORS, id: 'color_2', translationKey: 'colors.color_2', audioFiles: { he: 'green.mp3', en: 'green.mp3' }, color: 'green' },
  { type: ModelTypesEnum.COLORS, id: 'color_3', translationKey: 'colors.color_3', audioFiles: { he: 'blue.mp3', en: 'blue.mp3' }, color: 'blue' },
  { type: ModelTypesEnum.COLORS, id: 'color_4', translationKey: 'colors.color_4', audioFiles: { he: 'yellow.mp3', en: 'yellow.mp3' }, color: 'yellow' },
  { type: ModelTypesEnum.COLORS, id: 'color_5', translationKey: 'colors.color_5', audioFiles: { he: 'orange.mp3', en: 'orange.mp3' }, color: 'orange' },
  { type: ModelTypesEnum.COLORS, id: 'color_6', translationKey: 'colors.color_6', audioFiles: { he: 'cyan.mp3', en: 'cyan.mp3' }, color: 'cyan' },
  { type: ModelTypesEnum.COLORS, id: 'color_7', translationKey: 'colors.color_7', audioFiles: { he: 'brown.mp3', en: 'brown.mp3' }, color: 'brown' },
  { type: ModelTypesEnum.COLORS, id: 'color_8', translationKey: 'colors.color_8', audioFiles: { he: 'black.mp3', en: 'black.mp3' }, color: 'black' },
  { type: ModelTypesEnum.COLORS, id: 'color_9', translationKey: 'colors.color_9', audioFiles: { he: 'white.mp3', en: 'white.mp3' }, color: 'white' },
  { type: ModelTypesEnum.COLORS, id: 'color_10', translationKey: 'colors.color_10', audioFiles: { he: 'pink.mp3', en: 'pink.mp3' }, color: 'pink' },
  { type: ModelTypesEnum.COLORS, id: 'color_11', translationKey: 'colors.color_11', audioFiles: { he: 'purple.mp3', en: 'purple.mp3' }, color: 'purple' },
  { type: ModelTypesEnum.COLORS, id: 'color_12', translationKey: 'colors.color_12', audioFiles: { he: 'gray.mp3', en: 'gray.mp3' }, color: 'gray' },
];

export default colors;
