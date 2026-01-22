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

export function calcFinalScore(shotCounter?: number, killCounter?: number) {
  const accuracy = calcAccuracy(shotCounter || 0, killCounter || 0);
  return accuracy * (killCounter || 0);
}

export function killAllBats() {
  document.querySelectorAll('.flying-bat').forEach((bat) => bat.remove());
}

export function findCurrentGame(match?: MatchType) {
  const games = match?.games;
  return (
    games && Object.values(games).find((game) => game.state !== 'GAME_CLOSED')
  );
}

export function findLastGame(match?: MatchType) {
  const sortedGames = buildGameSortedArray(match?.games);

  return sortedGames?.[0];
}

// @TODO: use buildArray service here
export function buildGameSortedArray(
  games?: MatchType['games'],
  order?: 'ASC' | 'DESC'
) {
  if (!games) return null;

  const sortMultiplier = order === 'ASC' ? -1 : 1;

  return Object.values(games).sort(
    (a, b) => ((b.createdAt || 0) - (a.createdAt || 0)) * sortMultiplier
  );
}
