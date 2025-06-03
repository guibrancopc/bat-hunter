import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { clearUserSession } from 'src/services/authentication-service';
import { disableBatGame, killAllBats } from 'src/services/game-service';
import { AuthContext } from 'src/features/authentication';

export function LogoutPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

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
