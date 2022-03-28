import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const db = getFirestore();

// connectFirestoreEmulator(db, "127.0.0.1", 8088);


export const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)

}

export const logout = () => signOut(auth)

export const signupWithEmail = (email, password, displayName) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      updateProfile(user, {
        displayName: displayName,
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log(auth.currentUser);
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
