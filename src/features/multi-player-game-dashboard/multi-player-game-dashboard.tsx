import { useEffect, useReducer } from 'react';
import './multi-player-game-dashboard.scss';
import { MultiPlayerGameDashboardMatch } from './_multi-player-main-dashboard-match';
import { Card, Gutter } from '@components';

export function MultiPlayerGameDashboard() {
  const [killCounter, dispatchKillCounter] = useReducer(counterReducer, 0);
  const [shotCounter, dispatchShotCounter] = useReducer(counterReducer, 0);

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
            onStateChange={(state) => {
              console.log('CURRENT_STATE', state);
              // READY
              // - Create Game
              // ON GOING
              // - Store each kill and shot
              // FINISHED
              // - Store the winner
            }}
            onKill={() => dispatchKillCounter('add')}
            onShot={() => dispatchShotCounter('add')}
            onResetScore={cleanScore}
          />
        </Gutter>
      </Card>
    </div>
  );
}

export function counterReducer(state: number, action: 'add' | 'reset') {
  return action === 'add' ? state + 1 : 0;
}
