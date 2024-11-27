const batGameId = '#bat-kill-dashboard';

const aimImagePath = '/images/aim.png';
const aimImageShotPath = '/images/aim-shot.png';
const shotSoundPath = '/sound/shot-sound.mp3';

const gameBackgroundImage = '/images/pumpkins-bg.jpg';
const backgroundMusicPath = '/sound/background-music.mp3';
const aimTargetImagePath = '/images/aim-target.png';

const challengeBackgroundMusicPath = '/sound/challenge-background-music.mp3';

const bodyEl = document.querySelector('body')!;
const bgMusic = new Audio(backgroundMusicPath);
const challengeBgMusic = new Audio(challengeBackgroundMusicPath);

let isGameModeOn = false;

function toggleImageBg(toggle: boolean) {
  if (toggle) {
    bodyEl.style.backgroundImage = `url(${gameBackgroundImage})`;
    bodyEl.style.backgroundSize = 'cover';
    bodyEl.style.backgroundAttachment = 'fixed';
    return;
  }

  bodyEl.style.backgroundImage = '';
  bodyEl.style.backgroundSize = '';
  bodyEl.style.backgroundAttachment = '';
}

export const getIsGameModeOn = () => isGameModeOn;

function buildAimCursor(imgPath: string, position = '30 30') {
  return `url('${imgPath}') ${position}, auto`;
}

export function playBackgroundMusic() {
  challengeBgMusic.pause();

  bgMusic.loop = true;
  bgMusic.volume = 0.05;
  bgMusic.currentTime = 0;

  bgMusic.play();
}

export function playChallengeBackgroundMusic() {
  bgMusic.pause();

  challengeBgMusic.loop = true;
  challengeBgMusic.volume = 0.05;
  challengeBgMusic.currentTime = 0;

  challengeBgMusic.play();
}

function pauseAllBackgroundMusic() {
  bgMusic.pause();
  challengeBgMusic.pause();
}

function playShotSound() {
  const shotAudio = new Audio(shotSoundPath);
  shotAudio.volume = 0.3;
  shotAudio.play();
}

export function killBat() {
  const bat = document.querySelector('.flying-bat');

  if (bat) {
    bat.remove();
  }
}

export function killAllBats() {
  document.querySelectorAll('.flying-bat').forEach((bat) => bat.remove());
}

export function enableBatGame() {
  isGameModeOn = true;
  toggleImageBg(true);
  playBackgroundMusic();
  const batGameEl = document.querySelector(batGameId) as HTMLElement;

  bodyEl.style.cursor = buildAimCursor(aimImagePath);

  if (batGameEl) {
    batGameEl.style.display = 'block';
  }
}

export function disableBatGame() {
  isGameModeOn = false;
  toggleImageBg(false);
  pauseAllBackgroundMusic();
  const batGameEl = document.querySelector(batGameId) as HTMLElement;

  if (batGameEl) {
    batGameEl.style.display = 'none';
  }

  setTimeout(() => {
    bodyEl.style.cursor = '';
  }, 200);
}

export function setBodyOnClick(cb: () => void) {
  bodyEl.onmousedown = cb;
}

// Shift Button Toggle
bodyEl.onkeydown = (e) => {
  if (!e.shiftKey || e.code !== 'Space') return;

  if (isGameModeOn) {
    disableBatGame();
  } else {
    enableBatGame();
  }
};

export function isShotEnabled(e: { target: EventTarget | null }) {
  const computedCursor =
    window.getComputedStyle(e.target as Element).cursor ||
    window.getComputedStyle(bodyEl).cursor;

  return computedCursor.includes('aim');
}

document.onmousedown = (e) => {
  if (!bodyEl.style.cursor) return;

  if (isShotEnabled(e)) {
    playShotSound();
  }

  bodyEl.style.cursor = buildAimCursor(aimImageShotPath);

  setTimeout(() => {
    bodyEl.style.cursor = buildAimCursor(aimImagePath);
  }, 75);
};

export function calcAccuracy(shotCounter: number, killCounter: number) {
  if (!shotCounter) {
    return 100;
  }

  const raw = killCounter / shotCounter;
  return Math.round(raw * 100);
}

export function getAimCursorOverTarget() {
  return buildAimCursor(aimTargetImagePath);
}
