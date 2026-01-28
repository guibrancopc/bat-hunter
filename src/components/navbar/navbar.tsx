import { NavLink } from 'react-router';
import './navbar.scss';
import { Avatar } from '@components';
import { useAuthContext } from 'src/features/authentication';

export function Navbar() {
  const { currentUser } = useAuthContext();
  const isValidCurrentUser = currentUser?.id;

  const name = isValidCurrentUser ? currentUser.firstName : 'guest';
  const picture = isValidCurrentUser
    ? currentUser.picture
    : '/images/user-sm.jpg';

  return (
    <div className="bh-navbar">
      <div className="bh-navbar__left">
        <NavLink to="/">
          <img
            className="bh-navbar-logo"
            src="/images/logo.png"
            alt="BatHunter logo"
            title="Bat Hunter"
          />
        </NavLink>
      </div>
      <div className="bh-navbar__right">
        <div className="bh-navbar__greetings">Hi {name}!</div>{' '}
        <Avatar src={picture} />
        {isValidCurrentUser ? (
          <NavLink to="/logout">
            <div>Sign out</div>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <div>Sign in</div>
          </NavLink>
        )}
      </div>
    </div>
  );
}
