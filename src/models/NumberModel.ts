import { ModelTypesEnum } from './ModelsTypesEnum';

export interface NumberModel {
  type: ModelTypesEnum;
  numberName: string;
  numberLetter: string;
  soundFile: string;
  color: string;
}
