import { useEffect } from 'react';
import { SinglePlayerDashboard } from 'src/features/single-player-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './multi-player-page.scss';

export function MultiPlayerPage() {
  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <div className="multi-player-page">
      <SinglePlayerDashboard />
      <MusicToggle />
    </div>
  );
}
