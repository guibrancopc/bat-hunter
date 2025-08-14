import { useContext } from 'react';
import './multi-player-guest-dashboard.scss';
import { calcAccuracy } from 'src/services/game-service';
import { Card, Divider, Gutter } from '@components';
import { MultiPlayerGuestDashboardScore } from './_multi-player-guest-dashboard-score';
import { ProfileSection } from '@components/profile-section/profile-section';
import { AuthContext } from 'src/features/authentication';
import { GuestStatus } from 'src/components/guest-status';

export function MultiPlayerGuestDashboard() {
  const { currentUser } = useContext(AuthContext);

  const killCounter = 0;
  const shotCounter = 0;

  const accuracy = calcAccuracy(shotCounter, killCounter);
  const finalScore = accuracy * killCounter;

  return (
    <div className="multi-player-guest-dashboard">
      <Card>
        <div className="status-slot">
          <GuestStatus status="away" />
        </div>
        <Gutter size="md">
          <MultiPlayerGuestDashboardScore
            killCounter={killCounter}
            accuracy={accuracy}
            finalScore={finalScore}
          />
        </Gutter>
        <Divider />
        <Gutter size="md">
          <ProfileSection
            image={currentUser?.picture}
            name={currentUser?.firstName}
          />
        </Gutter>
      </Card>
    </div>
  );
}
