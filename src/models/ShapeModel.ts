import { ModelTypesEnum } from './ModelsTypesEnum';

export interface ShapeModel {
  type: ModelTypesEnum;
  shapeName: string;
  shapeHebrewName: string;
  soundFile: string;
  color: string;
  element: React.ReactNode;
}
