import { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import './single-player-dashboard.scss';
import {
  getIsGameModeOn,
  setBodyOnClick,
  calcAccuracy,
  killAllBats,
} from 'src/services/game-service';
import { createBat } from '@services/fly-engine-service';
import {
  SinglePlayerDashboardChallenge,
  CHALLENGE_STATES,
} from './_single-player-dashboard-challenge';
import { Card, Divider } from '@components';
import { SinglePlayerDashboardScore } from 'src/features/single-player-dashboard/_single-player-dashboard-score';
import { SinglePlayerDashboardActions } from 'src/features/single-player-dashboard/_single-player-dashboard-actions';
import { isShotEnabled, ShotEventType } from '@services/shot-service';
import { iterate } from 'src/services/iteration-service';

export function counterReducer(state: number, action: string) {
  return action === 'add' ? state + 1 : 0;
}

export function SinglePlayerDashboard() {
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);
  const [killCounter, dispatchKillCounter] = useReducer(counterReducer, 0);
  const [shotCounter, dispatchShotCounter] = useReducer(counterReducer, 0);
  const currentGameStateFull = useState(CHALLENGE_STATES.FREE_PLAY);
  const [currentGameState] = currentGameStateFull;

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

  return (
    <div className="single-player-dashboard">
      <Card>
        <Section>
          <SinglePlayerDashboardScore
            killCounter={killCounter}
            accuracy={calcAccuracy(shotCounter, killCounter)}
            resetDisabled={currentGameState !== 'FREE_PLAY'}
            sendBatDisabled={['CHALLENGE_READY', 'CHALLENGE_FINISHED'].includes(
              currentGameState
            )}
            onCreateBat={() => iterate(10, createControlledBat)}
            onResetScore={cleanScore}
          />
        </Section>
        <Divider />
        <Section>
          <SinglePlayerDashboardChallenge
            currentGameStateFull={currentGameStateFull}
            setIsScoreEnabled={setIsScoreEnabled}
            onResetScore={cleanScore}
            onCreateBat={createControlledBat}
          />
        </Section>

        <Divider />
        <Section>
          <SinglePlayerDashboardActions
            buttonsDisabled={currentGameState === 'CHALLENGE_IN_PROGRESS'}
            onCleanBats={killAllBats}
          />
        </Section>
      </Card>
    </div>
  );
}

function Section({ children }: PropsWithChildren) {
  return <div className="single-player-dashboard-section">{children}</div>;
}
