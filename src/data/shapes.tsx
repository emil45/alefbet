import React from 'react';
import { ShapeModel } from '../models/ShapeModel';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';

const shapes: ShapeModel[] = [
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'circle',
    shapeHebrewName: 'עיגול',
    soundFile: '/shapes/circle.mp3',
    color: 'red',
    element: <circle cx="12" cy="12" r="10" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'cone',
    shapeHebrewName: 'חרוט',
    soundFile: '/shapes/cone.mp3',
    color: 'green',
    element: (
      <>
        <polygon points="12,2 22,22 2,22" />
        <ellipse cx="12" cy="22" rx="10" ry="3" />
      </>
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'cylinder',
    shapeHebrewName: 'גליל',
    soundFile: '/shapes/cylinder.mp3',
    color: 'blue',
    element: (
      <g>
        <ellipse cx="12" cy="6" rx="10" ry="3" />
        <rect x="2" y="6" width="20" height="14" />
        <ellipse cx="12" cy="20" rx="10" ry="3" />
      </g>
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'ellipse',
    shapeHebrewName: 'אליפסה',
    soundFile: '/shapes/ellipse.mp3',
    color: '#f7dc6f',
    element: <ellipse cx="12" cy="12" rx="10" ry="6" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'heart',
    shapeHebrewName: 'לב',
    soundFile: '/shapes/heart.mp3',
    color: 'orange',
    element: (
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'hexagon',
    shapeHebrewName: 'משושה',
    soundFile: '/shapes/hexagon.mp3',
    color: 'cyan',
    element: <polygon points="12 2, 20 7, 20 17, 12 22, 4 17, 4 7" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'kite',
    shapeHebrewName: 'דלתון',
    soundFile: '/shapes/kite.mp3',
    color: 'brown',
    element: <polygon points="12 2, 20 9, 12 24, 4 9" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'moon',
    shapeHebrewName: 'ירח',
    soundFile: '/shapes/moon.mp3',
    color: 'black',
    element: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.37 0 2.67-0.27 3.88-0.75-2.35-1.37-4-3.87-4-6.75 0-3.5 2.57-6.4 6-7.5-0.83-1.63-2.23-3-4-3z" />
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'pentagon',
    shapeHebrewName: 'מחומש',
    soundFile: '/shapes/pentagon.mp3',
    color: 'white',
    element: <polygon points="12 2, 22 10, 18 22, 6 22, 2 10" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'pyramid',
    shapeHebrewName: 'פירמידה',
    soundFile: '/shapes/pyramid.mp3',
    color: 'pink',
    element: <polygon points="12 2, 22 22, 2 22" />, // Simplified 2D representation
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'rectangle',
    shapeHebrewName: 'מלבן',
    soundFile: '/shapes/rectangle.mp3',
    color: 'purple',
    element: <rect x="2" y="5" width="20" height="14" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'rhombus',
    shapeHebrewName: 'מעוין',
    soundFile: '/shapes/rhombus.mp3',
    color: 'gray',
    element: <polygon points="12 0, 22 12, 12 24, 2 12" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'square',
    shapeHebrewName: 'ריבוע',
    soundFile: '/shapes/square.mp3',
    color: 'lightBlue',
    element: <rect x="2" y="4" width="20" height="20" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'star',
    shapeHebrewName: 'כוכב',
    soundFile: '/shapes/star.mp3',
    color: 'lightCoral',
    element: <polygon points="12,2 14.85,8.47 22,9.24 17,14.14 18.18,21 12,17.27 5.82,21 7,14.14 2,9.24 9.15,8.47" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'triangle',
    shapeHebrewName: 'משולש',
    soundFile: '/shapes/triangle.mp3',
    color: 'teal',
    element: <polygon points="12 2, 22 22, 2 22" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'wave',
    shapeHebrewName: 'גל',
    soundFile: '/shapes/wave.mp3',
    color: 'olive',
    element: <path d="M0 20 Q 10 10, 20 20 T 40 20 T 60 20 T 80 20 T 100 20" />,
  },
];

export default shapes;
