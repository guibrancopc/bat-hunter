import { useEffect, useState } from 'react';
import { useAuthContext } from '../auth-context';
import { isLoggedIn } from 'src/services/authentication-service';

// @TODO: remove the pulse logic and replace by another strategy to identify idle player
export function Pulse() {
  const THIRDY_SECONDS = 30 * 1000;
  const [lastPulseAt, setLastPulseAt] = useState(0);
  const { setCurrentUser } = useAuthContext();

  useEffect(() => {
    debounce(() => {
      onEveryUserClick(() => {
        if (!isLoggedIn()) return;

        console.log('ON_CLICK');
        const now = Date.now();

        if (now > lastPulseAt + THIRDY_SECONDS) {
          setLastPulseAt(now);
          setCurrentUser({ lastPulseAt: now });
        }
      });
    });
  }, []);

  return <></>;
}

// @TODO: Any better way of implementing the debounce?
let runToggle = true;
function debounce(cb: () => void, wait = 1000) {
  if (runToggle) {
    cb?.();
    runToggle = false;
  }

  setTimeout(() => {
    runToggle = true;
  }, 5 * 1000);
}

function onEveryUserClick(cb: () => void) {
  window.document.addEventListener('click', cb);
}
