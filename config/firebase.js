import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyAM37j-om4WcFcNyN6-0UtcjFLez4Su-_A",
  authDomain: "e-commerce-9552a.firebaseapp.com",
  projectId: "e-commerce-9552a",
  storageBucket: "e-commerce-9552a.appspot.com",
  messagingSenderId: "731798404107",
  appId: "1:731798404107:web:aec3d9027783fd7ac69b0e",
  measurementId: "G-3X1X1ED2GP"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };
console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");
