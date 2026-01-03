import { useEffect } from 'react';
import { MultiPlayerMainDashboard } from 'src/features/multi-player-main-dashboard';
import { MultiPlayerOpponentDashboard } from 'src/features/multi-player-opponent-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './multi-player-page.scss';
import { useAuthContext } from 'src/features/authentication';
import { useNavigate } from 'react-router';

export function MultiPlayerPage() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

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
      <MultiPlayerMainDashboard />
      <MultiPlayerOpponentDashboard />
      <MusicToggle />
    </div>
  );
}
