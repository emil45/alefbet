import { ShapeModel } from '../models/ShapeModel';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';

const shapes: ShapeModel[] = [
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'circle',
    shapeHebrewName: 'עיגול',
    soundFile: '/audio/shapes/he/circle.mp3',
    color: '#eb4747',
    element: <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'square',
    shapeHebrewName: 'ריבוע',
    soundFile: '/audio/shapes/he/square.mp3',
    color: '#68d3ee',
    element: <rect x="2" y="3" width="20" height="20" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'heart',
    shapeHebrewName: 'לב',
    soundFile: '/audio/shapes/he/heart.mp3',
    color: 'darkorange',
    element: (
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="black"
        strokeWidth="0.1"
      />
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'ellipse',
    shapeHebrewName: 'אליפסה',
    soundFile: '/audio/shapes/he/ellipse.mp3',
    color: '#f7dc6f',
    element: <ellipse cx="12" cy="14" rx="12" ry="8" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'rectangle',
    shapeHebrewName: 'מלבן',
    soundFile: '/audio/shapes/he/rectangle.mp3',
    color: 'purple',
    element: <rect x="2" y="5" width="20" height="14" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'star',
    shapeHebrewName: 'כוכב',
    soundFile: '/audio/shapes/he/star.mp3',
    color: 'lightCoral',
    element: (
      <polygon
        points="12,2 14.85,8.47 22,9.24 17,14.14 18.18,21 12,17.27 5.82,21 7,14.14 2,9.24 9.15,8.47"
        stroke="black"
        strokeWidth="0.1"
      />
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'triangle',
    shapeHebrewName: 'משולש',
    soundFile: '/audio/shapes/he/triangle.mp3',
    color: 'teal',
    element: <polygon points="12 2, 22 22, 2 22" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'cone',
    shapeHebrewName: 'חרוט',
    soundFile: '/audio/shapes/he/cone.mp3',
    color: 'lightgreen',
    element: (
      <>
        <polygon points="12 2, 20 19.9, 4 19.9" stroke="black" strokeWidth="0.2" />
        <ellipse cx="12" cy="20" rx="8" ry="2.5" stroke="black" strokeWidth="0.2" />
      </>
    ),
  },

  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'hexagon',
    shapeHebrewName: 'משושה',
    soundFile: '/audio/shapes/he/hexagon.mp3',
    color: '#88b7b7',
    element: <polygon points="12 2, 20 7, 20 17, 12 22, 4 17, 4 7" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'kite',
    shapeHebrewName: 'דלתון',
    soundFile: '/audio/shapes/he/kite.mp3',
    color: 'brown',
    element: <polygon points="12 2, 20 9, 12 24, 4 9" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'moon',
    shapeHebrewName: 'ירח',
    soundFile: '/audio/shapes/he/moon.mp3',
    color: '#f3b817',
    element: (
      <>
        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="0.1" />
        <circle cx="18" cy="12" r="10" fill="#f5ede1" />
      </>
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'pentagon',
    shapeHebrewName: 'מחומש',
    soundFile: '/audio/shapes/he/pentagon.mp3',
    color: 'white',
    element: <polygon points="12 2, 22 10, 18 22, 6 22, 2 10" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'trapezoid',
    shapeHebrewName: 'טרפז',
    soundFile: '/audio/shapes/he/trapezoid.mp3',
    color: '#b4ca6d',
    element: <polygon points="17 4, 23 22, 1 22, 7 4" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'pyramid',
    shapeHebrewName: 'פירמידה',
    soundFile: '/audio/shapes/he/pyramid.mp3',
    color: 'pink',
    element: (
      <>
        <polygon points="12 2, 24 16, 17 23, 1 20" />
        <line x1="12" y1="2.1" x2="17" y2="23" stroke="black" strokeWidth="0.3px" />
        <line x1="12" y1="2.1" x2="1" y2="20" stroke="black" strokeWidth="0.3px" />
        <line x1="1" y1="20" x2="17" y2="23" stroke="black" strokeWidth="0.3px" />
        <line x1="17" y1="23" x2="24" y2="16" stroke="black" strokeWidth="0.3px" />
        <line x1="12" y1="2.1" x2="24" y2="16" stroke="black" strokeWidth="0.3px" />
      </>
    ),
  },

  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'rhombus',
    shapeHebrewName: 'מעוין',
    soundFile: '/audio/shapes/he/rhombus.mp3',
    color: 'gray',
    element: <polygon points="12 0, 22 12, 12 24, 2 12" stroke="black" strokeWidth="0.1" />,
  },

  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'wave',
    shapeHebrewName: 'גל',
    soundFile: '/audio/shapes/he/wave.mp3',
    color: 'olive',
    element: (
      <path
        d="M0 11 Q 1.5 8.5, 3 11 T 6 11 T 9 11 T 12 11 T 15 11 T 18 11 T 21 11 T 24 11 T 27 11 T 30 11"
        stroke="blue"
        fill="none"
      />
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'cylinder',
    shapeHebrewName: 'גליל',
    soundFile: '/audio/shapes/he/cylinder.mp3',
    color: '#bbbbff',
    element: (
      <>
        <rect x="5" y="6" width="14" height="14" stroke="black" strokeWidth="0.2" />
        <ellipse cx="12" cy="6" rx="7" ry="3" stroke="black" strokeWidth="0.2" />
        <ellipse cx="12" cy="20" rx="7" ry="3" stroke="black" strokeWidth="0.2" />
      </>
    ),
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'octagon',
    shapeHebrewName: 'מתומן',
    soundFile: '/audio/shapes/he/octagon.mp3',
    color: 'tomato',
    element: <polygon points="8 3, 16 3, 23 10, 23 17, 16 24, 8 24, 1 17, 1 10" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'parallelogram',
    shapeHebrewName: 'מקבילית',
    soundFile: '/audio/shapes/he/parallelogram.mp3',
    color: 'violet',
    element: <rect x="10" y="3.3" width="15" height="20" transform="skewX(-20)" stroke="black" strokeWidth="0.1" />,
  },
  {
    type: ModelTypesEnum.SHAPES,
    shapeName: 'diamond',
    shapeHebrewName: 'יהלום',
    soundFile: '/audio/shapes/he/diamond.mp3',
    color: 'lightBlue',
    element: (
      <>
        <polygon points="6 3, 18 3, 23 8, 12 24, 1 8" stroke="black" strokeWidth="0.1px" />
        <line x1="1" y1="8" x2="23" y2="8" stroke="black" strokeWidth="0.1px" />
        <line x1="8" y1="8" x2="12" y2="24" stroke="black" strokeWidth="0.1px" />
        <line x1="16" y1="8" x2="12" y2="24" stroke="black" strokeWidth="0.1px" />
        <line x1="8" y1="8" x2="12" y2="3" stroke="black" strokeWidth="0.1px" />
        <line x1="16" y1="8" x2="12" y2="3" stroke="black" strokeWidth="0.1px" />
      </>
    ),
  },
];

export default shapes;
