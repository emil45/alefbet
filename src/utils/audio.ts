export enum AudioSounds {
    GREEN,
    RED,
    YELLOW,
    BLUE,
    GAME_START,
    GAME_OVER,
    SUCCESS,
    BONUS,
    // Enhanced game sounds (available for all games)
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

// Ensure the audioRefs keys match the enum values
export const audioRefs: { [key in AudioSounds]: HTMLAudioElement } = {
    [AudioSounds.GREEN]: new Audio('/audio/common/simon-green.mp3'),
    [AudioSounds.RED]: new Audio('/audio/common/simon-red.mp3'),
    [AudioSounds.YELLOW]: new Audio('/audio/common/simon-yellow.mp3'),
    [AudioSounds.BLUE]: new Audio('/audio/common/simon-blue.mp3'),
    [AudioSounds.GAME_START]: new Audio('/audio/common/game-start.mp3'),
    [AudioSounds.GAME_OVER]: new Audio('/audio/common/game-over-arcade.mp3'),
    [AudioSounds.SUCCESS]: new Audio('/audio/common/short-success.mp3'),
    [AudioSounds.BONUS]: new Audio('/audio/common/game-bonus.mp3'),
    
    // Enhanced game sounds - Available for all games (using available sounds)
    [AudioSounds.LETTER_PICK]: new Audio('/audio/common/tick.mp3'),        // Letter/item selection sound
    [AudioSounds.LETTER_DROP]: new Audio('/audio/common/letter-drop.mp3'), // Item placement/drop sound
    [AudioSounds.LETTER_REMOVE]: new Audio('/audio/common/pop.mp3'),       // Item removal sound  
    [AudioSounds.WORD_COMPLETE]: new Audio('/audio/common/short-success.mp3'), // Task completion sound
    [AudioSounds.LEVEL_UP]: new Audio('/audio/common/level-up.mp3'),       // Level progression sound
    [AudioSounds.CELEBRATION]: new Audio('/audio/common/yay-kids.mp3'),    // Final victory celebration
    [AudioSounds.WRONG_ANSWER]: new Audio('/audio/common/wrong-answer.mp3'), // Incorrect action feedback
    [AudioSounds.HINT]: new Audio('/audio/common/hint.mp3'),               // Help/hint sound
    [AudioSounds.TICK]: new Audio('/audio/common/tick.mp3'),               // Quick confirmation
    [AudioSounds.WHOOSH]: new Audio('/audio/common/whoosh.mp3'),           // Swoosh/clearing sound
    [AudioSounds.POP]: new Audio('/audio/common/pop.mp3'),                 // Pop/bubble sound
    [AudioSounds.DING]: new Audio('/audio/common/ding.mp3'),               // Notification bell
    [AudioSounds.SPARKLE]: new Audio('/audio/common/sparkle.mp3'),         // Magical/special effect
};

// Function to play sound
export const playSound = (sound: AudioSounds) => {
    const audio = audioRefs[sound];
    if (audio) {
        audio.currentTime = 0;  // Reset the playback position
        audio.play().catch((error) => console.error('Error playing sound:', error));
    }
};

// Function to play audio file by path
export const playAudio = (audioPath: string) => {
  const audio = new Audio(`/audio/${audioPath}`);
  audio.play().catch((error) => console.error('Error playing audio:', error));
};

export const preloadSounds = () => {
  for (const key in audioRefs) {
    const audio = audioRefs[key as unknown as AudioSounds];
    audio.load();
    audio.volume = 0;
    audio.play().then(() => {
      audio.pause();
      audio.volume = 1;
      audio.currentTime = 0;
    }).catch(() => {
      console.log('Audio preload failed for:', key);
    });
  }
};

  export const stopAllSounds = () => {
    for (const key in audioRefs) {
        const audio = audioRefs[key as unknown as AudioSounds];
        audio.pause();
        audio.currentTime = 0;
    }
};
