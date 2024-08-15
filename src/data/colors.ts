import { ColorModel } from '../models/ColorModel';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';

const letters: ColorModel[] = [
  { type: ModelTypesEnum.COLORS, colorName: 'אדום', soundFile: '/audio/colors/he/red.mp3', color: 'red' },
  { type: ModelTypesEnum.COLORS, colorName: 'ירוק', soundFile: '/audio/colors/he/green.mp3', color: 'green' },
  { type: ModelTypesEnum.COLORS, colorName: 'כחול', soundFile: '/audio/colors/he/blue.mp3', color: 'blue' },
  { type: ModelTypesEnum.COLORS, colorName: 'צהוב', soundFile: '/audio/colors/he/yellow.mp3', color: 'yellow' },
  { type: ModelTypesEnum.COLORS, colorName: 'כתום', soundFile: '/audio/colors/he/orange.mp3', color: 'orange' },
  { type: ModelTypesEnum.COLORS, colorName: 'תכלת', soundFile: '/audio/colors/he/cyan.mp3', color: 'cyan' },
  { type: ModelTypesEnum.COLORS, colorName: 'חום', soundFile: '/audio/colors/he/brown.mp3', color: 'brown' },
  { type: ModelTypesEnum.COLORS, colorName: 'שחור', soundFile: '/audio/colors/he/black.mp3', color: 'black' },
  { type: ModelTypesEnum.COLORS, colorName: 'לבן', soundFile: '/audio/colors/he/white.mp3', color: 'white' },
  { type: ModelTypesEnum.COLORS, colorName: 'ורוד', soundFile: '/audio/colors/he/pink.mp3', color: 'pink' },
  { type: ModelTypesEnum.COLORS, colorName: 'סגול', soundFile: '/audio/colors/he/purple.mp3', color: 'purple' },
  { type: ModelTypesEnum.COLORS, colorName: 'אפור', soundFile: '/audio/colors/he/gray.mp3', color: 'gray' },
];

export default letters;
