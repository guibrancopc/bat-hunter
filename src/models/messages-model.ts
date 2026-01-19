import { setData } from 'src/services/firebase-service';
import { v7 as generateUuid } from 'uuid';

export type MessageType = {
  id?: string;
  createdAt?: number;
  userId?: string;
  message?: string;
};

export async function createMessageInFirebase({
  matchId,
  userId,
  message,
  onCreated,
}: {
  matchId?: string;
  userId?: string;
  message?: string;
  onCreated?: (gameId: string) => void;
  onError?: (error: string) => void;
}) {
  if (!matchId || !userId || !message) {
    console.error('createMessageInFirebase::ERROR: missing required paramters');
    return;
  }

  const id = generateUuid();
  const data = {
    id,
    createdAt: Date.now(),
    userId,
    message,
  };

  try {
    setData(`matches/${matchId}/messages/${data.id}`, data);
    onCreated?.(id);
  } catch (e) {
    console.error(
      'createMessageInFirebase::ERROR: it was not possible to store the new message. Try again later.'
    );
  }

  return id;
}
