import {
  getCurrentUserSession,
  UserSessionType,
} from 'src/services/authentication-service';
import { getData, setData } from 'src/services/firebase-service';

function getCurrentUserId() {
  return getCurrentUserSession()?.id;
}

export function getCurrentUserDataFromFirebase() {
  const currentUserId = getCurrentUserId();

  return currentUserId ? getUserDataFromFirebase(currentUserId) : null;
}

export function setCurrentUserDataInFirebase(data: UserSessionType) {
  const currentUserId = getCurrentUserId();

  if (currentUserId) {
    setUserDataInFirebase({
      ...data,
      id: currentUserId,
    });
  }
}

export function getUserDataFromFirebase(id: string) {
  return getData('users/' + id);
}

export async function setUserDataInFirebase(
  data: UserSessionType & { id: string }
) {
  const currentUserData = await getUserDataFromFirebase(data.id);

  const newUserData = {
    ...(currentUserData || {}),
    ...data,
  };

  setData('users/' + data.id, newUserData);
}
