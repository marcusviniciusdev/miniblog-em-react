
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAxUNjm6ZY9qbLSkbuYz7Nf0qIn6soOpXQ",
    authDomain: "miniblog-24b33.firebaseapp.com",
    projectId: "miniblog-24b33",
    storageBucket: "miniblog-24b33.appspot.com",
    messagingSenderId: "938344377796",
    appId: "1:938344377796:web:19ac6269b3c45610214891"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };