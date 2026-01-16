import { useEffect, useMemo, useReducer, useState } from 'react';
import './multi-player-game-dashboard.scss';
import { MultiPlayerGameDashboardMatch } from './_multi-player-main-dashboard-match';
import { Card, Gutter } from '@components';
import { MatchType } from 'src/models/match-model';
import {
  createGameInFirebase,
  GameType,
  setGameInFirebase,
  setPlayerDataInFirebase,
} from 'src/models/game-model';
import { calcFinalScore, findCurrentGame } from 'src/services/game-service';
import { useIsCurrentUserTheHost } from 'src/hooks/game-hooks';

export function MultiPlayerGameDashboard({ match }: { match?: MatchType }) {
  const [killCounter, dispatchKillCounter] = useReducer(counterReducer, 0);
  const [shotCounter, dispatchShotCounter] = useReducer(counterReducer, 0);
  const [isGameActive, setIsGameActive] = useState(false);

  const isCurrentUserTheHost = useIsCurrentUserTheHost(match);
  console.log('isCurrentUserTheHost', isCurrentUserTheHost);

  const currentGame = useMemo(() => {
    if (!match) return;

    return findCurrentGame(match);
  }, [match]);

  // On Mount
  useEffect(() => {
    if (!isCurrentUserTheHost) return;

    findOrCreateGame(match);
  }, [isCurrentUserTheHost]);

  useEffect(() => console.log('currentGame: ', currentGame), [currentGame]);

  useEffect(() => {
    console.log('kills x shots: ', `${killCounter} x ${shotCounter}`);

    if (match?.id && currentGame?.id && isGameActive)
      setPlayerDataInFirebase({
        matchId: match.id,
        gameId: currentGame?.id,
        player: isCurrentUserTheHost ? 'host' : 'guest',
        data: {
          shotCounter,
          killCounter,
        },
      });
  }, [shotCounter, killCounter]);

  function cleanScore() {
    dispatchKillCounter('reset');
    dispatchShotCounter('reset');
  }

  return (
    <div className="multi-player-game-dashboard">
      <Card className="multi-player-game-dashboard__card">
        <Gutter size="md">
          <MultiPlayerGameDashboardMatch
            onStateChange={(state) => {
              console.log('CURRENT_STATE', state);

              if (state === 'MATCH_READY') {
                cleanScore();
                setIsGameActive(false);

                if (isCurrentUserTheHost) {
                  // TODO: How to finish game when user reload the page?
                  // Tried a useEffect but it was immediately finishing a game when a winner was set
                  finishGameWithWinner(currentGame, match?.id);
                  findOrCreateGame(match);
                }
              }

              if (state === 'MATCH_IN_PROGRESS') {
                setIsGameActive(true);
              }

              if (state === 'MATCH_FINISHED') {
                setIsGameActive(false);
                if (isCurrentUserTheHost) {
                  setWinner(match);
                }
              }

              // READY
              // - Find Open Game or Create Game
              // ON GOING
              // - Store each kill and shot
              // FINISHED
              // - Store the winner
            }}
            onKill={() => dispatchKillCounter('add')}
            onShot={() => dispatchShotCounter('add')}
            onResetScore={cleanScore}
          />
        </Gutter>
      </Card>
    </div>
  );
}

function finishGameWithWinner(
  game?: GameType,
  matchId?: string,
  cb?: () => void
) {
  if (!matchId || !game?.id) return;

  if (!game?.winnerId || game?.finished) return;

  setGameInFirebase({
    matchId: matchId,
    data: { id: game?.id, finished: true },
  }).then(cb);
}

function setWinner(match?: MatchType) {
  const currentGame = findCurrentGame(match);
  const hostFinalScore = calcFinalScore(
    currentGame?.hostData?.shotCounter || 0,
    currentGame?.hostData?.killCounter || 0
  );

  const guestFinalScore = calcFinalScore(
    currentGame?.guestData?.shotCounter || 0,
    currentGame?.guestData?.killCounter || 0
  );

  const winnerId =
    guestFinalScore === hostFinalScore
      ? 'DRAW'
      : guestFinalScore > hostFinalScore
        ? match?.guestId
        : match?.hostId;

  if (match?.id) {
    setGameInFirebase({
      matchId: match.id,
      data: { id: currentGame?.id, winnerId },
    });
  }
}

function findOrCreateGame(
  match?: MatchType,
  onCreate?: () => void
  // setGameId?: (id?: string) => void
) {
  const currentGame = findCurrentGame(match);

  if (currentGame) {
    // setGameId?.(currentGame.id);
    return;
  }

  if (match?.id) {
    createGameInFirebase({
      matchId: match?.id,
      onCreated: onCreate,
      onError: () => {
        console.error('ERROR: could not register new game in Firebase.');
      },
    });
    return;
  }

  console.error('ERROR: Could not retrieve a game.');
}

function counterReducer(state: number, action: 'add' | 'reset') {
  return action === 'add' ? state + 1 : 0;
}
