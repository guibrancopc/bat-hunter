import { useEffect, useMemo, useState } from 'react';
import { killAllBats } from 'src/services/bat-service';
import { Button } from '@components/button';
import {
  playBackgroundMusic,
  playChallengeBackgroundMusic,
} from 'src/services/audio-service';

const styles = {
  gameModeLabel: {
    fontSize: '32px',
    textAlign: 'center',
    padding: '40px 0',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export const CHALLENGE_STATES = {
  FREE_PLAY: 'FREE_PLAY',
  CHALLENGE_READY: 'CHALLENGE_READY',
  CHALLENGE_IN_PROGRESS: 'CHALLENGE_IN_PROGRESS',
  CHALLENGE_FINISHED: 'CHALLENGE_FINISHED',
};

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

function iterate(times: number, cb: (i: number) => void) {
  return Array(times)
    .fill(undefined)
    .map((_, i) => cb(i));
}

export function MenuSectionChallenge({
  currentGameStateFull = [CHALLENGE_STATES.FREE_PLAY, () => {}],
  onCreateBat = () => {},
  setIsScoreEnabled = () => {},
  onResetScore = () => {},
}: {
  currentGameStateFull: [string, (v: string) => void];
  onCreateBat: () => void;
  setIsScoreEnabled: (v: boolean) => void;
  onResetScore: () => void;
}) {
  const COUNTDOWN_TIME_TOTAL = 60;

  const [currentGameState, setCurrentGameState] = currentGameStateFull;
  const [countdownTime, setCountdownTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number>();

  const GAME_MODE = useMemo(
    () => ({
      [CHALLENGE_STATES.FREE_PLAY]: {
        label: 'Free Play!',
        onStart: () => {
          onResetScore();
          setIsScoreEnabled(true);
        },
        onChallengeReady: () =>
          setCurrentGameState(CHALLENGE_STATES.CHALLENGE_READY),
      },
      [CHALLENGE_STATES.CHALLENGE_READY]: {
        label: 'Get Ready!',
        onStart: () => {
          onResetScore();
          killAllBats();
          setIsScoreEnabled(false);
        },
        onFreePlay: () => setCurrentGameState(CHALLENGE_STATES.FREE_PLAY),
        onChallengeStart: () =>
          setCurrentGameState(CHALLENGE_STATES.CHALLENGE_IN_PROGRESS),
      },
      [CHALLENGE_STATES.CHALLENGE_IN_PROGRESS]: {
        onStart: () => {
          iterate(30, onCreateBat);
          setCountdownTime(COUNTDOWN_TIME_TOTAL);
          setIsScoreEnabled(true);
          playChallengeBackgroundMusic();

          let counter = COUNTDOWN_TIME_TOTAL - 1;

          const id = setInterval(() => {
            if (counter <= 0) {
              setCurrentGameState(CHALLENGE_STATES.CHALLENGE_FINISHED);
              clearInterval(id);
            }

            setCountdownTime(counter);
            counter -= 1;
          }, 1000);

          setIntervalId(id);
        },
        onCancel: () =>
          setCurrentGameState(CHALLENGE_STATES.CHALLENGE_FINISHED),
      },
      [CHALLENGE_STATES.CHALLENGE_FINISHED]: {
        label: "Time's Up!",
        onStart: () => {
          killAllBats();
          playBackgroundMusic();
          setIsScoreEnabled(false);
        },
        onFreePlay: () => setCurrentGameState(CHALLENGE_STATES.FREE_PLAY),
        onChallengeReady: () =>
          setCurrentGameState(CHALLENGE_STATES.CHALLENGE_READY),
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
      <div style={styles.label}>Game Mode</div>
      <div style={styles.gameModeLabel}>
        {handleGameLabel(countdownTime, currentGameModel.label)}
      </div>
      <div style={styles.buttonGroup}>
        {currentGameModel.onCancel && (
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              currentGameModel.onCancel();
              clearInterval(intervalId);
              setCountdownTime(0);
            }}
          >
            Cancel
          </Button>
        )}
        {currentGameModel.onFreePlay && (
          <Button
            color="primary"
            variant="outlined"
            onClick={currentGameModel.onFreePlay}
          >
            Fre Play
          </Button>
        )}
        {currentGameModel.onChallengeReady && (
          <Button
            color="primary"
            variant="outlined"
            onClick={currentGameModel.onChallengeReady}
          >
            Challenge
          </Button>
        )}
        {currentGameModel.onChallengeStart && (
          <Button
            color="primary"
            variant="contained"
            onClick={currentGameModel.onChallengeStart}
          >
            Start
          </Button>
        )}
      </div>
    </section>
  );
}

/*
- FREE_PLAY (default)
-- Display: FREE PLAY
-- Display Button: Challenge Mode
-- Reset score

- CHALLENGE_READY
-- Display: Get Ready!
-- Display Button: Free Play | Start
-- Reset score
-- Kill All Bats
-- Block shot and kill metrics.
-- Block "Send Bat" button.

- CHALLENGE_IN_PROGRESS
-- Display: [Countdown]
-- Block "Reset", "Close", "Clean Bats", "Reset" buttons.
-- change music - find something more intense

- CHALLENGE_FINISHED
-- Display: Time's up!
-- Display Button: Free Play | Start
-- Kill All Bats
-- Return to regular music
-- Block shot and kill metrics.
-- Block "Send Bat" button.
*/
