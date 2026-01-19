import { useEffect, useState } from 'react';
import { useAuthContext } from '../auth-context';
import { isLoggedIn } from 'src/services/authentication-service';
import { debounce } from 'src/services/debounce-service';

const DELAY_IN_SECONDS = 20 * 1000;

export function Pulse() {
  const { setCurrentUser } = useAuthContext();
  const [lastClickAt, setLastClickAt] = useState(0);

  useEffect(() => {
    debounce(() =>
      onEveryUserClick(() => {
        if (!isLoggedIn()) return;

        const now = Date.now();

        if (now > lastClickAt + DELAY_IN_SECONDS) {
          setLastClickAt(now);
          setCurrentUser({ lastClickAt: now, away: false });
        }
      })
    );

    onBlur(() => setCurrentUser({ away: true }));
    onFocus(() => setCurrentUser({ away: false }));
  }, []);

  return <></>;
}

function onEveryUserClick(cb: () => void) {
  window.document.addEventListener('click', cb);
}

function onBlur(cb: () => void) {
  window.addEventListener('blur', cb);
}

function onFocus(cb: () => void) {
  window.addEventListener('focus', cb);
}
