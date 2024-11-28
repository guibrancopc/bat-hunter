const shotSoundPath = '/sound/shot-sound.mp3';
const backgroundMusicPath = '/sound/background-music.mp3';
const challengeBackgroundMusicPath = '/sound/challenge-background-music.mp3';

const regularBackgroundgMusic = new Audio(backgroundMusicPath);
const challengeBackgroundMusic = new Audio(challengeBackgroundMusicPath);

const buildShotAudio = () => new Audio(shotSoundPath);

export function playBackgroundMusic() {
  play(regularBackgroundgMusic);
}

export function playChallengeBackgroundMusic() {
  play(challengeBackgroundMusic);
}

function play(audioInstance: HTMLAudioElement) {
  pauseAllBackgroundMusic();

  audioInstance.loop = true;
  audioInstance.volume = 0.05;
  audioInstance.currentTime = 0;

  audioInstance.play();
}

export function pauseAllBackgroundMusic() {
  regularBackgroundgMusic.pause();
  challengeBackgroundMusic.pause();
}

export function playShotSound() {
  const shotAudio = buildShotAudio();
  shotAudio.volume = 0.3;
  shotAudio.play();
}
