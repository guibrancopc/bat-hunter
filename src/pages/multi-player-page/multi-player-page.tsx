import { useContext, useEffect } from 'react';
import { MultiPlayerMainDashboard } from 'src/features/multi-player-main-dashboard';
import { MultiPlayerGuestDashboard } from 'src/features/multi-player-guest-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './multi-player-page.scss';
import { AuthContext } from 'src/features/authentication';
import { Modal } from 'src/components';
import { useNavigate } from 'react-router';

export function MultiPlayerPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      alert(
        'You must sign in to play multi player. Please sign in to come back.'
      );
      navigate('/');
    }
  }, [currentUser]);

  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <div className="multi-player-page">
      <MultiPlayerMainDashboard />
      <MultiPlayerGuestDashboard />
      <MusicToggle />
    </div>
  );
}
