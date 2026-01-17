import { useEffect, useState } from 'react';
import { createBat } from 'src/services/fly-engine-service';
import { getIsGameModeOn, setBodyOnClick } from 'src/services/game-service';
import { isShotEnabled, ShotEventType } from 'src/services/shot-service';

export function useMultiPlayerGameDashboardCountersHelper({
  onShot,
  onKill,
}: {
  onShot: () => void;
  onKill: () => void;
}) {
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);
  const createControlledBat = () => createBat(() => isScoreEnabled && onKill());

  useEffect(() => {
    setBodyOnClick((e: ShotEventType) => {
      if (isScoreEnabled && getIsGameModeOn() && isShotEnabled(e)) {
        onShot();
      }
    });
  }, [isScoreEnabled]);

  return {
    createControlledBat,
    setIsScoreEnabled,
  };
}
