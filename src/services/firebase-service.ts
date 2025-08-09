import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { UserSessionType } from './authentication-service';
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  // signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';

// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDRNUE4kY5K_bR-5Hy9hM2iUMzw5Mo_Lag',
  authDomain: 'bat-hunter-game.firebaseapp.com',
  databaseURL: 'https://bat-hunter-game-default-rtdb.firebaseio.com',
  projectId: 'bat-hunter-game',
  storageBucket: 'bat-hunter-game.firebasestorage.app',
  messagingSenderId: '1065791200350',
  appId: '1:1065791200350:web:e2a30e24057f3ac5c8a8cf',
  measurementId: 'G-RBS5KYH7HL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: 'https://bat-hunter-game-default-rtdb.firebaseio.com/',
//   apiKey: 'AIzaSyDRNUE4kY5K_bR-5Hy9hM2iUMzw5Mo_Lag',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Logged in! \\o/', user);
  } else {
    console.log('Logged OUT! :(', user);
  }
});

export function GoogleSignIn() {
  // signInWithRedirect(auth, new GoogleAuthProvider());
  // import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

  // const auth = getAuth();
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      console.log('THEN?', result);

      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

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
