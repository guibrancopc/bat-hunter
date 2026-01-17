import { useEffect, useMemo, useReducer, useState } from 'react';
import './multi-player-game-dashboard.scss';
import { MultiPlayerGameDashboardController } from './_multi-player-game-dashboard-controller';
import { Card, Gutter } from '@components';
import { MatchType } from 'src/models/match-model';
import {
  createGameInFirebase,
  GameStateType,
  GameType,
  setGameInFirebase,
  setGameState,
  setGameWinner,
  setPlayerDataInFirebase,
} from 'src/models/game-model';
import { calcFinalScore, findCurrentGame } from 'src/services/game-service';
import { useIsCurrentUserTheHost } from 'src/hooks/game-hooks';
import { MultiPlayerGameResultModal } from './_multi-player-game-result-modal';

export function MultiPlayerGameDashboard({ match }: { match?: MatchType }) {
  const isCurrentUserTheHost = useIsCurrentUserTheHost(match);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [killCounter, dispatchKillCounter] = useReducer(counterReducer, 0);
  const [shotCounter, dispatchShotCounter] = useReducer(counterReducer, 0);

  const currentGame = useMemo(() => {
    if (!match) return;

    return findCurrentGame(match);
  }, [match]);

  const isGameInProgress = useMemo(
    () => currentGame?.gameState === 'MATCH_IN_PROGRESS',
    [currentGame?.gameState]
  );

  // Finish game with winner when the page loads
  useEffect(() => {
    if (!isCurrentUserTheHost) return;

    if (currentGame?.winnerId && !isGameClosed(currentGame)) {
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

    if (match?.id && currentGame?.id && isGameInProgress)
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

  useEffect(() => {
    if (currentGame?.winnerId && !isGameClosed(currentGame)) {
      setOpenResultModal(true);
    }
  }, [currentGame?.winnerId, currentGame?.gameState]);

  const onStateChange = (state: GameStateType) => {
    if (isCurrentUserTheHost && !currentGame?.winnerId) {
      setGameState(match?.id, currentGame?.id, state);
    }

    if (state === 'MATCH_READY') {
      if (isCurrentUserTheHost) {
        finishGameWithWinner(currentGame, match?.id);
      }
    }

    if (state === 'MATCH_FINISHED') {
      if (isCurrentUserTheHost) {
        const winnerId = getWinnerId(match);
        setGameWinner(match?.id, currentGame?.id, winnerId);
      }
    }
  };

  return (
    <>
      <div className="multi-player-game-dashboard">
        <Card className="multi-player-game-dashboard__card">
          <Gutter size="md">
            <MultiPlayerGameDashboardController
              onKill={() => dispatchKillCounter('add')}
              onShot={() => dispatchShotCounter('add')}
              onStateChange={onStateChange}
              onResetScore={cleanScore}
              isCurrentUserTheHost={isCurrentUserTheHost}
              remoteGameState={currentGame?.gameState}
            />
          </Gutter>
        </Card>
      </div>
      <MultiPlayerGameResultModal
        open={openResultModal}
        onClose={() => setOpenResultModal(false)}
        match={match}
        game={currentGame}
      />
    </>
  );
}

function isGameClosed(game?: GameType) {
  return game?.gameState === 'MATCH_CLOSED';
}

function finishGameWithWinner(game?: GameType, matchId?: string) {
  if (!matchId || !game?.id) return;

  if (!game?.winnerId || isGameClosed(game)) return;

  setGameInFirebase({
    matchId: matchId,
    data: { id: game?.id, gameState: 'MATCH_CLOSED' },
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
