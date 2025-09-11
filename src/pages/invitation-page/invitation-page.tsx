import { useNavigate, useParams } from 'react-router';
import { Button, ButtonGroup, Gutter, Text } from 'src/components';

export function InvitationPage() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();

  const opponentName = 'Bidjei';
  console.log('params', matchId);

  return (
    <Gutter size="xxl">
      <Gutter direction="vertical" size="xxl" className="text-center">
        <Text>
          You're invited to a battle with {opponentName}. Wanna join the game?
        </Text>
      </Gutter>
      <div className="text-center">
        <ButtonGroup>
          <Button onClick={() => navigate('/')}>Nope</Button>
          <Button kind="primary">Join battle</Button>
        </ButtonGroup>
      </div>
    </Gutter>
  );
}
