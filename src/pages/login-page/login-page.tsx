import { useEffect } from 'react';
import './login-page.scss';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { verboseJwt } from 'src/services/jwt-service';
import { useNavigate } from 'react-router';

export function LoginPage() {
  useEffect(() => {
    // disableBatGame();
  }, []);

  const navigate = useNavigate();

  function onSuccess(r: CredentialResponse) {
    console.log('response: ', r);
    console.log('user: ', verboseJwt(r.credential || ''));
    navigate('/');
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
