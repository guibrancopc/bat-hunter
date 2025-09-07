import { useEffect } from 'react';
import { useAuthContext } from '../auth-context';
import { isLoggedIn } from 'src/services/authentication-service';

export function Pulse() {
  const TEN_SECONDS = 30 * 1000;
  const { setCurrentUser } = useAuthContext();

  useEffect(() => {
    const id = setInterval(() => {
      if (isLoggedIn()) {
        console.log('pulsed!', Date.now());

        setCurrentUser({
          lastPulseAt: Date.now(),
        });
      }
    }, TEN_SECONDS);

    console.log('setInterval inited!', id);
  }, []);

  return <></>;
}
