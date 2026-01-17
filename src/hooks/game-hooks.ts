import { useEffect, useState, useMemo } from 'react';
import { useAuthContext } from 'src/features/authentication';
import { MatchType } from 'src/models/match-model';
import { findLastGame } from 'src/services/game-service';
import { createBat } from 'src/services/fly-engine-service';
import { getIsGameModeOn, setBodyOnClick } from 'src/services/game-service';
import { isShotEnabled, ShotEventType } from 'src/services/shot-service';

export function useIsCurrentUserTheHost(match?: MatchType) {
  const { currentUser } = useAuthContext();

  return useMemo(
    () => Boolean(match?.hostId && match?.hostId === currentUser?.id),
    [match, currentUser]
  );
}

export function useGameCounters({
  match,
  playerKind,
}: {
  match?: MatchType;
  playerKind: 'main' | 'opponent';
}) {
  const { currentUser } = useAuthContext();

  const currentGame = useMemo(() => findLastGame(match), [match]);
  const isCurrentUserTheHost = useIsCurrentUserTheHost(match);

  return useMemo(() => {
    if (
      (isCurrentUserTheHost && playerKind === 'main') ||
      (!isCurrentUserTheHost && playerKind === 'opponent')
    ) {
      return {
        shotCounter: currentGame?.hostData?.shotCounter || 0,
        killCounter: currentGame?.hostData?.killCounter || 0,
      };
    }

    return {
      shotCounter: currentGame?.guestData?.shotCounter || 0,
      killCounter: currentGame?.guestData?.killCounter || 0,
    };
  }, [match, currentUser]);
}

export function useGameCounterTriggers({
  onShot,
  onKill,
}: {
  onShot: () => void;
  onKill: () => void;
}) {
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);
  const createControlledBat = () => createBat(() => isScoreEnabled && onKill());

  useEffect(() => {
    setBodyOnClick((e: ShotEventType) => {
      if (isScoreEnabled && getIsGameModeOn() && isShotEnabled(e)) {
        onShot();
      }
    });
  }, [isScoreEnabled]);

  return {
    createControlledBat,
    setIsScoreEnabled,
  };
}
