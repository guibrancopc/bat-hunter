import { NavLink } from 'react-router';
import { Button } from 'src/components';

export function HomePage() {
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
