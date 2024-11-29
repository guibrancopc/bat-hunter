import { getAimCursorRegular, ShotEventType } from './shot-service';
import { pauseAllBackgroundMusic, playBackgroundMusic } from './audio-service';

const batGameId = '#bat-kill-dashboard';
const gameBackgroundImage = '/images/pumpkins-bg.jpg';

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

export function enableBatGame() {
  isGameModeOn = true;
  toggleImageBg(true);
  playBackgroundMusic();
  const batGameEl = document.querySelector(batGameId) as HTMLElement;

  bodyEl.style.cursor = getAimCursorRegular();

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

export function setBodyOnClick(cb: (e: ShotEventType) => void) {
  bodyEl.onmousedown = cb;
}

export function calcAccuracy(shotCounter: number, killCounter: number) {
  if (!shotCounter) {
    return 100;
  }

  const raw = killCounter / shotCounter;
  return Math.round(raw * 100);
}
