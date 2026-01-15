import './multi-player-main-dashboard.scss';
import { calcAccuracy, calcFinalScore } from 'src/services/game-service';
import { Card, Divider, Gutter } from '@components';
import { MultiPlayerMainDashboardScore } from './_multi-player-main-dashboard-score';
import { useAuthContext } from 'src/features/authentication';
import { ProfileSection } from '@components/profile-section/profile-section';
import { MatchType } from 'src/models/match-model';
import { useGameCounters } from 'src/hooks/game-counters-hook';

export function MultiPlayerMainDashboard({ match }: { match?: MatchType }) {
  const { currentUser } = useAuthContext();

  const { shotCounter, killCounter } = useGameCounters({
    match,
    playerKind: 'currentUser',
  });

  const accuracy = calcAccuracy(shotCounter, killCounter);
  const finalScore = calcFinalScore(shotCounter, killCounter);

  return (
    <div className="multi-player-main-dashboard">
      <Card>
        <Gutter size="md">
          <MultiPlayerMainDashboardScore
            killCounter={killCounter}
            accuracy={accuracy}
            finalScore={finalScore}
          />
        </Gutter>
        <Divider />
        <Gutter size="md">
          <ProfileSection image={currentUser?.picture} name="You" />
        </Gutter>
      </Card>
    </div>
  );
}
