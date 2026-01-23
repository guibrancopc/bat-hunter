import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, ButtonGroup, Gutter, Text } from 'src/components';
import { SignInModal } from 'src/features/sign-in-modal';
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
  const [signInModalOpen, setSignInModalOpen] = useState(false);
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
      setSignInModalOpen(true);
      return;
    }

    setMatchInFirebase({ id: matchId, guestId: getCurrentUserSession()?.id });
    navigate(`/multi-player/${matchId}`);
  }

  return (
    <>
      <SignInModal open={signInModalOpen} onClose={() => setSignInModalOpen(false)} />
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
    </>
  );
}
