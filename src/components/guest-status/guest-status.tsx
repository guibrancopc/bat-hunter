import './guest-status.scss';

export function GuestStatus({
  lastPulseAt,
  away,
}: {
  lastPulseAt?: number;
  away?: boolean;
}) {
  const status = calcStatus(lastPulseAt, away);

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

function calcStatus(
  lastPulseAt?: number,
  away?: boolean
): 'away' | 'online' | 'offline' {
  const now = Date.now();
  const diff = now - (lastPulseAt || 0);

  const OFFLINE_THRESHOLD = 5 * 60 * 1000; // 5min

  if (!lastPulseAt || diff >= OFFLINE_THRESHOLD) {
    return 'offline';
  }

  if (away) {
    return 'away';
  }

  return 'online';
}
