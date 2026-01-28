import './multi-player-opponent-dashboard.scss';
import { useMemo } from 'react';
import { Card } from '@components';
import { MultiPlayerOpponentDashboardWithMatch } from './_multi-player-opponent-dashboard-with-match';
import { MultiPlayerOpponentDashboardInvitation } from './_multi-player-opponent-dashboard-invitation';
import { useMultiPlayerContext } from 'src/features/multi-player/multi-player-context';

export function MultiPlayerOpponentDashboard() {
  const { match } = useMultiPlayerContext();
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
