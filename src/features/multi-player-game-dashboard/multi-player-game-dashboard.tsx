import { useEffect, useMemo, useReducer, useState } from 'react';
import './multi-player-game-dashboard.scss';
import { MultiPlayerGameDashboardMatch } from './_multi-player-main-dashboard-match';
import { Card, Gutter } from '@components';
import { MatchType } from 'src/models/match-model';
import {
  createGameInFirebase,
  setGameInFirebase,
  setPlayerDataInFirebase,
} from 'src/models/game-model';
import { useAuthContext } from '../authentication';
import { calcFinalScore, findCurrentGame } from 'src/services/game-service';

export function MultiPlayerGameDashboard({ match }: { match?: MatchType }) {
  const { currentUser } = useAuthContext();

  const [killCounter, dispatchKillCounter] = useReducer(counterReducer, 0);
  const [shotCounter, dispatchShotCounter] = useReducer(counterReducer, 0);
  const [currentGameId, setCurrentGameId] = useState<string>();
  const [isGameActive, setIsGameActive] = useState(false);

  const playerKind = useMemo(() => {
    const isCurrentUserTheHost =
      match?.hostId && match?.hostId === currentUser?.id;
    return isCurrentUserTheHost ? 'host' : 'guest';
  }, [match, currentUser]);

  useEffect(() => {
    findOrCreateGame(match, setCurrentGameId);
  }, [match, setCurrentGameId]);

  useEffect(
    () => console.log('currentGameId: ', currentGameId),
    [currentGameId]
  );

  useEffect(() => {
    console.log('kills x shots: ', `${killCounter} x ${shotCounter}`);

    if (match?.id && currentGameId && isGameActive)
      setPlayerDataInFirebase({
        matchId: match.id,
        gameId: currentGameId,
        player: playerKind,
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
                setIsGameActive(false);
                findOrCreateGame(match, setCurrentGameId);
              }

              if (state === 'MATCH_IN_PROGRESS') {
                setIsGameActive(true);
              }

              if (state === 'MATCH_FINISHED') {
                setIsGameActive(false);
                setWinner(match);
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
    setGameInFirebase({ matchId: match.id, data: { winnerId } });
  }
}

function findOrCreateGame(
  match?: MatchType,
  setGameId?: (id?: string) => void
) {
  const currentGame = findCurrentGame(match);

  if (currentGame) {
    setGameId?.(currentGame.id);
    return;
  }

  if (match?.id) {
    createGameInFirebase({
      matchId: match?.id,
      onCreated: setGameId,
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
