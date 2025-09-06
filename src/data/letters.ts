import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface LetterConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFile: string;
  color: string;
}

const letters: LetterConfig[] = [
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_1',
    translationKey: 'letters.letter_1',
    audioFile: 'aleph.mp3',
    color: '#FF5733',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_2',
    translationKey: 'letters.letter_2',
    audioFile: 'bet.mp3',
    color: '#FF8D1A',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_3',
    translationKey: 'letters.letter_3',
    audioFile: 'gimel.mp3',
    color: '#FFC300',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_4',
    translationKey: 'letters.letter_4',
    audioFile: 'dalet.mp3',
    color: '#b5eb50',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_5',
    translationKey: 'letters.letter_5',
    audioFile: 'hey.mp3',
    color: '#33FF57',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_6',
    translationKey: 'letters.letter_6',
    audioFile: 'vav.mp3',
    color: '#1AFF8D',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_7',
    translationKey: 'letters.letter_7',
    audioFile: 'zayin.mp3',
    color: '#33FFF7',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_8',
    translationKey: 'letters.letter_8',
    audioFile: 'chet.mp3',
    color: '#1A8DFF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_9',
    translationKey: 'letters.letter_9',
    audioFile: 'tet.mp3',
    color: '#5733FF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_10',
    translationKey: 'letters.letter_10',
    audioFile: 'yud.mp3',
    color: '#8D1AFF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_11',
    translationKey: 'letters.letter_11',
    audioFile: 'kaf.mp3',
    color: '#C300FF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_12',
    translationKey: 'letters.letter_12',
    audioFile: 'lamed.mp3',
    color: '#FF33F7',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_13',
    translationKey: 'letters.letter_13',
    audioFile: 'mem.mp3',
    color: '#FF1A8D',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_14',
    translationKey: 'letters.letter_14',
    audioFile: 'nun.mp3',
    color: '#DA1AFF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_15',
    translationKey: 'letters.letter_15',
    audioFile: 'samech.mp3',
    color: '#FF33C3',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_16',
    translationKey: 'letters.letter_16',
    audioFile: 'ayin.mp3',
    color: '#FF5733',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_17',
    translationKey: 'letters.letter_17',
    audioFile: 'pey.mp3',
    color: '#FF8D1A',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_18',
    translationKey: 'letters.letter_18',
    audioFile: 'tzadi.mp3',
    color: '#FFC300',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_19',
    translationKey: 'letters.letter_19',
    audioFile: 'kuf.mp3',
    color: '#6aa103',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_20',
    translationKey: 'letters.letter_20',
    audioFile: 'resh.mp3',
    color: '#33FF57',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_21',
    translationKey: 'letters.letter_21',
    audioFile: 'shin.mp3',
    color: '#1AFF8D',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_22',
    translationKey: 'letters.letter_22',
    audioFile: 'tav.mp3',
    color: '#33FFF7',
  },
];

export default letters;
