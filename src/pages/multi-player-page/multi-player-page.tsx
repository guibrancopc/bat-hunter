import { useEffect } from 'react';
import { GameDashboard } from 'src/features/game-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './multi-player-page.scss';

export function MultiPlayerPage() {
  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <div className="multi-player-page">
      <GameDashboard />
      <MusicToggle />
    </div>
  );
}
