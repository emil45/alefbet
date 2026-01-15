export enum AudioSounds {
  GREEN,
  RED,
  YELLOW,
  BLUE,
  GAME_START,
  GAME_OVER,
  SUCCESS,
  BONUS,
  LETTER_PICK,
  LETTER_DROP,
  LETTER_REMOVE,
  WORD_COMPLETE,
  LEVEL_UP,
  CELEBRATION,
  WRONG_ANSWER,
  HINT,
  TICK,
  WHOOSH,
  POP,
  DING,
  SPARKLE,
}

const AUDIO_PATHS: Record<AudioSounds, string> = {
  [AudioSounds.GREEN]: '/audio/common/simon-green.mp3',
  [AudioSounds.RED]: '/audio/common/simon-red.mp3',
  [AudioSounds.YELLOW]: '/audio/common/simon-yellow.mp3',
  [AudioSounds.BLUE]: '/audio/common/simon-blue.mp3',
  [AudioSounds.GAME_START]: '/audio/common/game-start.mp3',
  [AudioSounds.GAME_OVER]: '/audio/common/game-over-arcade.mp3',
  [AudioSounds.SUCCESS]: '/audio/common/short-success.mp3',
  [AudioSounds.BONUS]: '/audio/common/game-bonus.mp3',
  [AudioSounds.LETTER_PICK]: '/audio/common/tick.mp3',
  [AudioSounds.LETTER_DROP]: '/audio/common/letter-drop.mp3',
  [AudioSounds.LETTER_REMOVE]: '/audio/common/pop.mp3',
  [AudioSounds.WORD_COMPLETE]: '/audio/common/short-success.mp3',
  [AudioSounds.LEVEL_UP]: '/audio/common/level-up.mp3',
  [AudioSounds.CELEBRATION]: '/audio/common/yay-kids.mp3',
  [AudioSounds.WRONG_ANSWER]: '/audio/common/wrong-answer.mp3',
  [AudioSounds.HINT]: '/audio/common/hint.mp3',
  [AudioSounds.TICK]: '/audio/common/tick.mp3',
  [AudioSounds.WHOOSH]: '/audio/common/whoosh.mp3',
  [AudioSounds.POP]: '/audio/common/pop.mp3',
  [AudioSounds.DING]: '/audio/common/ding.mp3',
  [AudioSounds.SPARKLE]: '/audio/common/sparkle.mp3',
};

// Lazy-initialized audio refs (only created on client)
let audioRefs: Record<AudioSounds, HTMLAudioElement> | null = null;

function getAudioRefs(): Record<AudioSounds, HTMLAudioElement> | null {
  if (typeof window === 'undefined') return null;

  if (!audioRefs) {
    audioRefs = {} as Record<AudioSounds, HTMLAudioElement>;
    for (const key in AUDIO_PATHS) {
      const soundKey = Number(key) as AudioSounds;
      audioRefs[soundKey] = new Audio(AUDIO_PATHS[soundKey]);
    }
  }
  return audioRefs;
}

// Function to play sound
export const playSound = (sound: AudioSounds) => {
  const refs = getAudioRefs();
  if (!refs) return;

  const audio = refs[sound];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((error) => console.error('Error playing sound:', error));
  }
};

// Function to play audio file by path
export const playAudio = (audioPath: string) => {
  if (typeof window === 'undefined') return;

  const audio = new Audio(`/audio/${audioPath}`);
  audio.play().catch((error) => console.error('Error playing audio:', error));
};

export const preloadSounds = () => {
  const refs = getAudioRefs();
  if (!refs) return;

  for (const key in refs) {
    const audio = refs[key as unknown as AudioSounds];
    audio.load();
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.volume = 1;
        audio.currentTime = 0;
      })
      .catch(() => {
        // Expected: browsers block autoplay before user interaction
      });
  }
};

export const stopAllSounds = () => {
  const refs = getAudioRefs();
  if (!refs) return;

  for (const key in refs) {
    const audio = refs[key as unknown as AudioSounds];
    audio.pause();
    audio.currentTime = 0;
  }
};
