import { useEffect, useState } from 'react';
import { Gutter, Modal, Title } from 'src/components';
import { Gap } from 'src/components/gap';
import { getUserDataFromFirebase } from 'src/models/user-model';
import { useAuthContext } from '../../authentication';
import { MatchType } from 'src/models/match-model';
import { GameType } from 'src/models/game-model';
import { UserSessionType } from 'src/services/authentication-service';
import { calcFinalScore } from 'src/services/game-service';

export function MultiPlayerGameResultModal({
  open,
  onClose,
  match,
  game,
}: {
  open: boolean;
  onClose: () => void;
  match?: MatchType;
  game?: GameType;
}) {
  const { currentUser } = useAuthContext();
  const [opponentUser, setOpponentUser] = useState<UserSessionType | null>();
  const isCurrentUserTheHost = currentUser?.id === match?.hostId;

  useEffect(() => {
    const opponentUserId = isCurrentUserTheHost
      ? match?.guestId
      : match?.hostId;

    if (opponentUserId) {
      getUserDataFromFirebase(opponentUserId).then(setOpponentUser);
    }
  }, [match?.hostId]);

  const currentUserData = isCurrentUserTheHost
    ? game?.hostData
    : game?.guestData;
  const opponentData = isCurrentUserTheHost ? game?.guestData : game?.hostData;

  const currentUserFinalScore = calcFinalScore(
    currentUserData?.shotCounter,
    currentUserData?.killCounter
  );

  const opponentUserFinalScore = calcFinalScore(
    opponentData?.shotCounter,
    opponentData?.killCounter
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Gutter size="xxl">
        <Title center size="h1" weight="medium">
          {buildTitleMessage(game?.winnerId, currentUser?.id)}
        </Title>
        <Gutter direction="top" size="xl">
          <Gap justify="center">
            <div>
              <div className="text-right">{currentUserFinalScore}</div>
              <div className="text-right">Your Score</div>
            </div>
            <div>x</div>
            <div>
              <div>{opponentUserFinalScore}</div>
              <div>{opponentUser?.firstName}'s Score</div>
            </div>
          </Gap>
        </Gutter>
      </Gutter>
    </Modal>
  );
}

function buildTitleMessage(winnerId?: string, currentUserId?: string) {
  const isDraw = winnerId === 'DRAW';
  const isCurrentUserTheWinner = currentUserId === winnerId;

  if (isDraw) {
    return 'Same score! 🤝';
  }

  if (isCurrentUserTheWinner) {
    return 'You Win! 🎉';
  }

  return 'You lose! 💔';
}
