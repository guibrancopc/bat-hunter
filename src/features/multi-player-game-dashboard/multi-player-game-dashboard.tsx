import { useEffect, useMemo, useReducer, useState } from 'react';
import './multi-player-game-dashboard.scss';
import { MultiPlayerGameDashboardMatch } from './_multi-player-main-dashboard-match';
import { Card, Gutter } from '@components';
import { MatchType } from 'src/models/match-model';
import {
  createGameInFirebase,
  GameStateType,
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

  // Finish game with winner when the page loads
  useEffect(() => {
    if (!isCurrentUserTheHost) return;

    if (currentGame?.winnerId && !currentGame?.finished) {
      finishGameWithWinner(currentGame, match?.id);
    }
  }, [isCurrentUserTheHost]);

  // Create a new game once there is no unfinished game
  useEffect(() => {
    if (!isCurrentUserTheHost) return;

    if (!currentGame) {
      findOrCreateGame(match);
    }
  }, [isCurrentUserTheHost, currentGame]);

  // @TODO: remove this. Only for debug purposes
  useEffect(() => console.log('currentGame: ', currentGame), [currentGame]);

  // Save score data in database
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

  const onStateChange = (state: GameStateType) => {
    if (isCurrentUserTheHost && !currentGame?.winnerId) {
      setGameState(match?.id, currentGame?.id, state);
    }

    if (state === 'MATCH_READY') {
      setIsGameActive(false);

      if (isCurrentUserTheHost) {
        finishGameWithWinner(currentGame, match?.id);
      }
    }

    if (state === 'MATCH_IN_PROGRESS') {
      setIsGameActive(true);
    }

    if (state === 'MATCH_FINISHED') {
      setIsGameActive(false);
      if (isCurrentUserTheHost) {
        const winnerId = getWinnerId(match);
        setWinner(match?.id, currentGame?.id, winnerId);
      }
    }

    // READY
    // - Find Open Game or Create Game
    // ON GOING
    // - Store each kill and shot
    // FINISHED
    // - Store the winner
  };

  return (
    <div className="multi-player-game-dashboard">
      <Card className="multi-player-game-dashboard__card">
        <Gutter size="md">
          <MultiPlayerGameDashboardMatch
            onStateChange={onStateChange}
            onKill={() => dispatchKillCounter('add')}
            onShot={() => dispatchShotCounter('add')}
            onResetScore={cleanScore}
            isCurrentUserTheHost={isCurrentUserTheHost}
            remoteGameState={currentGame?.gameState}
          />
        </Gutter>
      </Card>
    </div>
  );
}

function finishGameWithWinner(game?: GameType, matchId?: string) {
  if (!matchId || !game?.id) return;

  if (!game?.winnerId || game?.finished) return;

  setGameInFirebase({
    matchId: matchId,
    data: { id: game?.id, finished: true },
  });
}

function getWinnerId(match?: MatchType) {
  const currentGame = findCurrentGame(match);
  const hostFinalScore = calcFinalScore(
    currentGame?.hostData?.shotCounter || 0,
    currentGame?.hostData?.killCounter || 0
  );

  const guestFinalScore = calcFinalScore(
    currentGame?.guestData?.shotCounter || 0,
    currentGame?.guestData?.killCounter || 0
  );

  return guestFinalScore === hostFinalScore
    ? 'DRAW'
    : guestFinalScore > hostFinalScore
      ? match?.guestId
      : match?.hostId;
}

function setWinner(matchId?: string, gameId?: string, winnerId?: string) {
  if (!matchId || !gameId || !winnerId) return;

  setGameInFirebase({
    matchId: matchId,
    data: { id: gameId, winnerId },
  });
}

function setGameState(
  matchId?: string,
  gameId?: string,
  gameState?: GameStateType
) {
  if (!matchId || !gameId || !gameState) return;

  setGameInFirebase({
    matchId: matchId,
    data: { id: gameId, gameState },
  });
}

function findOrCreateGame(match?: MatchType) {
  if (findCurrentGame(match)) {
    return;
  }

  if (match?.id) {
    createGameInFirebase({
      matchId: match?.id,
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
