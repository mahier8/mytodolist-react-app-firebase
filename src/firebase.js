import firebase from "firebase";

const firebaseApp = firebase.initializeApp({});

const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export { db, auth, storage };

// could also be written like this
export default db;

// This is the perfect coding snippet for everything I
// need with firebase
