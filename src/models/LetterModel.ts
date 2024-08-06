import { ModelTypesEnum } from './ModelsTypesEnum';

export interface LetterModel {
  type: ModelTypesEnum;
  letterName: string;
  letterFullName: string;
  soundFile: string;
  color: string;
}
