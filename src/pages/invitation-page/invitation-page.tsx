import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, ButtonGroup, Gutter, Text } from 'src/components';
import {
  getMatchInFirebase,
  MatchType,
  setMatchInFirebase,
} from 'src/models/match-model';
import { getUserDataFromFirebase } from 'src/models/user-model';
import {
  getCurrentUserSession,
  UserSessionType,
} from 'src/services/authentication-service';

export function InvitationPage() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<MatchType | null>(null);
  const [gameHost, setGameHost] = useState<UserSessionType | null>(null);

  useEffect(() => {
    if (matchId) {
      getMatchInFirebase(matchId).then(setMatch);
    }
  }, [matchId]);

  useEffect(() => {
    if (match?.hostId) {
      getUserDataFromFirebase(match.hostId).then(setGameHost);
    }
  }, [match?.hostId]);

  const gameHostName = gameHost?.name;

  function onJoinBattle() {
    if (!matchId) return;

    if (!getCurrentUserSession()?.id) {
      alert(
        'You must sign in to play multi player. Please sign in to come back.'
      );
      navigate('/logout');
      return;
    }

    setMatchInFirebase({ id: matchId, guestId: getCurrentUserSession()?.id });
    navigate(`/multi-player/${matchId}`);
  }

  return (
    <Gutter size="xxl">
      <Gutter direction="vertical" size="xxl" className="text-center">
        <Text>
          You're invited to a battle with {gameHostName}. Wanna join the game?
        </Text>
      </Gutter>
      <div className="text-center">
        <ButtonGroup>
          <Button onClick={() => navigate('/')}>Nope</Button>
          <Button kind="primary" onClick={onJoinBattle} disabled={!matchId}>
            Join battle
          </Button>
        </ButtonGroup>
      </div>
    </Gutter>
  );
}
