import { calcAccuracy } from 'src/services/game-service';
import { Divider, Gutter } from '@components';
import { MultiPlayerOpponentDashboardScore } from './_multi-player-opponent-dashboard-score';
import { ProfileSection } from '@components/profile-section/profile-section';
import { useAuthContext } from 'src/features/authentication';
import { GuestStatus } from 'src/components/guest-status';
import { MatchType } from 'src/models/match-model';
import {
  getUserDataFromFirebase,
  getUserLastPulseReactivelyFromFirebase,
} from 'src/models/user-model';
import { useEffect, useMemo, useState } from 'react';
import { UserSessionType } from 'src/services/authentication-service';

export function MultiPlayerOpponentDashboardWithMatch({
  match,
}: {
  match?: MatchType | null;
}) {
  const { currentUser } = useAuthContext();
  const [oponentUser, setOponentUser] = useState<UserSessionType | null>(null);
  const [oponentLastPulseAt, setOponentLastPulseAt] = useState<number | null>(
    null
  );

  const amIHost = useMemo(
    () => currentUser?.id === match?.hostId,
    [currentUser?.id, match?.hostId]
  );

  useEffect(() => {
    const oponentUserId = amIHost ? match?.guestId : match?.hostId;

    if (oponentUserId) {
      getUserDataFromFirebase(oponentUserId).then(setOponentUser);
    }
  }, [match?.hostId]);

  useEffect(() => {
    if (oponentUser?.id) {
      getUserLastPulseReactivelyFromFirebase(
        oponentUser.id,
        setOponentLastPulseAt
      );
    }
  }, [oponentUser?.id]);

  const killCounter = 0;
  const shotCounter = 0;

  const accuracy = calcAccuracy(shotCounter, killCounter);
  const finalScore = accuracy * killCounter;

  return (
    <div className="multi-player-guest-dashboard-with-match">
      <div className="status-slot">
        <GuestStatus lastPulseAt={oponentLastPulseAt || undefined} />
      </div>
      <Gutter size="md">
        <MultiPlayerOpponentDashboardScore
          oponentName={oponentUser?.name?.split(' ')[0]}
          killCounter={killCounter}
          accuracy={accuracy}
          finalScore={finalScore}
        />
      </Gutter>
      <Divider />
      <Gutter size="md">
        <ProfileSection image={oponentUser?.picture} name={oponentUser?.name} />
      </Gutter>
    </div>
  );
}
