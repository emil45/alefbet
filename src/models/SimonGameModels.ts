import { AudioSounds } from '../utils/audio';

export enum Color {
  GREEN = 'green',
  RED = 'red',
  YELLOW = 'yellow',
  BLUE = 'blue',
}

export enum GameState {
  IDLE = 'idle',
  SEQUENCE = 'sequence',
  USER_INPUT = 'userInput',
  GAME_OVER = 'gameOver',
}

export const COLORS: Color[] = [Color.GREEN, Color.RED, Color.YELLOW, Color.BLUE];

export const colorToAudioSound: { [key in Color]: AudioSounds } = {
  [Color.GREEN]: AudioSounds.GREEN,
  [Color.RED]: AudioSounds.RED,
  [Color.YELLOW]: AudioSounds.YELLOW,
  [Color.BLUE]: AudioSounds.BLUE,
};
