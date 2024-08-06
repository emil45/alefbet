import { LetterModel } from '../models/LetterModel';
import { ModelTypesEnum } from '../models/ModelsTypesEnum';

const letters: LetterModel[] = [
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'א',
    letterFullName: 'אָלֶף',
    soundFile: '/letters/aleph.mp3',
    color: '#FF5733',
  }, // bright red
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ב',
    letterFullName: 'בֵּית',
    soundFile: '/letters/bet.mp3',
    color: '#FF8D1A',
  }, // bright orange
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ג',
    letterFullName: 'גִּימֶל',
    soundFile: '/letters/gimel.mp3',
    color: '#FFC300',
  }, // bright yellow
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ד',
    letterFullName: 'דָּלֶת',
    soundFile: '/letters/dalet.mp3',
    color: '#b5eb50',
  }, // light green
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ה',
    letterFullName: 'הֵא',
    soundFile: '/letters/hey.mp3',
    color: '#33FF57',
  }, // bright green
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ו',
    letterFullName: 'וָיו',
    soundFile: '/letters/vav.mp3',
    color: '#1AFF8D',
  }, // bright teal
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ז',
    letterFullName: 'זַיִן',
    soundFile: '/letters/zayin.mp3',
    color: '#33FFF7',
  }, // bright cyan
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ח',
    letterFullName: 'חֵית',
    soundFile: '/letters/chet.mp3',
    color: '#1A8DFF',
  }, // bright blue
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ט',
    letterFullName: 'טֵית',
    soundFile: '/letters/tet.mp3',
    color: '#5733FF',
  }, // bright purple
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'י',
    letterFullName: 'יוֹד',
    soundFile: '/letters/yud.mp3',
    color: '#8D1AFF',
  }, // bright violet
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'כ',
    letterFullName: 'כָּף',
    soundFile: '/letters/kaf.mp3',
    color: '#C300FF',
  }, // bright magenta
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ל',
    letterFullName: 'לָמֶד',
    soundFile: '/letters/lamed.mp3',
    color: '#FF33F7',
  }, // bright pink
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'מ',
    letterFullName: 'מֵם',
    soundFile: '/letters/mem.mp3',
    color: '#FF1A8D',
  }, // bright fuchsia
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'נ',
    letterFullName: 'נוּן',
    soundFile: '/letters/nun.mp3',
    color: '#DA1AFF',
  }, // bright rose
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ס',
    letterFullName: 'סָמֵך',
    soundFile: '/letters/samech.mp3',
    color: '#FF33C3',
  }, // bright hot pink
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ע',
    letterFullName: 'עַיִן',
    soundFile: '/letters/ayin.mp3',
    color: '#FF5733',
  }, // bright coral
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'פ',
    letterFullName: 'פֵּא',
    soundFile: '/letters/pey.mp3',
    color: '#FF8D1A',
  }, // bright peach
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'צ',
    letterFullName: 'צָדִי',
    soundFile: '/letters/tzadi.mp3',
    color: '#FFC300',
  }, // bright gold
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ק',
    letterFullName: 'קוּף',
    soundFile: '/letters/kuf.mp3',
    color: '#6aa103',
  }, // light mint
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ר',
    letterFullName: 'רֵיש',
    soundFile: '/letters/resh.mp3',
    color: '#33FF57',
  }, // bright lime
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ש',
    letterFullName: 'שִׁין',
    soundFile: '/letters/shin.mp3',
    color: '#1AFF8D',
  }, // bright aqua
  {
    type: ModelTypesEnum.LETTERS,
    letterName: 'ת',
    letterFullName: 'תָּיו',
    soundFile: '/letters/tav.mp3',
    color: '#33FFF7',
  }, // bright sky blue
];

export default letters;
