import { useContext, useEffect, useReducer, useState } from 'react';
import './multi-player-main-dashboard.scss';
import {
  getIsGameModeOn,
  setBodyOnClick,
  calcAccuracy,
} from 'src/services/game-service';
import { createBat } from '@services/fly-engine-service';
import {
  CHALLENGE_STATES,
  MultiPlayerMainDashboardChallenge,
} from './_multi-player-main-dashboard-challenge';
import { Card, Divider, Gutter } from '@components';
import { isShotEnabled, ShotEventType } from '@services/shot-service';
import { MultiPlayerMainDashboardScore } from './_multi-player-main-dashboard-score';
import { AuthContext } from '../authentication';
import { ProfileSection } from 'src/components/profile-section';

export function counterReducer(state: number, action: string) {
  return action === 'add' ? state + 1 : 0;
}

export function MultiPlayerMainDashboard() {
  const { currentUser } = useContext(AuthContext);
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);
  const [killCounter, dispatchKillCounter] = useReducer(counterReducer, 0);
  const [shotCounter, dispatchShotCounter] = useReducer(counterReducer, 0);
  const currentGameStateFull = useState(CHALLENGE_STATES.FREE_PLAY);

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
    <div className="single-player-dashboard">
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
          <MultiPlayerMainDashboardChallenge
            currentGameStateFull={currentGameStateFull}
            setIsScoreEnabled={setIsScoreEnabled}
            onResetScore={cleanScore}
            onCreateBat={createControlledBat}
          />
        </Gutter>
        {/* <Divider />
        <Gutter size="md">
          <ProfileSection image={currentUser?.picture} name="You" />
        </Gutter> */}
      </Card>
    </div>
  );
}
