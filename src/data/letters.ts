import { ModelTypesEnum } from '../models/ModelsTypesEnum';

interface LetterConfig {
  type: ModelTypesEnum;
  id: string;
  translationKey: string;
  audioFiles: {
    he: string;
    en: string;
  };
  color: string;
}

const letters: LetterConfig[] = [
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_1',
    translationKey: 'letters.letter_1',
    audioFiles: {
      he: 'aleph.mp3',
      en: 'a.mp3'
    },
    color: '#FF5733',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_2',
    translationKey: 'letters.letter_2',
    audioFiles: {
      he: 'bet.mp3',
      en: 'b.mp3'
    },
    color: '#FF8D1A',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_3',
    translationKey: 'letters.letter_3',
    audioFiles: {
      he: 'gimel.mp3',
      en: 'c.mp3'
    },
    color: '#FFC300',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_4',
    translationKey: 'letters.letter_4',
    audioFiles: {
      he: 'dalet.mp3',
      en: 'd.mp3'
    },
    color: '#b5eb50',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_5',
    translationKey: 'letters.letter_5',
    audioFiles: {
      he: 'hey.mp3',
      en: 'e.mp3'
    },
    color: '#33FF57',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_6',
    translationKey: 'letters.letter_6',
    audioFiles: {
      he: 'vav.mp3',
      en: 'f.mp3'
    },
    color: '#1AFF8D',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_7',
    translationKey: 'letters.letter_7',
    audioFiles: {
      he: 'zayin.mp3',
      en: 'g.mp3'
    },
    color: '#33FFF7',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_8',
    translationKey: 'letters.letter_8',
    audioFiles: {
      he: 'chet.mp3',
      en: 'h.mp3'
    },
    color: '#1A8DFF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_9',
    translationKey: 'letters.letter_9',
    audioFiles: {
      he: 'tet.mp3',
      en: 'i.mp3'
    },
    color: '#5733FF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_10',
    translationKey: 'letters.letter_10',
    audioFiles: {
      he: 'yud.mp3',
      en: 'j.mp3'
    },
    color: '#8D1AFF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_11',
    translationKey: 'letters.letter_11',
    audioFiles: {
      he: 'kaf.mp3',
      en: 'k.mp3'
    },
    color: '#C300FF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_12',
    translationKey: 'letters.letter_12',
    audioFiles: {
      he: 'lamed.mp3',
      en: 'l.mp3'
    },
    color: '#FF33F7',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_13',
    translationKey: 'letters.letter_13',
    audioFiles: {
      he: 'mem.mp3',
      en: 'm.mp3'
    },
    color: '#FF1A8D',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_14',
    translationKey: 'letters.letter_14',
    audioFiles: {
      he: 'nun.mp3',
      en: 'n.mp3'
    },
    color: '#DA1AFF',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_15',
    translationKey: 'letters.letter_15',
    audioFiles: {
      he: 'samech.mp3',
      en: 'o.mp3'
    },
    color: '#FF33C3',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_16',
    translationKey: 'letters.letter_16',
    audioFiles: {
      he: 'ayin.mp3',
      en: 'p.mp3'
    },
    color: '#FF5733',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_17',
    translationKey: 'letters.letter_17',
    audioFiles: {
      he: 'pey.mp3',
      en: 'q.mp3'
    },
    color: '#FF8D1A',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_18',
    translationKey: 'letters.letter_18',
    audioFiles: {
      he: 'tzadi.mp3',
      en: 'r.mp3'
    },
    color: '#FFC300',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_19',
    translationKey: 'letters.letter_19',
    audioFiles: {
      he: 'kuf.mp3',
      en: 's.mp3'
    },
    color: '#6aa103',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_20',
    translationKey: 'letters.letter_20',
    audioFiles: {
      he: 'resh.mp3',
      en: 't.mp3'
    },
    color: '#33FF57',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_21',
    translationKey: 'letters.letter_21',
    audioFiles: {
      he: 'shin.mp3',
      en: 'u.mp3'
    },
    color: '#1AFF8D',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_22',
    translationKey: 'letters.letter_22',
    audioFiles: {
      he: 'tav.mp3',
      en: 'v.mp3'
    },
    color: '#33FFF7',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_23',
    translationKey: 'letters.letter_23',
    audioFiles: {
      he: 'tav.mp3',
      en: 'w.mp3'
    },
    color: '#FF5733',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_24',
    translationKey: 'letters.letter_24',
    audioFiles: {
      he: 'tav.mp3',
      en: 'x.mp3'
    },
    color: '#FF8D1A',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_25',
    translationKey: 'letters.letter_25',
    audioFiles: {
      he: 'tav.mp3',
      en: 'y.mp3'
    },
    color: '#FFC300',
  },
  {
    type: ModelTypesEnum.LETTERS,
    id: 'letter_26',
    translationKey: 'letters.letter_26',
    audioFiles: {
      he: 'tav.mp3',
      en: 'z.mp3'
    },
    color: '#b5eb50',
  },
];

export default letters;
