import { Avatar } from '@components/avatar';

function getUserData() {
  return {
    id: '123',
    name: 'Gui',
    imageUrl: 'https://avatars.githubusercontent.com/u/11657454?v=4',
  };
}

export function GameDashboardProfile() {
  const user = getUserData();

  return (
    <section>
      <div>
        <span>Player</span>
      </div>
      <div className="text-center">
        <Avatar src={decodeURIComponent(user.imageUrl)} />
      </div>
      <div className="text-center">{user.name}</div>
    </section>
  );
}
