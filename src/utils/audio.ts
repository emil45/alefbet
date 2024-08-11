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
    [AudioSounds.GREEN]: new Audio('/sounds/simon-green.mp3'),
    [AudioSounds.RED]: new Audio('/sounds/simon-red.mp3'),
    [AudioSounds.YELLOW]: new Audio('/sounds/simon-yellow.mp3'),
    [AudioSounds.BLUE]: new Audio('/sounds/simon-blue.mp3'),
    [AudioSounds.GAME_START]: new Audio('/sounds/game-start.mp3'),
    [AudioSounds.GAME_OVER]: new Audio('/sounds/game-over-arcade.mp3'),
    [AudioSounds.SUCCESS]: new Audio('/sounds/short-success.mp3'),
    [AudioSounds.BONUS]: new Audio('/sounds/game-bonus.mp3'),
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
      audio.play().catch(() => {});
      audio.pause();
      audio.currentTime = 0;
    }
  };
