import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { UserSessionType } from './authentication-service';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: 'https://bat-hunter-game-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// TODO: create models for it
export function storeUserData({
  id,
  email,
  firstName,
  lastName,
  name,
  picture,
  tokenCreatedAt,
  tokenEexpiresAt,
  tokenId,
}: UserSessionType) {
  set(ref(database, 'users/' + id), {
    id,
    email,
    firstName,
    lastName,
    name,
    picture,
    tokenCreatedAt,
    tokenEexpiresAt,
    tokenId,
  });
}
