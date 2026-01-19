import './guest-status.scss';

export function GuestStatus({
  lastClickAt,
  away,
}: {
  lastClickAt?: number;
  away?: boolean;
}) {
  const status = calcStatus(lastClickAt, away);

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
  lastClickAt?: number,
  away?: boolean
): 'away' | 'online' | 'offline' {
  const now = Date.now();
  const diff = now - (lastClickAt || 0);

  const OFFLINE_THRESHOLD = 5 * 60 * 1000; // 5min

  if (!lastClickAt || diff >= OFFLINE_THRESHOLD) {
    return 'offline';
  }

  if (away) {
    return 'away';
  }

  return 'online';
}
