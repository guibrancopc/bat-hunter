import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { SinglePlayerPage } from './pages/single-player';
import { Navbar } from './components/navbar';
import './App.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

export function App() {
  return (
    <GoogleOAuthProvider clientId="843345895015-3deqgfmkmhfthrsmrf1ujbvpajgnopi3.apps.googleusercontent.com">
      <div className="app-container">
        <BrowserRouter>
          <header>
            <Navbar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="single-player" element={<SinglePlayerPage />} />
              <Route path="login" element={<LoginPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}
