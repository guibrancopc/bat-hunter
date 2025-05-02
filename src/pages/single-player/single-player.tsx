import { useEffect } from 'react';
import { GameDashboard } from 'src/features/game-dashboard';
import { MusicToggle } from 'src/features/music-toogle';
import { enableBatGame } from 'src/services/game-service';

export function SinglePlayerPage() {
  useEffect(() => {
    enableBatGame();
  }, []);

  return (
    <>
      <GameDashboard />
      <MusicToggle />
    </>
  );
}
