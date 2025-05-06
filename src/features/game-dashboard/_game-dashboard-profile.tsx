import { Avatar } from '@components/avatar';
import { Title } from 'src/components';

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
      <Title>Player</Title>
      <div className="text-center">
        <Avatar src={'images/user.jpg'} />
      </div>
      <div className="text-center">{user.name}</div>
    </section>
  );
}
