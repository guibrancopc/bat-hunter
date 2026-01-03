import './multi-player-guest-dashboard.scss';
import { Card } from '@components';
import { MultiPlayerGuestDashboardWithMatch } from './_multi-player-guest-dashboard-with-match';
import { MultiPlayerGuestDashboardInvitation } from './_multi-player-guest-dashboard-invitation';
import { useParams } from 'react-router';
import {
  getMatchDataReactivelyFromFirebase,
  MatchType,
} from 'src/models/match-model';
import { useEffect, useMemo, useState } from 'react';

export function MultiPlayerGuestDashboard() {
  const { matchId } = useParams<{ matchId?: string }>();
  const [currentMatch, setCurrentMatch] = useState<MatchType | null>(null);

  useEffect(() => {
    if (matchId) {
      getMatchDataReactivelyFromFirebase(matchId, setCurrentMatch);
    }
    console.log('currentMatch', currentMatch);
  }, [matchId]);

  const hasMatch = useMemo(
    () => currentMatch?.guestId && currentMatch?.hostId,
    [currentMatch]
  );

  return (
    <div className="multi-player-guest-dashboard">
      <Card>
        {hasMatch ? (
          <MultiPlayerGuestDashboardWithMatch match={currentMatch} />
        ) : (
          <MultiPlayerGuestDashboardInvitation />
        )}
      </Card>
    </div>
  );
}
