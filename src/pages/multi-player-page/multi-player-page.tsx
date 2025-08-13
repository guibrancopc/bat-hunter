import { useEffect } from 'react';
import { MultiPlayerMainDashboard } from 'src/features/multi-player-main-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './multi-player-page.scss';

export function MultiPlayerPage() {
  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <div className="multi-player-page">
      <MultiPlayerMainDashboard />
      <MusicToggle />
    </div>
  );
}
