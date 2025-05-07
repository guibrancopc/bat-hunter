import { useEffect } from 'react';
import { NavLink } from 'react-router';
import { Button } from 'src/components';
import { disableBatGame } from 'src/services/game-service';
import './home-page.scss';

export function HomePage() {
  useEffect(() => {
    disableBatGame();
  }, []);

  return (
    <div className="home-page">
      <img className="home-page-bg" src="/images/sniper-aim-bg.jpg" />
      <div className="box">
        <div className="text">Too many bats, time to drop some.</div>
        <br />
        <NavLink to="/single-player">
          <Button kind="primary">Play Single</Button>
        </NavLink>
      </div>
    </div>
  );
}
