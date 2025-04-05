import { useState } from 'react';
import { GameDashboard } from './features/game-dashboard';
import { WelcomeModal } from './features/welcome-modal';
import { playBackgroundMusic } from './services/audio-service';

function App() {
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);

  function initGame() {
    playBackgroundMusic();
    setWelcomeModalOpen(false);
  }

  return (
    <>
      {welcomeModalOpen ? (
        <WelcomeModal onClick={initGame} />
      ) : (
        <GameDashboard />
      )}
    </>
  );
}

export default App;
