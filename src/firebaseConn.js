import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
