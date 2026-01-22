import { useEffect, useState } from 'react';
import { Gutter, Modal, Text } from 'src/components';
import { Gap } from 'src/components/gap';
import { getUserDataFromFirebase } from 'src/models/user-model';
import { useAuthContext } from '../authentication';
import { MatchType } from 'src/models/match-model';
import { GameType } from 'src/models/game-model';
import { UserSessionType } from 'src/services/authentication-service';
import {
  buildGameSortedArray,
  calcFinalScore,
} from 'src/services/game-service';

export function MultiPlayerGameHistoryModal({
  open,
  onClose,
  match,
}: {
  open: boolean;
  onClose: () => void;
  match?: MatchType;
}) {
  const { currentUser } = useAuthContext();
  const [opponentUser, setOpponentUser] = useState<UserSessionType | null>();
  const isCurrentUserTheHost = currentUser?.id === match?.hostId;

  function calcWinnerName(winnerId?: string) {
    if (winnerId === 'DRAW') return 'Same Score!';
    if (winnerId === currentUser?.id) return currentUser?.firstName;
    if (winnerId === opponentUser?.id) return opponentUser?.firstName;
    return 'N/A';
  }

  function getUserData(game: GameType, userType: 'MAIN' | 'OPPONENT') {
    const data =
      (isCurrentUserTheHost && userType === 'MAIN') ||
      (!isCurrentUserTheHost && userType === 'OPPONENT')
        ? game?.hostData
        : game?.guestData;

    return {
      kills: data?.killCounter || 0,
      shots: data?.shotCounter || 0,
      score: calcFinalScore(data?.shotCounter, data?.killCounter) || 0,
    };
  }

  useEffect(() => {
    const opponentUserId = isCurrentUserTheHost
      ? match?.guestId
      : match?.hostId;

    if (opponentUserId) {
      getUserDataFromFirebase(opponentUserId).then(setOpponentUser);
    }
  }, [match?.hostId]);

  const gamesArray = buildGameSortedArray(match?.games, 'ASC');

  return (
    <Modal open={open} onClose={onClose} header="Games History">
      {gamesArray ? (
        <div>
          <ol>
            {gamesArray.map((game) => {
              if (
                !['GAME_FINISHED', 'GAME_CLOSED'].includes(game.state || '')
              ) {
                return (
                  <li key={game?.id}>
                    This game is still pending. Go play it!
                  </li>
                );
              }

              const currentData = getUserData(game, 'MAIN');
              const opponentData = getUserData(game, 'OPPONENT');

              return (
                <li key={game?.id}>
                  <Gutter direction="bottom" size="xl">
                    <Gap vertical>
                      <div>Winner: {calcWinnerName(game?.winnerId)} 🎉</div>
                      <div>
                        {currentUser?.firstName}: {currentData.kills} kills |{' '}
                        {currentData.shots} shots | score: {currentData.score}
                      </div>
                      <div>
                        {opponentUser?.firstName}: {opponentData.kills} kills |{' '}
                        {opponentData.shots} shots | score: {opponentData.score}
                      </div>
                    </Gap>
                  </Gutter>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <Text align="center">No games yet to show.</Text>
      )}
    </Modal>
  );
}
