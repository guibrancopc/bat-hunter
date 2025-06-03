import { useContext, useEffect } from 'react';
import './login-page.scss';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { verboseJwt } from 'src/services/authentication-service';
import { useNavigate } from 'react-router';
import { setLocalStorageValue } from 'src/services/local-storage-service';
import { disableBatGame, killAllBats } from 'src/services/game-service';
import { AuthContext } from 'src/features/authentication';

export function LoginPage() {
  useEffect(() => {
    disableBatGame();
    killAllBats();
  }, []);

  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function onSuccess(r: CredentialResponse) {
    const userSession = r.credential && verboseJwt(r.credential);

    console.log('response: ', r);
    console.log('user: ', userSession);

    if (userSession) {
      setCurrentUser(userSession);
      setLocalStorageValue('bh-user-session', r.credential);
      navigate('/');
    }
  }

  return (
    <div className="login-page">
      <div className="box">
        <div>
          <GoogleLogin
            locale="en-US"
            shape="rectangular"
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
      </div>
    </div>
  );
}

function onError() {
  alert('Ops! Something wrong happened. Try again.');
  console.error('Google Sign In Error');
}
