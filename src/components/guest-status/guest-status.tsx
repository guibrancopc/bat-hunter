import './guest-status.scss';

export function GuestStatus({ lastPulseAt }: { lastPulseAt?: number }) {
  const status = calcStatus(lastPulseAt);

  const colors = {
    online: 'green',
    away: 'orange',
    offline: 'red',
  };

  const currentColor = colors[status];

  return (
    <span className="bh-guest-status">
      <span
        className="bh-guest-status-circle"
        style={{ backgroundColor: currentColor }}
      />
      <span>{status}</span>
    </span>
  );
}

function calcStatus(timestamp?: number): 'away' | 'online' | 'offline' {
  const now = Date.now();
  const diff = now - (timestamp || 0);

  const offlineThreshold = 300 * 1000;
  const awayThreashold = 60 * 1000;

  if (!timestamp || diff >= offlineThreshold) {
    return 'offline';
  }

  if (diff >= awayThreashold && diff < offlineThreshold) {
    return 'away';
  }

  return 'online';
}
