import { NavLink } from 'react-router';
import './navbar.scss';
import { Avatar } from '../avatar';

export function Navbar() {
  return (
    <div className="bh-navbar">
      <div className="bh-navbar__left">
        <NavLink to="/">
          <img className="bh-navbar-logo" src="/images/logo.png" />
        </NavLink>
      </div>
      <div className="bh-navbar__right">
        <div className="bh-navbar__greetings">Hi guest!</div>{' '}
        <Avatar src="/images/user-sm.jpg" />
        <a>
          <div>Sign in</div>
        </a>
      </div>
    </div>
  );
}
