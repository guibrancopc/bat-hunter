import { useEffect, useState } from 'react';
import { MultiPlayerMainDashboard } from 'src/features/multi-player-main-dashboard';
import { MultiPlayerOpponentDashboard } from 'src/features/multi-player-opponent-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './multi-player-page.scss';
import { useAuthContext } from 'src/features/authentication';
import { useParams } from 'react-router';
import {
  getMatchDataReactivelyFromFirebase,
  MatchType,
} from 'src/models/match-model';
import { MultiPlayerGameDashboard } from 'src/features/multi-player-game-dashboard';
import { MultiPlayerChat } from 'src/features/multi-player-chat';

export function MultiPlayerPage() {
  const { currentUser } = useAuthContext();

  const { matchId } = useParams<{ matchId?: string }>();
  const [currentMatch, setCurrentMatch] = useState<MatchType>();

  useEffect(() => {
    if (matchId) {
      getMatchDataReactivelyFromFirebase(matchId, setCurrentMatch);
    }
    console.log('currentMatch', currentMatch);
  }, [matchId]);

  useEffect(() => {
    console.log('currentUser', currentUser);

    if (!currentUser?.id) {
      alert('TEST BUG::CURRENT_USER_NOT_FOUND');
      // @TODO_BUG: IT'S LOGGIN USER OUT EVENTUALLY
      // alert(
      //   'You must sign in to play multi player. Please sign in to come back.'
      // );
      // navigate('/');
    }
  }, [currentUser]);

  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <div className="multi-player-page">
      <MultiPlayerMainDashboard match={currentMatch} />
      <MultiPlayerOpponentDashboard match={currentMatch} />
      <MultiPlayerGameDashboard match={currentMatch} />
      <MultiPlayerChat match={currentMatch} />
      <MusicToggle />
    </div>
  );
}
