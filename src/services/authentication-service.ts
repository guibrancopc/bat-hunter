import {
  getLocalStorageValue,
  setLocalStorageValue,
} from './local-storage-service';

export function setUserSessionHashInLocalStorage(value?: string | null) {
  setLocalStorageValue('bh-user-session', value);
}

export function clearUserSession() {
  setUserSessionHashInLocalStorage(null);
}

export function isLoggedIn() {
  return !!getCurrentUserSession();
}

export function getCurrentUserSession(): UserSessionType {
  const currentUserHash = getLocalStorageValue('bh-user-session');
  const currentUserSession = currentUserHash && verboseJwt(currentUserHash);

  return currentUserSession;
}

export type UserSessionType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  picture?: string;
  email?: string;
  tokenId?: string;
  tokenCreatedAt?: number;
  tokenExpiresAt?: number;
  lastClickAt?: number;
  away?: boolean;
};

const thirtyDays = 30 * 24 * 60 * 60 * 1000;

export function verboseJwt(token: string) {
  const jwt = parseJwt(token);

  return (
    jwt && {
      id: jwt.sub,
      name: jwt.name,
      firstName: jwt.given_name,
      lastName: jwt.family_name,
      email: jwt.email,
      tokenId: jwt.jti,
      picture: jwt.picture,
      tokenCreatedAt: jwt.iat * 1000,
      tokenExpiresAt: jwt.iat * 1000 + thirtyDays,
      lastClickAt: Date.now(),
    }
  );
}

type JwtType = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1])) as JwtType;
  } catch (e) {
    console.error('parseJwt Error: ', e);
    return null;
  }
}
