import { updateData } from 'src/services/firebase-service';
import { v7 as generateUuid } from 'uuid';

type PlayerDataType = {
  shotCounter: number;
  killCounter: number;
};

export type GameType = {
  id: string;
  createdAt: number;
  gameState?: string;
  winner?: {
    userId: string;
  };
  guestData?: PlayerDataType;
  hostData?: PlayerDataType;
};

export function createGameInFirebase({ matchId }: { matchId?: string }) {
  if (!matchId) {
    console.error('setGameInFirebase::ERROR: no user id was provided');
    return;
  }

  const id = generateUuid();
  const data = { id, createdAt: Date.now() };

  setGameInFirebase({ matchId, data });

  return id;
}

export async function setGameInFirebase({
  matchId,
  data,
}: {
  matchId: string;
  data: GameType;
}) {
  if (!data?.id) {
    console.error('setGameInFirebase::ERROR: no user id was provided');
    return;
  }

  updateData(`matches/${matchId}/games/${data.id}`, data);
}

export async function setPlayerDataInFirebase({
  matchId,
  gameId,
  player,
  data,
}: {
  matchId: string;
  gameId: string;
  player: 'host' | 'guest';
  data: PlayerDataType;
}) {
  if (!matchId || !gameId) {
    console.error('setPlayerDataInFirebase::ERROR: no user id was provided');
    return;
  }

  updateData(`matches/${matchId}/games/${gameId}/${player}Data`, data);
}

// {
//   id
//   createdAt
//   hostId
//   guestId
//   games {
//     id
//     createdAt
//     gameState
//     winner {
//       userId
//     }
//     guestData {
//       shotCounter
//       killCounter
//     }
//     hostData {
//       shotCounter
//       killCounter
//     }
//   }
// }
