import { Button } from '@components/button';
import { ButtonGroup } from '@components/button-group';

export function GameDashboardActions({
  buttonsDisabled = false,
  onClose = () => {},
  onCleanBats = () => {},
}) {
  return (
    <section>
      <ButtonGroup flex>
        <Button kind="tertiary" disabled={buttonsDisabled} onClick={onClose}>
          Close
        </Button>
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
