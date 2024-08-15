import { ModelTypesEnum } from '../models/ModelsTypesEnum';
import { NumberModel } from '../models/NumberModel';

const numbers: NumberModel[] = [
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '1',
    numberLetter: 'אחת',
    soundFile: '/audio/numbers/he/one.mp3',
    color: '#FF5733',
  }, // bright red
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '2',
    numberLetter: 'שתים',
    soundFile: '/audio/numbers/he/two.mp3',
    color: '#FF8D1A',
  }, // bright orange
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '3',
    numberLetter: 'שלוש',
    soundFile: '/audio/numbers/he/three.mp3',
    color: '#FFC300',
  }, // bright yellow
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '4',
    numberLetter: 'ארבע',
    soundFile: '/audio/numbers/he/four.mp3',
    color: '#b5eb50',
  }, // light green
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '5',
    numberLetter: 'חמש',
    soundFile: '/audio/numbers/he/five.mp3',
    color: '#33FF57',
  }, // bright green
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '6',
    numberLetter: 'שש',
    soundFile: '/audio/numbers/he/six.mp3',
    color: '#1AFF8D',
  }, // bright teal
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '7',
    numberLetter: 'שבע',
    soundFile: '/audio/numbers/he/seven.mp3',
    color: '#33FFF7',
  }, // bright cyan
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '8',
    numberLetter: 'שמונה',
    soundFile: '/audio/numbers/he/eight.mp3',
    color: '#1A8DFF',
  }, // bright blue
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '9',
    numberLetter: 'תשע',
    soundFile: '/audio/numbers/he/nine.mp3',
    color: '#5733FF',
  }, // bright purple
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '10',
    numberLetter: 'עשר',
    soundFile: '/audio/numbers/he/ten.mp3',
    color: '#8D1AFF',
  }, // bright violet
];

export default numbers;
