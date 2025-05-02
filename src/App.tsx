import { useState } from 'react';
import { GameDashboard } from './features/game-dashboard';
import { WelcomeModal } from './features/welcome-modal';
import { MusicToggle } from './features/music-toogle';
import { enableBatGame } from './services/game-service';

function App() {
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);

  function initGame() {
    enableBatGame();
    setWelcomeModalOpen(false);
  }

  return (
    <>
      {welcomeModalOpen ? (
        <WelcomeModal onClick={initGame} />
      ) : (
        <GameDashboard />
      )}
      <MusicToggle />
    </>
  );
}

export default App;
