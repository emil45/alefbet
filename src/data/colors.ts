import { ColorModel } from '../models/ColorModel';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';

const letters: ColorModel[] = [
  { type: ModelTypesEnum.COLORS, colorName: 'אדום', soundFile: '/colors/red.mp3', color: 'red' },
  { type: ModelTypesEnum.COLORS, colorName: 'ירוק', soundFile: '/colors/green.mp3', color: 'green' },
  { type: ModelTypesEnum.COLORS, colorName: 'כחול', soundFile: '/colors/blue.mp3', color: 'blue' },
  { type: ModelTypesEnum.COLORS, colorName: 'צהוב', soundFile: '/colors/yellow.mp3', color: 'yellow' },
  { type: ModelTypesEnum.COLORS, colorName: 'כתום', soundFile: '/colors/orange.mp3', color: 'orange' },
  { type: ModelTypesEnum.COLORS, colorName: 'תכלת', soundFile: '/colors/cyan.mp3', color: 'cyan' },
  { type: ModelTypesEnum.COLORS, colorName: 'חום', soundFile: '/colors/brown.mp3', color: 'brown' },
  { type: ModelTypesEnum.COLORS, colorName: 'שחור', soundFile: '/colors/black.mp3', color: 'black' },
  { type: ModelTypesEnum.COLORS, colorName: 'לבן', soundFile: '/colors/white.mp3', color: 'white' },
  { type: ModelTypesEnum.COLORS, colorName: 'ורוד', soundFile: '/colors/pink.mp3', color: 'pink' },
  { type: ModelTypesEnum.COLORS, colorName: 'סגול', soundFile: '/colors/purple.mp3', color: 'purple' },
  { type: ModelTypesEnum.COLORS, colorName: 'אפור', soundFile: '/colors/gray.mp3', color: 'gray' },
];

export default letters;
