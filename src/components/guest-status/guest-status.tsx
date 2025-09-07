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

  const offlineThreashold = 120 * 1000;
  const awayThreashold = 35 * 1000;

  if (!timestamp || diff >= offlineThreashold) {
    return 'offline';
  }

  if (diff >= awayThreashold && diff < offlineThreashold) {
    return 'away';
  }

  return 'online';
}
