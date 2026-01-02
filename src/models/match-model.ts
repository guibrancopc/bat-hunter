import { getData, getReactively, setData } from 'src/services/firebase-service';
import { v7 as generateUuid } from 'uuid';

export type MatchType = {
  id: string;
  hostId?: string;
  guestId?: string;
};

export function getMatchInFirebase(id: string): Promise<MatchType | null> {
  return getData('match/' + id);
}

export function createMatchInFirebase({ hostId }: { hostId?: string }) {
  const id = generateUuid();

  setMatchInFirebase({ id, hostId });

  return id;
}

export async function setMatchInFirebase(data: MatchType) {
  if (!data?.id) return;

  const matchData = await getMatchInFirebase(data.id);

  const newUserData = {
    ...(matchData || {}),
    ...data,
  };

  setData('match/' + data.id, newUserData);
}

export function getMatchDataReactivelyFromFirebase(
  id: string,
  cb: (match: MatchType | null) => void
) {
  getReactively('match/' + id, cb);
}
