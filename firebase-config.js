// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyA8Pu3a5Ch_Gu_vmxaL0wkfoHTvA4EfdNE",
  authDomain: "bnk03-c5d3c.firebaseapp.com",
  projectId: "bnk03-c5d3c",
  storageBucket: "bnk03-c5d3c.firebasestorage.app",
  messagingSenderId: "293620544188",
  appId: "1:293620544188:web:48d46c8eae4d11708c96b9"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();