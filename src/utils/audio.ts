export enum AudioSounds {
    GREEN,
    RED,
    YELLOW ,
    BLUE,
    GAME_START,
    GAME_OVER,
    SUCCESS,
    BONUS,
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
};

// Function to play sound
export const playSound = (sound: AudioSounds) => {
    const audio = audioRefs[sound];
    if (audio) {
        audio.currentTime = 0;  // Reset the playback position
        audio.play().catch((error) => console.error('Error playing sound:', error));
    }
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
