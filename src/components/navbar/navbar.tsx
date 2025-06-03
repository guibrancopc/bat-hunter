import { NavLink } from 'react-router';
import './navbar.scss';
import { Avatar } from '../avatar';
import { AuthContext } from 'src/features/authentication';
import { useContext, useEffect } from 'react';

export function Navbar() {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log('NAVBAR: ', currentUser);
  });

  const name = currentUser ? currentUser.firstName : 'guest';
  const picture = currentUser ? currentUser.picture : '/images/user-sm.jpg';

  return (
    <div className="bh-navbar">
      <div className="bh-navbar__left">
        <NavLink to="/">
          <img className="bh-navbar-logo" src="/images/logo.png" />
        </NavLink>
      </div>
      <div className="bh-navbar__right">
        <div className="bh-navbar__greetings">Hi {name}!</div>{' '}
        <Avatar src={picture} />
        {currentUser ? (
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
