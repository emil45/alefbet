import { ModelTypesEnum } from '../models/ModelsTypesEnum';
import { NumberModel } from '../models/NumberModel';

const numbers: NumberModel[] = [
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '1',
    numberLetter: 'אחת',
    soundFile: '/numbers/one.mp3',
    color: '#FF5733',
  }, // bright red
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '2',
    numberLetter: 'שתים',
    soundFile: '/numbers/two.mp3',
    color: '#FF8D1A',
  }, // bright orange
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '3',
    numberLetter: 'שלוש',
    soundFile: '/numbers/three.mp3',
    color: '#FFC300',
  }, // bright yellow
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '4',
    numberLetter: 'ארבע',
    soundFile: '/numbers/four.mp3',
    color: '#b5eb50',
  }, // light green
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '5',
    numberLetter: 'חמש',
    soundFile: '/numbers/five.mp3',
    color: '#33FF57',
  }, // bright green
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '6',
    numberLetter: 'שש',
    soundFile: '/numbers/six.mp3',
    color: '#1AFF8D',
  }, // bright teal
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '7',
    numberLetter: 'שבע',
    soundFile: '/numbers/seven.mp3',
    color: '#33FFF7',
  }, // bright cyan
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '8',
    numberLetter: 'שמונה',
    soundFile: '/numbers/eight.mp3',
    color: '#1A8DFF',
  }, // bright blue
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '9',
    numberLetter: 'תשע',
    soundFile: '/numbers/nine.mp3',
    color: '#5733FF',
  }, // bright purple
  {
    type: ModelTypesEnum.NUMBERS,
    numberName: '10',
    numberLetter: 'עשר',
    soundFile: '/numbers/ten.mp3',
    color: '#8D1AFF',
  }, // bright violet
];

export default numbers;
