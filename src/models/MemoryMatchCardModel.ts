import { ModelTypesEnum } from './ModelsTypesEnum';

export interface MemoryMatchCardModel {
  id: number;
  type: ModelTypesEnum;
  name: string;
  textColor: string;
  matched: boolean;
  element?: React.ReactNode;
}
