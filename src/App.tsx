import { useState } from 'react';
import { GameDashboard } from './features/game-dashboard';
import { WelcomeModal } from './features/welcome-modal';
import { MusicToggle } from './features/music-toogle';
import { enableBatGame } from './services/game-service';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/home-page';

export function App() {
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);

  function initGame() {
    enableBatGame();
    setWelcomeModalOpen(false);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="single-player"
          element={
            <>
              {welcomeModalOpen ? (
                <WelcomeModal onClick={initGame} />
              ) : (
                <GameDashboard />
              )}
              <MusicToggle />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
