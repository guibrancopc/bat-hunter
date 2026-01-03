import { getData, getReactively, setData } from 'src/services/firebase-service';
import { v7 as generateUuid } from 'uuid';

export type MatchType = {
  id: string;
  hostId?: string;
  guestId?: string;
};

export function getMatchInFirebase(id: string): Promise<MatchType | null> {
  return getData('matches/' + id);
}

export function createMatchInFirebase({ hostId }: { hostId?: string }) {
  const id = generateUuid();

  setMatchInFirebase({ id, hostId });

  return id;
}

export async function setMatchInFirebase(data: MatchType) {
  if (!data?.id) return;

  const matchData = await getMatchInFirebase(data.id);

  const newMatchData = {
    ...(matchData || {}),
    ...data,
  };

  setData('matches/' + data.id, newMatchData);
}

export function getMatchDataReactivelyFromFirebase(
  id: string,
  cb: (match: MatchType | null) => void
) {
  getReactively('matches/' + id, cb);
}
