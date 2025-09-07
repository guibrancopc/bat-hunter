import { useEffect } from 'react';
import { useAuthContext } from '../auth-context';
import { isLoggedIn } from 'src/services/authentication-service';

export function Pulse() {
  const TEN_SECONDS = 30 * 1000;
  const { setCurrentUser } = useAuthContext();

  useEffect(() => {
    setInterval(() => {
      if (isLoggedIn()) {
        setCurrentUser({
          lastPulseAt: Date.now(),
        });
      }
    }, TEN_SECONDS);
  }, []);

  return <></>;
}
