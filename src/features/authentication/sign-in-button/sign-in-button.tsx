import './sign-in-button.scss';
import { useEffect } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import {
  setUserSessionHashInLocalStorage,
  verboseJwt,
} from 'src/services/authentication-service';
import { disableBatGame, killAllBats } from 'src/services/game-service';
import { useAuthContext } from 'src/features/authentication';

export function SignInButton({ onSuccess }: { onSuccess?: () => void }) {
  useEffect(() => {
    disableBatGame();
    killAllBats();
  }, []);

  const { setCurrentUser } = useAuthContext();

  function _onSuccess(r: CredentialResponse) {
    const userSession = r.credential && verboseJwt(r.credential);

    if (userSession) {
      setCurrentUser(userSession);
      setUserSessionHashInLocalStorage(r.credential);
      onSuccess?.();
    }
  }

  return (
    <div className="sign-in-button">
      <GoogleLogin
        locale="en-US"
        shape="circle"
        onSuccess={_onSuccess}
        onError={onError}
      />
    </div>
  );
}

function onError() {
  alert('Ops! Something wrong happened. Try again.');
  console.error('Google Sign In Error');
}
