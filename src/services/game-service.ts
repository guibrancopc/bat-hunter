import { getAimCursorRegular, ShotEventType } from './shot-service';
import { pauseAllBackgroundMusic, playBackgroundMusic } from './audio-service';
import { MatchType } from 'src/models/match-model';

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

export function calcFinalScore(shotCounter: number, killCounter: number) {
  const accuracy = calcAccuracy(shotCounter, killCounter);
  return accuracy * killCounter;
}

export function killAllBats() {
  document.querySelectorAll('.flying-bat').forEach((bat) => bat.remove());
}

export function findCurrentGame(match?: MatchType) {
  const games = match?.games;
  return games && Object.values(games).find((game) => !game.winnerId);
}
