import './guest-status.scss';

export function GuestStatus({
  status,
}: {
  status: 'online' | 'away' | 'offline';
}) {
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
