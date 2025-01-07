const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore'); 
require('dotenv').config();




const firebaseConfig = {
  apiKey: "AIzaSyD12wze996Tqh9Q2R5sgyVvhpcFCoOvcks",
  authDomain: "chatify-9b615.firebaseapp.com",
  projectId: "chatify-9b615",
  storageBucket: "chatify-9b615.firebasestorage.app",
  messagingSenderId: "479319984457",
  appId: "1:479319984457:web:be1e63a7e98b82d8c27298"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);



module.exports = { firebaseApp, auth, db };