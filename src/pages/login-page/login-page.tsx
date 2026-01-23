import { SignInButton } from 'src/features/authentication/sign-in-button';
import './login-page.scss';
import { loadNewPage } from 'src/services/route-service';

export function LoginPage() {
  return (
    <div className="login-page">
      <img className="login-page__bg" src="/images/sign-in-bg.jpg" />
      <div className="login-page__box">
        <SignInButton onSuccess={() => loadNewPage('/')} />
      </div>
    </div>
  );
}
