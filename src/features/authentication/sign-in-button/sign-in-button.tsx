import './sign-in-button.scss';
import { useEffect } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import {
  setUserSessionHashInLocalStorage,
  verboseJwt,
} from 'src/services/authentication-service';
import { disableBatGame, killAllBats } from 'src/services/game-service';
import { useAuthContext } from 'src/features/authentication';
import { enforceUTF8Encoding } from 'src/services/encoding-service';

export function SignInButton({ onSuccess }: { onSuccess?: () => void }) {
  useEffect(() => {
    disableBatGame();
    killAllBats();
  }, []);

  const { setCurrentUser } = useAuthContext();

  function _onSuccess(r: CredentialResponse) {
    if (!r.credential) {
      console.error('Error on Google Sign In - No credential was provided.');
      return;
    }

    const userSession = verboseJwt(r.credential);

    const fixedUserSession = {
      ...userSession,
      firstName: enforceUTF8Encoding(userSession?.firstName || ''),
      lastName: enforceUTF8Encoding(userSession?.lastName || ''),
      name: enforceUTF8Encoding(userSession?.name || ''),
    };

    if (userSession) {
      setCurrentUser(fixedUserSession);
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
