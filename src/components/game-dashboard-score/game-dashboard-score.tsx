import { Button } from '../button';
import { ButtonGroup } from '../button-group';

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
    <>
      <section className="bat-game-score-section">
        <div>
          <div className="score-section-label">Your Score</div>
          <div className="score-section-score">{killCounter}</div>
        </div>
        <ButtonGroup>
          <div>
            <div>Accuracy</div>
            <div style={{ textAlign: 'center' }}>{accuracy}%</div>
          </div>
          <Button kind="text" disabled={resetDisabled} onClick={onResetScore}>
            Reset
          </Button>
          <Button
            kind="primary"
            disabled={sendBatDisabled}
            onClick={onCreateBat}
          >
            Send Bat
          </Button>
        </ButtonGroup>
      </section>
      <style>{`
        .score-section-label {
          margin-bottom: 12px;
          display: inline-block;
        }
        .score-section-score: {
          font-size: 100px;
          text-align: center;
        },
      `}</style>
    </>
  );
}
