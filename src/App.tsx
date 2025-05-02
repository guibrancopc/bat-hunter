import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/home-page';
import { SinglePlayerPage } from './pages/single-player';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="single-player" element={<SinglePlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
