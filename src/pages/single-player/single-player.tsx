import { useEffect } from 'react';
import { GameDashboard } from 'src/features/game-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';
import './single-player.scss';

export function SinglePlayerPage() {
  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <div className="single-player-page">
      <GameDashboard />
      <MusicToggle />
    </div>
  );
}
