import { getLocalStorageValue } from './local-storage-service';

const shotSoundPath = '/sound/shot-sound.mp3';
const backgroundMusicPath = '/sound/background-music.mp3';
const challengeBackgroundMusicPath = '/sound/challenge-background-music.mp3';

const backgroundAudioSingleton = new Audio(backgroundMusicPath);
const backgroundMusicVolume = 0.05;

setInitialAudioDetails(backgroundAudioSingleton);

const buildShotAudio = () => new Audio(shotSoundPath);

function setInitialAudioDetails(audioInstance: HTMLAudioElement) {
  const isMuted = isMutedStateLocalStorage();

  audioInstance.loop = true;
  audioInstance.currentTime = 0;
  audioInstance.volume = isMuted ? 0 : backgroundMusicVolume;
}

export function isMutedStateLocalStorage() {
  return !!getLocalStorageValue('bh-background-music-muted');
}

export function toggleMusicService() {
  if (backgroundAudioSingleton.volume === 0) {
    backgroundAudioSingleton.volume = backgroundMusicVolume;
    return true;
  }

  backgroundAudioSingleton.volume = 0;
  return false;
}

export function playBackgroundMusic() {
  backgroundAudioSingleton.src = backgroundMusicPath;
  backgroundAudioSingleton.play();
}

export function playChallengeBackgroundMusic() {
  backgroundAudioSingleton.src = challengeBackgroundMusicPath;
  backgroundAudioSingleton.play();
}

export function pauseAllBackgroundMusic() {
  backgroundAudioSingleton.pause();
}

export function playShotSound() {
  const shotAudio = buildShotAudio();
  shotAudio.volume = 0.3;
  shotAudio.play();
}
