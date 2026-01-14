import './multi-player-opponent-dashboard.scss';
import { Card } from '@components';
import { MultiPlayerOpponentDashboardWithMatch } from './_multi-player-opponent-dashboard-with-match';
import { MultiPlayerOpponentDashboardInvitation } from './_multi-player-opponent-dashboard-invitation';
import { MatchType } from 'src/models/match-model';
import { useMemo } from 'react';

export function MultiPlayerOpponentDashboard({ match }: { match?: MatchType }) {
  const hasMatch = useMemo(() => match?.guestId && match?.hostId, [match]);

  return (
    <div className="multi-player-guest-dashboard">
      <Card>
        {hasMatch ? (
          <MultiPlayerOpponentDashboardWithMatch match={match} />
        ) : (
          <MultiPlayerOpponentDashboardInvitation />
        )}
      </Card>
    </div>
  );
}
