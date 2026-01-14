import './multi-player-main-dashboard.scss';
import { calcAccuracy, calcFinalScore } from 'src/services/game-service';
import { Card, Divider, Gutter } from '@components';
import { MultiPlayerMainDashboardScore } from './_multi-player-main-dashboard-score';
import { useAuthContext } from 'src/features/authentication';
import { ProfileSection } from '@components/profile-section/profile-section';
import { MatchType } from 'src/models/match-model';

export function counterReducer(state: number, action: string) {
  return action === 'add' ? state + 1 : 0;
}

export function MultiPlayerMainDashboard({ match }: { match?: MatchType }) {
  const { currentUser } = useAuthContext();

  const currentGame = match?.games?.find((game) => !game?.winner?.userId);

  const shotCounter = currentGame?.hostData?.shotCounter || 0;
  const killCounter = currentGame?.hostData?.killCounter || 0;

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
