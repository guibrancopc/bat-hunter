import { useEffect } from 'react';
import { clearUserSession } from 'src/services/authentication-service';
import { loadNewPage } from 'src/services/route-service';

export function LogoutPage() {
  useEffect(() => {
    // disableBatGame();
    // killAllBats();
    // setCurrentUser(null);
    clearUserSession();
    loadNewPage('/');
  }, []);

  return <div className="logout-page">Loading...</div>;
}
