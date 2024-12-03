import { Button } from '@components/button';
import { ButtonGroup } from '@components/button-group';

type Props = {
  killCounter: number;
  accuracy: number;
  resetDisabled: boolean;
  sendBatDisabled: boolean;
  onCreateBat: () => void;
  onResetScore: () => void;
};

export function GameDashboardScore({
  killCounter = 0,
  accuracy = 100,
  resetDisabled = false,

  sendBatDisabled = false,
  onCreateBat = () => {},
  onResetScore = () => {},
}: Props) {
  return (
    <section className="bat-game-score-section">
      <div>
        <div>Your Score</div>
        <div>{killCounter}</div>
      </div>
      <ButtonGroup flex>
        <div>
          <div>Accuracy</div>
          <div style={{ textAlign: 'center' }}>{accuracy}%</div>
        </div>
        <Button kind="tertiary" disabled={resetDisabled} onClick={onResetScore}>
          Reset
        </Button>
        <Button kind="primary" disabled={sendBatDisabled} onClick={onCreateBat}>
          Send Bat
        </Button>
      </ButtonGroup>
    </section>
  );
}
