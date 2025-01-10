import { Button, ButtonGroup, Gutter, Text, Title } from '@components';

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
        <Title>Your Score</Title>
        <div className="text-center">
          <Gutter margin={4}>
            <Text size="xl">{killCounter}</Text>
          </Gutter>
        </div>
        <div></div>
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
