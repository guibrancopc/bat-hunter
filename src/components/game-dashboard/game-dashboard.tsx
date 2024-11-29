import { useEffect, useReducer, useState } from 'react';
// import { Card, Divider } from '@material-ui/core';
import {
  disableBatGame,
  getIsGameModeOn,
  setBodyOnClick,
  calcAccuracy,
} from 'src/services/game-service';
import { createBat } from '@services/fly-engine-service';
import {
  MenuSectionChallenge,
  CHALLENGE_STATES,
} from '../menu-section-challenge/menu-section-challenge';
import { Card, Divider } from '@components';
import { MenuSectionScore } from '@components/menu-section-score';
import { MenuSectionProfile } from '@components/menu-section-profile';
import { MenuSectionActions } from '@components/menu-section-actions';
import {
  isShotEnabled,
  killAllBats,
  ShotEventType,
} from 'src/services/shot-service';

const useStyles = {
  container: {
    display: 'none',
    userSelect: 'none',
    position: 'fixed',
    width: '300px',
    zIndex: '234',
    top: '90px',
    left: '30px',
    padding: '16px',
    '& section:not(:last-child):not(:first-child)': {
      padding: '24px 0',
    },
    '& section:first-child': {
      paddingBottom: '24px',
    },
  },
  label: {
    marginBottom: '12px',
    display: 'inline-block',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  hourglass: {
    textAlign: 'center',
    fontSize: '44px',
  },
};

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
    <Card id="bat-kill-dashboard">
      <MenuSectionScore
        killCounter={killCounter}
        accuracy={calcAccuracy(shotCounter, killCounter)}
        resetDisabled={currentGameState !== 'FREE_PLAY'}
        sendBatDisabled={['CHALLENGE_READY', 'CHALLENGE_FINISHED'].includes(
          currentGameState
        )}
        onCreateBat={createControlledBat}
        onResetScore={cleanScore}
      />
      <Divider />
      <MenuSectionChallenge
        currentGameStateFull={currentGameStateFull}
        setIsScoreEnabled={setIsScoreEnabled}
        onResetScore={cleanScore}
        onCreateBat={createControlledBat}
      />
      <Divider />
      <MenuSectionProfile />
      <MenuSectionActions
        buttonsDisabled={currentGameState === 'CHALLENGE_IN_PROGRESS'}
        onCleanBats={killAllBats}
        onClose={disableBatGame}
      />
    </Card>
  );
}
