import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBts_LApBmPQpArwMxyUAkKKinvjwUM-7M",
    authDomain: "crwn-db-bf6da.firebaseapp.com",
    databaseURL: "https://crwn-db-bf6da.firebaseio.com",
    projectId: "crwn-db-bf6da",
    storageBucket: "crwn-db-bf6da.appspot.com",
    messagingSenderId: "2090158726",
    appId: "1:2090158726:web:d20e6eb67a70ba0ca79f07",
    measurementId: "G-QYPE32VFJ9"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;