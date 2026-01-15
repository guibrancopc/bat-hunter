import { useMemo } from 'react';
import { useAuthContext } from 'src/features/authentication';
import { MatchType } from 'src/models/match-model';
import { findCurrentGame } from 'src/services/game-service';

export function useGameCounters({
  match,
  playerKind,
}: {
  match?: MatchType;
  playerKind: 'currentUser' | 'oponent';
}) {
  const { currentUser } = useAuthContext();

  const currentGame = useMemo(() => findCurrentGame(match), [match]);

  return useMemo(() => {
    const isCurrentUserTheHost =
      match?.hostId && match?.hostId === currentUser?.id;

    if (isCurrentUserTheHost && playerKind === 'currentUser') {
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
