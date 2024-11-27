import { Button } from '../button';
import { ButtonGroup } from '../button-group';

export function MenuSectionActions({
  buttonsDisabled = false,
  onClose = () => {},
  onCleanBats = () => {},
}) {
  return (
    <section>
      <ButtonGroup>
        <Button kind="primary" disabled={buttonsDisabled} onClick={onClose}>
          Close
        </Button>
        <Button
          kind="secondary"
          disabled={buttonsDisabled}
          onClick={onCleanBats}
        >
          Clean Bats
        </Button>
      </ButtonGroup>
    </section>
  );
}
