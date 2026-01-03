import { useEffect, useReducer, useState } from 'react';
import './multi-player-main-dashboard.scss';
import {
  getIsGameModeOn,
  setBodyOnClick,
  calcAccuracy,
} from 'src/services/game-service';
import { createBat } from '@services/fly-engine-service';
import { Card, Divider, Gutter } from '@components';
import { isShotEnabled, ShotEventType } from '@services/shot-service';
import { MultiPlayerMainDashboardScore } from './_multi-player-main-dashboard-score';
import { useAuthContext } from 'src/features/authentication';
import { ProfileSection } from '@components/profile-section/profile-section';
// import { MatchType } from 'src/models/match-model';
import { MultiPlayerGameDashboard } from '../multi-player-game-dashboard';
import { MATCH_STATES } from '../multi-player-game-dashboard/_multi-player-main-dashboard-match';

export function counterReducer(state: number, action: string) {
  return action === 'add' ? state + 1 : 0;
}

export function MultiPlayerMainDashboard() {
  const { currentUser } = useAuthContext();
  // const [currentMatch, setCurrentMatch] = useState<MatchType>();

  // @TODO: move it to MultiPlayerGameDashboard component and populate this component with data coming from from FIREBASE
  // Create a context to share state with both score components
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);
  const [killCounter, dispatchKillCounter] = useReducer(counterReducer, 0);
  const [shotCounter, dispatchShotCounter] = useReducer(counterReducer, 0);
  const currentGameStateFull = useState(MATCH_STATES.MATCH_READY);

  const createControlledBat = () =>
    createBat(() => isScoreEnabled && dispatchKillCounter('add'));

  useEffect(() => {
    setBodyOnClick((e: ShotEventType) => {
      if (isScoreEnabled && getIsGameModeOn() && isShotEnabled(e)) {
        dispatchShotCounter('add');
      }
    });
  }, [isScoreEnabled]);

  useEffect(
    () => console.log('kills x shots: ', `${killCounter} x ${shotCounter}`),
    [shotCounter, killCounter]
  );

  function cleanScore() {
    dispatchKillCounter('reset');
    dispatchShotCounter('reset');
  }

  const accuracy = calcAccuracy(shotCounter, killCounter);
  const finalScore = accuracy * killCounter;

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
        currentGameStateFull={currentGameStateFull}
        setIsScoreEnabled={setIsScoreEnabled}
        onResetScore={cleanScore}
        onCreateBat={createControlledBat}
      />
    </>
  );
}
