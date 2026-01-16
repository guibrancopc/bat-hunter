import { useEffect, useMemo, useState } from 'react';
import {
  playBackgroundMusic,
  playChallengeBackgroundMusic,
} from 'src/services/audio-service';
import { killAllBats } from 'src/services/game-service';
import { Button, ButtonGroup, Gutter, Text } from '@components';
import { iterate } from 'src/services/iteration-service';
import { useMultiPlayerMainDashboardTriggers } from './multi-player-main-dashboard-triggers-hook';
import { GameStateType } from 'src/models/game-model';

// @TODO: rename match to game here
export const MATCH_STATES = {
  MATCH_READY: 'MATCH_READY',
  MATCH_IN_PROGRESS: 'MATCH_IN_PROGRESS',
  MATCH_FINISHED: 'MATCH_FINISHED',
} as const;

type ValueOf<T> = T[keyof T];

export type MatchStatesType = ValueOf<typeof MATCH_STATES>;

export function MultiPlayerGameDashboardMatch({
  onResetScore = () => {},
  onShot = () => {},
  onKill = () => {},
  onStateChange = () => {},
  isCurrentUserTheHost,
  remoteGameState,
}: {
  onResetScore: () => void;
  onShot: () => void;
  onKill: () => void;
  onStateChange: (state: MatchStatesType) => void;
  isCurrentUserTheHost?: boolean;
  remoteGameState?: GameStateType;
}) {
  // const COUNTDOWN_TIME_TOTAL = 60;
  const COUNTDOWN_TIME_TOTAL = 15;
  const [currentGameState, setCurrentGameState] = useState<MatchStatesType>(
    MATCH_STATES.MATCH_READY
  );
  const [countdownTime, setCountdownTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const { createControlledBat, setIsScoreEnabled } =
    useMultiPlayerMainDashboardTriggers({ onShot, onKill });

  useEffect(() => {
    if (!isCurrentUserTheHost && remoteGameState) {
      setCurrentGameState(remoteGameState);
    }
  }, [isCurrentUserTheHost, remoteGameState]);

  useEffect(() => {
    onStateChange(currentGameState);
  }, [currentGameState]);

  const GAME_MODE = useMemo(
    () => ({
      [MATCH_STATES.MATCH_READY]: {
        label: 'Get Ready!',
        onStart: () => {
          onResetScore();
          killAllBats();
          setIsScoreEnabled(false);
        },
        onMatchStart: () => setCurrentGameState(MATCH_STATES.MATCH_IN_PROGRESS),
        onCancel: undefined,
      },
      [MATCH_STATES.MATCH_IN_PROGRESS]: {
        onStart: () => {
          iterate(30, createControlledBat);
          setCountdownTime(COUNTDOWN_TIME_TOTAL);
          setIsScoreEnabled(true);
          playChallengeBackgroundMusic();

          let counter = COUNTDOWN_TIME_TOTAL - 1;

          const id = setInterval(() => {
            if (counter <= 0) {
              setCurrentGameState(MATCH_STATES.MATCH_FINISHED);
              clearInterval(id);
            }

            setCountdownTime(counter);
            counter -= 1;
          }, 1000);

          setIntervalId(id);
        },
        onAddBats: createControlledBat,
        onCancel: () => setCurrentGameState(MATCH_STATES.MATCH_READY),
      },
      [MATCH_STATES.MATCH_FINISHED]: {
        label: "Time's Up!",
        onStart: () => {
          killAllBats();
          playBackgroundMusic();
          setIsScoreEnabled(false);
        },
        onChallengeReady: () => setCurrentGameState(MATCH_STATES.MATCH_READY),
        onChallengeReadyLabel: 'Play again',
        onCancel: undefined,
      },
    }),
    []
  );

  useEffect(() => {
    GAME_MODE[currentGameState].onStart();
  }, [currentGameState, GAME_MODE]);

  const currentGameModel = GAME_MODE[currentGameState];

  return (
    <section>
      <Gutter className="text-center" size="xxl">
        <Text size="lg">
          {handleGameLabel(countdownTime, currentGameModel.label || '')}
        </Text>
      </Gutter>
      <ButtonGroup flex>
        {currentGameModel.onCancel && isCurrentUserTheHost && (
          <Button
            onClick={() => {
              currentGameModel.onCancel();
              clearInterval(intervalId);
              setCountdownTime(0);
            }}
          >
            Cancel
          </Button>
        )}
        {currentGameModel.onChallengeReady && isCurrentUserTheHost && (
          <Button onClick={currentGameModel.onChallengeReady}>
            {currentGameModel.onChallengeReadyLabel || 'Play'}
          </Button>
        )}
        {currentGameModel.onMatchStart && isCurrentUserTheHost && (
          <Button kind="primary" onClick={currentGameModel.onMatchStart}>
            Start
          </Button>
        )}
        {currentGameModel.onAddBats && (
          <Button kind="primary" onClick={currentGameModel.onAddBats}>
            Add bats
          </Button>
        )}
      </ButtonGroup>
    </section>
  );
}

function handleGameLabel(countdownTime: number, label: string) {
  const seconds = `${countdownTime}s`;

  if (countdownTime <= 0) {
    return label;
  }

  if (countdownTime <= 10) {
    return <span style={{ color: '#f05b7b' }}>{seconds}</span>;
  }

  return seconds;
}

// @TODO: define better the states before coding

/*
- FREE_PLAY (default)
-- Display: FREE PLAY
-- Display Button: Challenge Mode
-- Reset score

- MATCH_READY
-- Display: Get Ready!
-- Display Button: Free Play | Start
-- Reset score
-- Kill All Bats
-- Block shot and kill metrics.
-- Block "Send Bat" button.

- MATCH_IN_PROGRESS
-- Display: [Countdown]
-- Block "Reset", "Close", "Clean Bats", "Reset" buttons.
-- change music - find something more intense

- MATCH_FINISHED
-- Display: Time's up!
-- Display Button: Free Play | Start
-- Kill All Bats
-- Return to regular music
-- Block shot and kill metrics.
-- Block "Send Bat" button.
*/
