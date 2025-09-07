import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { clearUserSession } from 'src/services/authentication-service';
import { disableBatGame, killAllBats } from 'src/services/game-service';
import { useAuthContext } from 'src/features/authentication';

export function LogoutPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();

  useEffect(() => {
    disableBatGame();
    killAllBats();
    clearUserSession();
    setCurrentUser(null);
    navigate('/');
  }, []);

  return (
    <div className="logout-page" style={{ color: 'white', fontSize: '239px' }}>
      Loading...
    </div>
  );
}
