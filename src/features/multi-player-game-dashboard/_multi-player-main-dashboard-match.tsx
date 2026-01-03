import { useEffect, useMemo, useState } from 'react';
import {
  playBackgroundMusic,
  playChallengeBackgroundMusic,
} from 'src/services/audio-service';
import { killAllBats } from 'src/services/game-service';
import { Button, ButtonGroup, Gutter, Text } from '@components';
import { iterate } from 'src/services/iteration-service';
import { useNavigate } from 'react-router';

export const MATCH_STATES = {
  MATCH_READY: 'MATCH_READY',
  MATCH_IN_PROGRESS: 'MATCH_IN_PROGRESS',
  MATCH_FINISHED: 'MATCH_FINISHED',
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

export function MultiPlayerGameDashboardMatch({
  currentGameStateFull = [MATCH_STATES.MATCH_READY, () => {}],
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

  const navigate = useNavigate();
  const [currentGameState, setCurrentGameState] = currentGameStateFull;
  const [countdownTime, setCountdownTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

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
        onCancel: () => navigate('/'),
      },
      [MATCH_STATES.MATCH_IN_PROGRESS]: {
        onStart: () => {
          iterate(30, onCreateBat);
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
        onCancel: () => setCurrentGameState(MATCH_STATES.MATCH_FINISHED),
      },
      [MATCH_STATES.MATCH_FINISHED]: {
        label: "Time's Up!",
        onStart: () => {
          killAllBats();
          playBackgroundMusic();
          setIsScoreEnabled(false);
        },
        onChallengeReady: () => setCurrentGameState(MATCH_STATES.MATCH_READY),
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
        {currentGameModel.onCancel && (
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
        {currentGameModel.onChallengeReady && (
          <Button onClick={currentGameModel.onChallengeReady}>Play</Button>
        )}
        {currentGameModel.onMatchStart && (
          <Button kind="primary" onClick={currentGameModel.onMatchStart}>
            Start
          </Button>
        )}
      </ButtonGroup>
    </section>
  );
}

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
