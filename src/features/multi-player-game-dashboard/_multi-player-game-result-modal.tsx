import { useEffect, useState } from 'react';
import { Gutter, Modal, Title } from 'src/components';
import { Gap } from 'src/components/gap';
import { getUserDataFromFirebase } from 'src/models/user-model';
import { useAuthContext } from '../authentication';
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
  console.log('MODAL OPEN', open);
  const { currentUser } = useAuthContext();
  const [opponentUser, setOpponentUser] = useState<UserSessionType | null>();
  const isCurrentUserTheHost = currentUser?.id === match?.hostId;
  const isCurrentUserTheWinner = currentUser?.id === game?.winnerId;

  useEffect(() => {
    const oponentUserId = isCurrentUserTheHost ? match?.guestId : match?.hostId;

    if (oponentUserId) {
      getUserDataFromFirebase(oponentUserId).then(setOpponentUser);
    }
  }, [match?.hostId]);

  const currentUserData = isCurrentUserTheHost
    ? game?.hostData
    : game?.guestData;
  const opponentData = isCurrentUserTheHost ? game?.guestData : game?.hostData;

  const currentUserFinalScore = calcFinalScore(
    currentUserData?.shotCounter || 0,
    currentUserData?.killCounter || 0
  );

  const opponentUserFinalScore = calcFinalScore(
    opponentData?.shotCounter || 0,
    opponentData?.killCounter || 0
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Gutter size="xxl">
        <Title center size="h1" weight="medium">
          {isCurrentUserTheWinner ? 'You Win! 🎉' : 'You lose! 💔'}
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
