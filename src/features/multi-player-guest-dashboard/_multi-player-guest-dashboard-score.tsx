import { Gutter, Text, Title } from '@components';
import { Gap } from 'src/components/gap';

type Props = {
  killCounter: number;
  accuracy: number;
  finalScore: number;
};

export function MultiPlayerGuestDashboardScore({
  killCounter = 0,
  accuracy = 100,
  finalScore = 0,
}: Props) {
  return (
    <section className="bat-game-score-section">
      <div>
        <Title>Bidjei's Score</Title>
        <div className="text-center">
          <Gutter size="lg">
            <Text size="xl">{killCounter}</Text>
          </Gutter>
        </div>
      </div>

      <Gap justify="space-around">
        <div>
          <div>Accuracy</div>
          <div className="text-center">{accuracy}%</div>
        </div>
        <div>
          <div>Final Score</div>
          <div className="text-center">{finalScore}</div>
        </div>
      </Gap>
    </section>
  );
}
