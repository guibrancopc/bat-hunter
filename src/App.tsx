import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { SinglePlayerPage } from './pages/single-player';
import { Navbar } from './components/navbar';
import './App.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './features/authentication';
import { LogoutPage } from './pages/logout-page';

export function App() {
  return (
    <GoogleOAuthProvider clientId="843345895015-3deqgfmkmhfthrsmrf1ujbvpajgnopi3.apps.googleusercontent.com">
      <AuthContextProvider>
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
                <Route path="logout" element={<LogoutPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}
