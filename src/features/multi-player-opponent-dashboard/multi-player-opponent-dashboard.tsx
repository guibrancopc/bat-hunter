import './multi-player-opponent-dashboard.scss';
import { Card } from '@components';
import { MultiPlayerOpponentDashboardWithMatch } from './_multi-player-opponent-dashboard-with-match';
import { MultiPlayerOpponentDashboardInvitation } from './_multi-player-opponent-dashboard-invitation';
import { useParams } from 'react-router';
import {
  getMatchDataReactivelyFromFirebase,
  MatchType,
} from 'src/models/match-model';
import { useEffect, useMemo, useState } from 'react';

export function MultiPlayerOpponentDashboard() {
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
          <MultiPlayerOpponentDashboardWithMatch match={currentMatch} />
        ) : (
          <MultiPlayerOpponentDashboardInvitation />
        )}
      </Card>
    </div>
  );
}
