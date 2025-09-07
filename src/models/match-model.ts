import { getData, setData } from 'src/services/firebase-service';
import { v7 as generateUuid } from 'uuid';

type MatchType = {
  id: string;
  hostId?: string;
  guestId?: string;
};

export function getMatchFromFirebase(id: string): Promise<MatchType | null> {
  return getData('match/' + id);
}

export async function setMatchInFirebase(data: MatchType & { id: string }) {
  if (!data?.id) return;

  const matchData = await getMatchFromFirebase(data.id);

  const newUserData = {
    ...(matchData || {}),
    ...data,
  };

  setData('match/' + data.id, newUserData);
}

export function createMatch() {
  const id = generateUuid();

  setMatchInFirebase({ id });

  return id;
}
