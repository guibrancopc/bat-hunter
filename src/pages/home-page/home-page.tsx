import { useEffect } from 'react';
import { NavLink } from 'react-router';
import { Button } from 'src/components';
import { disableBatGame } from 'src/services/game-service';

export function HomePage() {
  useEffect(() => {
    disableBatGame();
  }, []);

  return (
    <div className="text-center">
      HOME PAGEEE
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <NavLink to="/single-player">
        <Button kind="primary">Play Single</Button>
      </NavLink>
    </div>
  );
}
