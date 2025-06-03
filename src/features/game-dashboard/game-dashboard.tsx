import { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import './game-dashboard.scss';
import {
  getIsGameModeOn,
  setBodyOnClick,
  calcAccuracy,
  killAllBats,
} from 'src/services/game-service';
import { createBat } from '@services/fly-engine-service';
import {
  GameDashboardChallenge,
  CHALLENGE_STATES,
} from './_game-dashboard-challenge';
import { Card, Divider } from '@components';
import { GameDashboardScore } from 'src/features/game-dashboard/_game-dashboard-score';
import { GameDashboardActions } from 'src/features/game-dashboard/_game-dashboard-actions';
import { isShotEnabled, ShotEventType } from '@services/shot-service';
import { iterate } from 'src/services/iteration-service';

export function counterReducer(state: number, action: string) {
  return action === 'add' ? state + 1 : 0;
}

export function GameDashboard() {
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
    <div className="game-dashboard">
      <Card>
        <Section>
          <GameDashboardScore
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
          <GameDashboardChallenge
            currentGameStateFull={currentGameStateFull}
            setIsScoreEnabled={setIsScoreEnabled}
            onResetScore={cleanScore}
            onCreateBat={createControlledBat}
          />
        </Section>

        <Divider />
        <Section>
          <GameDashboardActions
            buttonsDisabled={currentGameState === 'CHALLENGE_IN_PROGRESS'}
            onCleanBats={killAllBats}
          />
        </Section>
      </Card>
    </div>
  );
}

function Section({ children }: PropsWithChildren) {
  return <div className="game-dashboard-section">{children}</div>;
}
