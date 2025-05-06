import { Avatar } from '@components/avatar';
import { Title } from 'src/components';

function getUserData() {
  return {
    id: '123',
    name: 'Gui',
    imageUrl: 'images/user.jpg',
  };
}

export function GameDashboardProfile() {
  const user = getUserData();

  return (
    <section>
      <Title>Player</Title>
      <div className="text-center">
        <Avatar src={user.imageUrl} />
      </div>
      <div className="text-center">{user.name}</div>
    </section>
  );
}
