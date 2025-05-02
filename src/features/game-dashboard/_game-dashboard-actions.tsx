import { Button } from '@components/button';
import { ButtonGroup } from '@components/button-group';
import { NavLink } from 'react-router';

export function GameDashboardActions({
  buttonsDisabled = false,
  onCleanBats = () => {},
}) {
  return (
    <section>
      <ButtonGroup flex>
        <NavLink to={'/'}>
          <Button kind="tertiary" disabled={buttonsDisabled}>
            Close
          </Button>
        </NavLink>
        <Button
          kind="tertiary"
          disabled={buttonsDisabled}
          onClick={onCleanBats}
        >
          Clean Bats
        </Button>
      </ButtonGroup>
    </section>
  );
}
