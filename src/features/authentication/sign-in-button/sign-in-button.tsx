import { useContext, useEffect } from 'react';
import './sign-in-button.scss';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { verboseJwt } from 'src/services/authentication-service';
import { setLocalStorageValue } from 'src/services/local-storage-service';
import { disableBatGame, killAllBats } from 'src/services/game-service';
import { AuthContext } from 'src/features/authentication';
import { setUserData } from 'src/models/user-model';
import clsx from 'clsx';

export function SignInButton({
  custom,
  onSuccess,
}: {
  custom?: boolean;
  onSuccess?: () => void;
}) {
  useEffect(() => {
    disableBatGame();
    killAllBats();
  }, []);

  const { setCurrentUser } = useContext(AuthContext);

  function _onSuccess(r: CredentialResponse) {
    const userSession = r.credential && verboseJwt(r.credential);

    console.log('response: ', r);
    console.log('user: ', userSession);

    if (userSession) {
      setUserData(userSession);
      setCurrentUser(userSession);
      setLocalStorageValue('bh-user-session', r.credential);
      onSuccess?.();
    }
  }

  return (
    <>
      <div
        className={clsx('sign-in-button', custom && 'sign-in-button--custom')}
      >
        <GoogleLogin
          locale="en-US"
          shape="circle"
          onSuccess={_onSuccess}
          onError={onError}
        />
      </div>
      <style>{`
        .sign-in-button {
          display: none;
        }
      `}</style>
    </>
  );
}

function onError() {
  alert('Ops! Something wrong happened. Try again.');
  console.error('Google Sign In Error');
}
