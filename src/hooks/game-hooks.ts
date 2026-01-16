import { useMemo } from 'react';
import { useAuthContext } from 'src/features/authentication';
import { MatchType } from 'src/models/match-model';
import { findLastGame } from 'src/services/game-service';

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
