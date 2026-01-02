import './multi-player-guest-dashboard.scss';
import { Card } from '@components';
import { MultiPlayerGuestDashboardWithMatch } from './multi-player-guest-dashboard-with-match';
import { MultiPlayerGuestDashboardInvitation } from './_multi-player-guest-dashboard-invitation';

const hasMatch = false;

export function MultiPlayerGuestDashboard() {
  return (
    <div className="multi-player-guest-dashboard">
      <Card>
        {hasMatch ? (
          <MultiPlayerGuestDashboardWithMatch />
        ) : (
          <MultiPlayerGuestDashboardInvitation />
        )}
      </Card>
    </div>
  );
}
