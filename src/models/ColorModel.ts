import { ModelTypesEnum } from './ModelsTypesEnum';

export interface ColorModel {
  type: ModelTypesEnum;
  colorName: string;
  soundFile: string;
  color: string;
}
