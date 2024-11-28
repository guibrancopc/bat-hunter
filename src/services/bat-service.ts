import {
  pauseAllBackgroundMusic,
  playBackgroundMusic,
  playShotSound,
} from './audio-service';

const batGameId = '#bat-kill-dashboard';

const aimImagePath = '/images/aim.png';
const aimImageShotPath = '/images/aim-shot.png';

const gameBackgroundImage = '/images/pumpkins-bg.jpg';
const aimTargetImagePath = '/images/aim-target.png';

const bodyEl = document.querySelector('body')!;

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

export function isShotEnabled(e: { target: EventTarget | null }) {
  const computedCursor =
    window.getComputedStyle(e.target as Element).cursor ||
    window.getComputedStyle(bodyEl).cursor;

  return computedCursor.includes('aim');
}

// shot handler
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
