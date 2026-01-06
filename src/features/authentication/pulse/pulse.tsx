import { useEffect } from 'react';
import { useAuthContext } from '../auth-context';
import { isLoggedIn } from 'src/services/authentication-service';
import { debounce } from 'src/services/debounce-service';

let lastPulseAt = 0;
const DELAY_IN_SECONDS = 20 * 1000;

export function Pulse() {
  const { setCurrentUser } = useAuthContext();

  useEffect(() => {
    debounce(() =>
      onEveryUserClick(() => {
        if (!isLoggedIn()) return;

        const now = Date.now();

        if (now > lastPulseAt + DELAY_IN_SECONDS) {
          lastPulseAt = now;
          setCurrentUser({ lastPulseAt: now });
        }
      })
    );
  }, []);

  return <></>;
}

function onEveryUserClick(cb: () => void) {
  window.document.addEventListener('click', cb);
}
