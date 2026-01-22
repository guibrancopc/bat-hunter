import {
  getData,
  getReactively,
  updateData,
} from 'src/services/firebase-service';
import { v7 as generateUuid } from 'uuid';
import { GameType } from './game-model';
import { MessageType } from './message-model';

export type MatchType = {
  id: string;
  hostId?: string;
  guestId?: string;
  createdAt?: number;
  currentGameId?: string;
  games?: GameType[];
  messages?: MessageType[];
};

export function getMatchInFirebase(id: string): Promise<MatchType | null> {
  return getData(`matches/${id}`);
}

export function createMatchInFirebase({ hostId }: { hostId?: string }) {
  const id = generateUuid();

  setMatchInFirebase({ id, hostId, createdAt: Date.now() });

  return id;
}

export async function setMatchInFirebase(data: MatchType) {
  if (!data?.id) {
    console.error('setMatchInFirebase::ERROR: no match id was provided');
    return;
  }

  updateData(`matches/${data.id}`, data);
}

export function getMatchDataReactivelyFromFirebase(
  id: string,
  cb: (match: MatchType | undefined) => void
) {
  getReactively(`matches/${id}`, cb);
}
