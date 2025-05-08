import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/home-page';
import { SinglePlayerPage } from './pages/single-player';
import { Navbar } from './components/navbar';
import './App.scss';

export function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="single-player" element={<SinglePlayerPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
