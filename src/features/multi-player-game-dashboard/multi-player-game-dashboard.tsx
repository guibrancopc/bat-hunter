import { useEffect, useState } from 'react';
import './multi-player-game-dashboard.scss';
import { getIsGameModeOn, setBodyOnClick } from 'src/services/game-service';
import { createBat } from '@services/fly-engine-service';
import {
  MATCH_STATES,
  MultiPlayerGameDashboardMatch,
} from './_multi-player-main-dashboard-match';
import { Card, Gutter } from '@components';
import { isShotEnabled, ShotEventType } from '@services/shot-service';
// import { useAuthContext } from 'src/features/authentication';
type CounterReducerType = [number, (action: 'add' | 'reset') => void];
export function MultiPlayerGameDashboard({
  killCounterReducer,
  shotCounterReducer,
}: {
  killCounterReducer: CounterReducerType;
  shotCounterReducer: CounterReducerType;
}) {
  const [killCounter, dispatchKillCounter] = killCounterReducer;
  const [shotCounter, dispatchShotCounter] = shotCounterReducer;
  // const { currentUser } = useAuthContext();
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);

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

  return (
    <div className="multi-player-game-dashboard">
      <Card className="multi-player-game-dashboard__card">
        <Gutter size="md">
          <MultiPlayerGameDashboardMatch
            currentGameStateFull={currentGameStateFull}
            setIsScoreEnabled={setIsScoreEnabled}
            onResetScore={cleanScore}
            onCreateBat={createControlledBat}
          />
        </Gutter>
      </Card>
    </div>
  );
}

export function counterReducer(state: number, action: string) {
  return action === 'add' ? state + 1 : 0;
}
