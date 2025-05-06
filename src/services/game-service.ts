import { getAimCursorRegular, ShotEventType } from './shot-service';
import { pauseAllBackgroundMusic, playBackgroundMusic } from './audio-service';

const bodyEl = document.querySelector('body')!;

let isGameModeOn = false;

export const getIsGameModeOn = () => isGameModeOn;

export function enableBatGame() {
  isGameModeOn = true;
  playBackgroundMusic();

  bodyEl.style.cursor = getAimCursorRegular();
}

export function disableBatGame() {
  isGameModeOn = false;
  pauseAllBackgroundMusic();

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

export function killAllBats() {
  document.querySelectorAll('.flying-bat').forEach((bat) => bat.remove());
}
