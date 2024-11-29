import { playShotSound } from './audio-service';

const aimImagePath = '/images/aim.png';
const aimImageShotPath = '/images/aim-shot.png';
const aimTargetImagePath = '/images/aim-target.png';
const bodyEl = document.querySelector('body')!;

export function getAimCursorOverTarget() {
  return buildAimCursor(aimTargetImagePath);
}

export function getAimCursorRegular() {
  return buildAimCursor(aimImagePath);
}

function getAimCursorShot() {
  return buildAimCursor(aimImageShotPath);
}

function buildAimCursor(imgPath: string, position = '30 30') {
  return `url('${imgPath}') ${position}, auto`;
}

export type ShotEventType = { target: EventTarget | null };

export function isShotEnabled(e: ShotEventType) {
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

  bodyEl.style.cursor = getAimCursorShot();

  setTimeout(() => {
    bodyEl.style.cursor = getAimCursorRegular();
  }, 75);
};

export function killAllBats() {
  document.querySelectorAll('.flying-bat').forEach((bat) => bat.remove());
}
