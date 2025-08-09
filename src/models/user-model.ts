import { UserSessionType } from 'src/services/authentication-service';
import { getData, setData } from 'src/services/firebase-service';

export function getUserData(id: string) {
  return getData('users/' + id);
}

export async function setUserData({
  id,
  email,
  firstName,
  lastName,
  name,
  picture,
  tokenCreatedAt,
  tokenExpiresAt,
  tokenId,
}: UserSessionType) {
  const currentUserData = await getUserData(id);

  const newUserData = {
    ...(currentUserData || {}),
    ...{
      id,
      email,
      firstName,
      lastName,
      name,
      picture,
      tokenCreatedAt,
      tokenExpiresAt,
      tokenId,
    },
  };

  setData('users/' + id, newUserData);
}
