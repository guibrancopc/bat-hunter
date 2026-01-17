import { useEffect, useMemo, useState } from 'react';
import {
  playBackgroundMusic,
  playChallengeBackgroundMusic,
} from 'src/services/audio-service';
import { killAllBats } from 'src/services/game-service';
import { Button, ButtonGroup, Gutter, Text } from '@components';
import { iterate } from 'src/services/iteration-service';
import { useGameCounterTriggers } from 'src/hooks/game-hooks';
import { GameStateType } from 'src/models/game-model';

// @TODO: rename match to game here
export const GAME_STATES = {
  GAME_READY: 'GAME_READY',
  GAME_IN_PROGRESS: 'GAME_IN_PROGRESS',
  GAME_FINISHED: 'GAME_FINISHED',
  GAME_CLOSED: 'GAME_CLOSED',
} as const;

// type ValueOf<T> = T[keyof T];

// type MatchStatesType = ValueOf<typeof GAME_STATES>;

export function MultiPlayerGameDashboardController({
  onResetScore = () => {},
  onShot = () => {},
  onKill = () => {},
  onStateChange = () => {},
  onOpenHistory = () => {},
  isCurrentUserTheHost,
  remoteGameState,
}: {
  onResetScore: () => void;
  onShot: () => void;
  onKill: () => void;
  onOpenHistory: () => void;
  onStateChange: (state: GameStateType) => void;
  isCurrentUserTheHost?: boolean;
  remoteGameState?: GameStateType;
}) {
  // const COUNTDOWN_TIME_TOTAL = 60;
  const COUNTDOWN_TIME_TOTAL = 15;
  const [currentGameState, setCurrentGameState] = useState<GameStateType>(
    GAME_STATES.GAME_READY
  );
  const [countdownTime, setCountdownTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const { createControlledBat, setIsScoreEnabled } = useGameCounterTriggers({
    onShot,
    onKill,
  });

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
      [GAME_STATES.GAME_READY]: {
        label: 'Get Ready!',
        onStart: () => {
          onResetScore();
          killAllBats();
          setIsScoreEnabled(false);
        },
        onMatchStart: () => setCurrentGameState(GAME_STATES.GAME_IN_PROGRESS),
        onOpenHistory,
        onCancel: undefined,
      },
      [GAME_STATES.GAME_IN_PROGRESS]: {
        onStart: () => {
          iterate(30, createControlledBat);
          setCountdownTime(COUNTDOWN_TIME_TOTAL);
          setIsScoreEnabled(true);
          playChallengeBackgroundMusic();

          let counter = COUNTDOWN_TIME_TOTAL - 1;

          const id = setInterval(() => {
            if (counter <= 0) {
              setCurrentGameState(GAME_STATES.GAME_FINISHED);
              clearInterval(id);
            }

            setCountdownTime(counter);
            counter -= 1;
          }, 1000);

          setIntervalId(id);
        },
        onAddBats: createControlledBat,
        onCancel: () => setCurrentGameState(GAME_STATES.GAME_READY),
      },
      [GAME_STATES.GAME_FINISHED]: {
        label: "Time's Up!",
        onStart: () => {
          killAllBats();
          playBackgroundMusic();
          setIsScoreEnabled(false);
        },
        onChallengeReady: () => setCurrentGameState(GAME_STATES.GAME_READY),
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
      <Gutter className="text-center" size="lg">
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
        {currentGameModel.onOpenHistory && (
          <Button kind="secondary" onClick={currentGameModel.onOpenHistory}>
            History
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

- GAME_READY
-- Display: Get Ready!
-- Display Button: Free Play | Start
-- Reset score
-- Kill All Bats
-- Block shot and kill metrics.
-- Block "Send Bat" button.

- GAME_IN_PROGRESS
-- Display: [Countdown]
-- Block "Reset", "Close", "Clean Bats", "Reset" buttons.
-- change music - find something more intense

- GAME_FINISHED
-- Display: Time's up!
-- Display Button: Free Play | Start
-- Kill All Bats
-- Return to regular music
-- Block shot and kill metrics.
-- Block "Send Bat" button.
*/
