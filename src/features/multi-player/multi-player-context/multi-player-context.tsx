import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from 'src/features/authentication';
import {
  getMatchDataReactivelyFromFirebase,
  MatchType,
} from 'src/models/match-model';
import { getUserDataReactivelyFromFirebase } from 'src/models/user-model';
import { UserSessionType } from 'src/services/authentication-service';

const MultiPlayerContext = createContext({
  opponentUser: null,
  match: null,
} as {
  opponentUser: UserSessionType | null;
  match: MatchType | null | undefined;
});

export function MultiPlayerContextProvider({ children }: PropsWithChildren) {
  const [opponentUser, setOpponentUser] = useState<UserSessionType | null>(
    null
  );
  const [match, setMatch] = useState<MatchType | null | undefined>(null);
  const { currentUser } = useAuthContext();
  const { matchId } = useParams<{ matchId?: string }>();

  useEffect(() => {
    if (!matchId) {
      console.error(
        'MultiPlayerContextProvider::ERROR: no match id was provided'
      );
      return;
    }

    getMatchDataReactivelyFromFirebase(matchId, setMatch);
  }, [matchId]);

  useEffect(() => {
    if (!currentUser || !match) return;

    const isCurrentUserTheHost = match.hostId === currentUser.id;
    const opponentUserId = isCurrentUserTheHost ? match.guestId : match.hostId;

    if (opponentUserId) {
      getUserDataReactivelyFromFirebase(opponentUserId, setOpponentUser);
    }
  }, [currentUser, match]);

  return (
    <MultiPlayerContext.Provider value={{ opponentUser, match }}>
      {children}
    </MultiPlayerContext.Provider>
  );
}

export const useMultiPlayerContext = () => useContext(MultiPlayerContext);
