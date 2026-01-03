import './multi-player-main-dashboard.scss';
import { useReducer } from 'react';
import { calcAccuracy, calcFinalScore } from 'src/services/game-service';
import { Card, Divider, Gutter } from '@components';
import { MultiPlayerMainDashboardScore } from './_multi-player-main-dashboard-score';
import { useAuthContext } from 'src/features/authentication';
import { ProfileSection } from '@components/profile-section/profile-section';
// import { MatchType } from 'src/models/match-model';
import { MultiPlayerGameDashboard } from '../multi-player-game-dashboard';

export function counterReducer(state: number, action: string) {
  return action === 'add' ? state + 1 : 0;
}

export function MultiPlayerMainDashboard() {
  const { currentUser } = useAuthContext();
  // const [currentMatch, setCurrentMatch] = useState<MatchType>();

  const killCounterReducer = useReducer(counterReducer, 0);
  const shotCounterReducer = useReducer(counterReducer, 0);

  const [killCounter] = killCounterReducer;
  const [shotCounter] = shotCounterReducer;

  const accuracy = calcAccuracy(shotCounter, killCounter);
  const finalScore = calcFinalScore(shotCounter, killCounter);

  return (
    <>
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
      <MultiPlayerGameDashboard
        killCounterReducer={killCounterReducer}
        shotCounterReducer={shotCounterReducer}
      />
    </>
  );
}
