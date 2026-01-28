import { useEffect, useState } from 'react';
import { MultiPlayerMainDashboard } from 'src/features/multi-player/multi-player-main-dashboard';
import { MultiPlayerOpponentDashboard } from 'src/features/multi-player/multi-player-opponent-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './multi-player-page.scss';
import { useAuthContext } from 'src/features/authentication';
import { useParams } from 'react-router';
import {
  getMatchDataReactivelyFromFirebase,
  MatchType,
} from 'src/models/match-model';
import { MultiPlayerGameDashboard } from 'src/features/multi-player/multi-player-game-dashboard';
import { MultiPlayerChat } from 'src/features/multi-player/multi-player-chat';
import { isLoggedIn } from 'src/services/authentication-service';
import { SignInModal } from 'src/features/sign-in-modal/sign-in-modal';
import { MultiPlayerContextProvider } from 'src/features/multi-player/multi-player-context';

export function MultiPlayerPage() {
  const { currentUser } = useAuthContext();

  const { matchId } = useParams<{ matchId?: string }>();
  const [currentMatch, setCurrentMatch] = useState<MatchType>();
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  useEffect(() => {
    if (matchId) {
      getMatchDataReactivelyFromFirebase(matchId, setCurrentMatch);
    }
  }, [matchId]);

  useEffect(() => {
    if (!currentUser?.id && !isLoggedIn()) {
      setSignInModalOpen(true);
    }
  }, [currentUser]);

  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <div className="multi-player-page">
      <MultiPlayerContextProvider>
        <SignInModal
          open={signInModalOpen}
          onClose={() => setSignInModalOpen(false)}
        />
        <MultiPlayerMainDashboard match={currentMatch} />
        <MultiPlayerOpponentDashboard match={currentMatch} />
        <MultiPlayerGameDashboard match={currentMatch} />
        <MultiPlayerChat match={currentMatch} />
        <MusicToggle />
      </MultiPlayerContextProvider>
    </div>
  );
}
